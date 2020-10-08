import Web3 from 'web3';
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import history from '../../../redux/history';

import { selectWeb3, selectSignInAddress } from '../../../ducks/signIn';
import { selectItem as selectOrganizationItem } from '../../../ducks/fetchOrganizationInfo';
import {
    isIndexFetching,
    directories,
    orgDirectoriesFetched,
    orgDirectories,
    ethBalance,
    indexError,
    pollingError
} from '../../../ducks/directories';
import { api } from '../../../redux/api';
import {
    ApiGetGasPrice,
    getArbDirContract,
    sendMethod,
    getEvidenceEvent
} from '../../../ducks/utils/ethereum';
import { strCenterEllipsis } from '../../../utils/helpers';

import { Container, Typography, Button, Grid, CircularProgress, TextField } from '@material-ui/core';
import { Formik } from 'formik';

import DialogComponent from '../../../components/Dialog';
import { ChallengeDetailsDialog } from './Directories';

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
import DirRequestedIcon from '../../../assets/SvgComponents/dir-requested-icon.svg';
import DirChallengedIcon from '../../../assets/SvgComponents/dir-challenged-icon.svg';
import DirRegisteredIcon from '../../../assets/SvgComponents/dir-registered-icon.svg';
import InfoIcon from '../../../assets/SvgComponents/InfoIcon';

const styles = makeStyles({
    container: {
        marginBottom: '32px'
    },
    titleWrapper: {
        position: 'relative',
        padding: '20px 0 10px 0',
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    },
    dirListIcon: {
        position: 'absolute',
        marginLeft: '-38px'
    },
    statusLabelWrapper: {
        display: 'flex'
    },
    statusLabel: {
        padding: '3px 6px',
        borderRadius: '6px;',
        fontSize: '14px',
        '&.requested': {
            backgroundColor: '#FCE8B6',
            color: '#5E666A'
        },
        '&.withdrawal-requested': {
            backgroundColor: '#7D63FF',
            color: 'white'
        },
        '&.challenged': {
            backgroundColor: '#FAC8C0',
            color: '#5E666A'
        },
        '&.disputed': {
            backgroundColor: '#FAC8C0',
            color: '#5E666A'
        },
        '&.registered': {
            backgroundColor: '#DDECD5',
            color: '#5E666A'
        }
    },
    actionIndicator: {
        float: 'right',
        marginRight: '10px'
    },
    actionsBlock: {
        display: 'inline-flex',
        justifyContent: 'flex-end'
    },
    actionButton: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.3,
        float: 'right',
        color: colors.secondary.peach,
        textTransform: 'none'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    },
    dialogContent: {
        width: '500px',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%'
        }
    },
    dialogTitleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px',
        textAlign: 'center',
        '&.noMargin': {
            marginBottom: 0
        }
    },
    dialogButtonWrapper: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column'
    },
    dialogButton: {
        backgroundImage: colors.gradients.green,
        borderRadius: '6px',
        textTransform: 'none',
        color: colors.primary.white,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '24px',
        padding: '14px 26px',
        marginTop: '16px'
    },
    dialogButtonRed: {
        backgroundImage: colors.gradients.orange,
        borderRadius: '6px',
        textTransform: 'none',
        color: colors.primary.white,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '24px',
        padding: '14px 26px',
        marginTop: '16px'
    },
    depositNote: {
        textAlign: 'center',
        padding: '18px',
        border: `1px solid ${colors.secondary.green}`,
        borderRadius: '6px',
        marginTop: '28px',
        marginBottom: '28px',
        '&.insufficient': {
            border: `1px solid ${colors.primary.accent}`
        }
    },
    depositNoteSubtitle: {
        fontWeight: 500,
        fontSize: '14px',
        color: colors.primary.green
    },
    depositNoteTitle: {
        fontWeight: 500,
        fontSize: '28px',
        textTransform: 'capitalize',
        color: colors.primary.green
    },
    inputFieldWrapper: {
        position: 'relative',
        marginBottom: '28px',
        '&:last-child': {
          marginBottom: '0'
        }
    },
    inputLabel: {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        margin: '0px 12px',
        color: '#42424F'
    },
    inputSubLabel: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        margin: '0px 12px',
        color: '#8F999F'
    },
    dropZone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60px',
        background: '#FFFFFF',
        border: '1px solid #F3F3F6',
        boxShadow: '0px 6px 24px #F3F3F6',
        borderRadius: '6px',
        marginTop: '20px',
        '&:hover': {
            cursor: 'pointer',
            background: '#EFEFEF',
            boxShadow: '0px 4px 20px #F3F3F6'
        }
    },
    inButtonProgress: {
        marginLeft: '10px'
    }
});

const saveMediaToArbor = async data => {
    const {
      address,
      id,
      file,
      text
    } = data;

    const body = new FormData();

    if (file) {
        body.append('media', file, `${await getHash(file)}.json`);
    } else if (text) {
        body.append(
            'media',
            new Blob([text], { type: 'application/json' }),
            `${await getHash(text)}.json`
        );
    } else {
        throw new Error('Nor file not text has been provided');
    }

    body.append('address', address);
    body.append('id', id);

    return api(`media`, 'POST', {
        body
    });
}

export const serializeJson = jsonData => JSON.stringify(jsonData, null, 2);

// Generate hash for string or file
export const getHash = file => new Promise((resolve, reject) => {
    if (!file) {
        throw new Error('File not found');
    }
    if (typeof file === 'string') {
        return resolve(Web3.utils.soliditySha3(file));
    }
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = evt => resolve(Web3.utils.soliditySha3(evt.target.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
});

const buildEvidenceJson = data => {
    const {
        fileURI,
        fileHash,
        name,
        description,
        address,
        id
    } = data;

    const evidence = {
        fileURI,
        fileHash,
        fileTypeExtension: 'json',
        name,
        description
    };

    return saveMediaToArbor({
        address,
        id,
        text: serializeJson(evidence)
    })
};

const DialogTitle = props => {
    const classes = styles();
    const {
        noMargin,
        children
    } = props;

    return (
        <div className={classes.dialogTitleWrapper + (noMargin ? ' noMargin' : '')}>
            <Typography variant={'inherit'}>
                {children}
            </Typography>
        </div>
    );
};

export const ChallengeDialog = props => {
    const classes = styles();
    const {
        dialogTitle,
        actionMethod,
        web3,
        isOpened,
        handleClose,
        directory,
        ethBalance,
        walletAddress,
        organizationItem,
        noFunding
    } = props;
    const [error, setError] = useState(null);
    const [isBalanceOk, setIsBalanceOk] = useState(true);
    const [fileName, setFileName] = useState(null);
    const [fileHash, setFileHash] = useState('');
    const [fileURI, setFileUri] = useState('');
    const [challengeSending, setChallengeSending] = useState(false);

    useEffect(() => {
        if (directory) {
            setIsBalanceOk(Number(ethBalance) >= Number(directory.challengeDeposit));
        }
    }, [directory, ethBalance]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'application/json',
        multiple: false,
        onDrop: async acceptedFiles => {
            try {
                window['file_0'] = acceptedFiles[0];
                if (!acceptedFiles[0]) {
                    throw new Error('Unable to get the file');
                }
                const file = acceptedFiles[0];
                setFileName(file.name);
                const fileHash = await getHash(file);
                setFileHash(fileHash);
                const { data } = await saveMediaToArbor({
                    address: walletAddress,
                    id: organizationItem.orgid,
                    file: acceptedFiles[0]
                });
                setFileUri(data.uri);
            } catch (error) {
                setError(error);
            }
        }
    });

    const onDialogClose = () => {
        setError(null);
        handleClose();
    };

    const sendChallengeOrganization = async (values) => {
        try {
            setChallengeSending(true);
            const { data } = await buildEvidenceJson({
                ...values,
                ...{
                    id: organizationItem.orgid,
                    address: walletAddress
                }
            });
            const methodGas = '259527';
            const gasPrice = await ApiGetGasPrice(web3);
            const refinedValue = web3.utils.toBN(directory.challengeDepositRaw)
                .add(
                    web3.utils.toBN(methodGas)
                        .mul(web3.utils.toBN(gasPrice))
                )
                .toString();
            await sendMethod(
                web3,
                walletAddress,
                directory.address,
                getArbDirContract,
                actionMethod,
                [
                    organizationItem.orgid,
                    data.uri
                ],
                noFunding ? undefined : refinedValue,
                gasPrice
            );
            setChallengeSending(false);
            handleClose();
        } catch (error) {
            setError(error);
            setChallengeSending(false);
        }
    };

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <div className={classes.dialogContent}>
                    {directory &&
                        <>
                            <DialogTitle>
                                {dialogTitle}
                            </DialogTitle>
                            {!noFunding &&
                                <div className={classes.depositNote + (isBalanceOk ? '' : ' insufficient')}>
                                    <Typography className={classes.depositNoteSubtitle}>
                                        Required deposit
                                    </Typography>
                                    <Typography className={classes.depositNoteTitle}>
                                        {directory.challengeDeposit} ETH
                                    </Typography>
                                </div>
                            }
                            <Formik
                                initialValues={{
                                    name: '',
                                    description: ''
                                }}
                                validate={values => {
                                    const errors = {};
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log('@@@', values, { fileURI, fileHash });
                                    sendChallengeOrganization({
                                        ...values,
                                        ...{ fileURI, fileHash }
                                    })
                                        .finally(() => setSubmitting(false));
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className={classes.inputFieldWrapper}>
                                            <TextField
                                                name={'name'}
                                                autoComplete={'none'}
                                                variant={'filled'}
                                                label={'Evidence Title'}
                                                fullWidth
                                                required
                                                error={errors.name && touched.name}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={errors.name && touched.name ? errors.name : null}
                                            />
                                        </div>
                                        <div className={classes.inputFieldWrapper}>
                                            <TextField
                                                name={'description'}
                                                autoComplete={'none'}
                                                variant={'filled'}
                                                label={'Evidence Text'}
                                                required
                                                fullWidth
                                                multiline
                                                rows={4}
                                                rowsMax={6}
                                                error={errors.description && touched.description}
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={errors.description && touched.description ? errors.description : null}
                                            />
                                        </div>
                                        <div>
                                            <Typography className={classes.inputLabel}>
                                                Link to the evidence
                                            </Typography>
                                            <Typography className={classes.inputSubLabel}>
                                                Provide a link to a JSON file, containing all the necessary evidence.
                                            </Typography>
                                        </div>
                                        <div className={classes.inputFieldWrapper}>
                                            <div {...getRootProps()} className={classes.dropZone}>
                                                <input {...getInputProps()} />
                                                {
                                                    isDragActive
                                                        ? <Typography>Drop the file here...</Typography>
                                                        : <Typography>
                                                            {fileName ? fileName : 'evidence.json'}
                                                        </Typography>
                                                }
                                            </div>
                                        </div>
                                        <div className={classes.inputFieldWrapper}>
                                            <Grid container direction='row' wrap='nowrap' justify='flex-start'>
                                                <Grid item>
                                                    <InfoIcon size='14px' stroke='white' fill='#8F999F' />
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.inputSubLabel}>
                                                        Note that both sides need to deposit the fees to start the dispute. In case the other side doesn’t deposit it in {directory.responseTimeout} sec you win.
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {error &&
                                            <div className={classes.inputFieldWrapper}>
                                                <Typography className={classes.errorMessage}>
                                                    {error.message}
                                                </Typography>
                                            </div>
                                        }
                                        <div className={classes.dialogButtonWrapper}>
                                            <Button
                                                className={classes.dialogButton}
                                                type={'submit'}
                                                disabled={(!noFunding && !isBalanceOk) || isSubmitting}
                                            >
                                                {dialogTitle}
                                                {challengeSending &&
                                                    <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                }
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </>
                    }
                </div>
            )}
        />
    );
};

const DirectoriesList = props => {
    const classes = styles();
    const {
        web3,
        directories: directoriesDetails,
        orgDirectories,
        orgDirectoriesFetched,
        walletAddress
    } = props;
    const [error, setError] = useState(null);

    const [challengeStarting, setChallengeStarting] = useState(false);
    const [submitEvidenceSending, setSubmitEvidenceSending] = useState(false);

    const [parsedDirectories, setParsedDirectories] = useState([]);
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [evidenceStor, setEvidenceStor] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [challengeDetailsOpen, setChallengeDetailsOpen] = useState(false);
    const [isEvidenceDialogOpen, setIsEvidenceDialogOpen] = useState(false);

    const challengeTheRegistration = useCallback(directory => {
        console.log('Selected directory:', directory);
        setSelectedDirectory(directory);
        setDialogOpen(true);
    }, []);

    const submitEvidenceAction = useCallback(directory => {
        console.log('Directory', directory);
        setSelectedDirectory(directory);
        setIsEvidenceDialogOpen(true)
    }, []);

    const toggleChallengeDialog = () => {
        setDialogOpen(false);
        setSelectedDirectory(null);
    }

    const parseDirectories = useCallback((directories, directoriesDetails) => directories
        .map((d, index) => {
            const config = [
                // The organization is not registered and doesn't have an open request.
                {
                    status: 'Not Registered',
                    statusClass: '',
                    icon: '',
                    actions: []
                },
                // The organization has an open request.
                {
                    status: 'Registration Requested',
                    statusClass: 'requested',
                    icon: DirRequestedIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                },
                // The organization made a withdrawal request.
                {
                    status: 'Withdrawal Requested',
                    statusClass: 'withdrawal-requested',
                    icon: DirChallengedIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                },
                // The organization has been challenged.
                {
                    status: 'Challenged',
                    statusClass: 'challenged',
                    icon: DirChallengedIcon,
                    actions: [
                        {
                            action: 'Submit Evidence',
                            actionIndicator: submitEvidenceSending,
                            actionIndicatorCallback: setSubmitEvidenceSending,
                            actionCallback: submitEvidenceAction
                        }
                    ]
                },
                // The challenge has been disputed.
                {
                    status: 'Disputed',
                    statusClass: 'disputed',
                    icon: DirChallengedIcon,
                    actions: [
                        {
                            action: 'Submit Evidence',
                            actionIndicator: submitEvidenceSending,
                            actionIndicatorCallback: setSubmitEvidenceSending,
                            actionCallback: submitEvidenceAction
                        }
                    ]
                },
                {
                    status: 'Registered',
                    statusClass: 'registered',
                    icon: DirRegisteredIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                }
            ];

            if (d.status === '0') {
                return null;
            }

            const details = directoriesDetails[index];
            const statusNum = Number(d.status);

            return {
                ...details,
                status: statusNum,
                organization: d,
                config: config[statusNum]
            };
        })
        .filter(d => d !== null), [challengeStarting, challengeTheRegistration]);

    useEffect(() => {
        if (evidenceStor) {
            setChallengeDetailsOpen(true);
        } else {
            setChallengeDetailsOpen(false);
        }
    }, [evidenceStor]);

    useEffect(() => {
        if (orgDirectoriesFetched) {
            setParsedDirectories(
                parseDirectories(orgDirectories, directoriesDetails)
            );
        }
    }, [orgDirectoriesFetched, orgDirectories, directoriesDetails, parseDirectories]);

    const handleCloseChallengeDetails = () => {
        setEvidenceStor(null);
    };

    const handleCloseEvidenceDialog = () => {
        setSelectedDirectory(null);
        setIsEvidenceDialogOpen(false);
    };

    const showEvidence = (directory, challengeNumber) => {
        console.log('Directory', directory);
        getEvidenceEvent(
            web3,
            directory.address,
            directory.organization.challenges[challengeNumber].arbitrator,
            directory.organization.ID,
            challengeNumber + 1
        )
            .then(events => {
                console.log('Evidence', events);
                setEvidenceStor({
                    directory,
                    challenge: directory.organization.challenges[challengeNumber],
                    events: events.map(ev => ev.returnValues)
                });
            })
            .catch(setError);
    };

    return (
        <>
            <ChallengeDetailsDialog
                isOpened={challengeDetailsOpen}
                evidenceStor={evidenceStor}
                handleClose={handleCloseChallengeDetails}
            />
            <ChallengeDialog
                dialogTitle='Challenge the Registration'
                actionMethod='challengeOrganization'
                isOpened={isDialogOpen}
                handleClose={toggleChallengeDialog}
                directory={selectedDirectory}
                {...props}
            />
            <ChallengeDialog
                dialogTitle='Submit Evidence'
                actionMethod='submitEvidence'
                isOpened={isEvidenceDialogOpen}
                handleClose={handleCloseEvidenceDialog}
                directory={selectedDirectory}
                noFunding
                {...props}
            />
            {!orgDirectoriesFetched &&
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    alignContent='space-between'
                >
                    <Grid item style={{ marginRight: '10px'}}>
                        <CircularProgress size='18px' />
                    </Grid>
                    <Grid item>
                        <Typography>
                            Directories list is loading...
                        </Typography>
                    </Grid>
                </Grid>
            }
            {(orgDirectoriesFetched && parsedDirectories.length > 0) &&
                parsedDirectories.map((directory, i) => (
                    <Grid
                        container
                        direction='row'
                        wrap='nowrap'
                        alignItems='center'
                        key={i}
                    >
                        <Grid item xs={2}>
                            <img
                                width='16px'
                                height='16px'
                                className={classes.dirListIcon}
                                alt={directory.title}
                                src={directory.icon}
                            />
                            {directory.title}
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.statusLabelWrapper}>
                                <Typography className={classes.statusLabel + ' ' + directory.config.statusClass}>
                                    <img
                                        alt={directory.config.status}
                                        src={directory.config.icon}
                                    />&nbsp;
                                    {directory.config.status}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            {[3, 4].includes(directory.status) &&
                                directory.organization.challenges.map((ch, i) => (
                                    <table key={i}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Button
                                                        className={classes.actionButton}
                                                        onClick={() => showEvidence(directory, i)}
                                                    >
                                                        Challenge from {strCenterEllipsis(ch.challenger.split('x')[1])} ({ch.resolved ? 'resolved' : 'not resolved'})
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))
                            }
                        </Grid>
                        <Grid item xs={4} className={classes.actionsBlock}>
                            {walletAddress &&
                                <Grid container direction='column'>
                                    {directory.config.actions.map((action, i) => (
                                        <div  key={i}>
                                            <Grid item>
                                                <Button
                                                    disabled={action.actionIndicator}
                                                    className={classes.actionButton}
                                                    onClick={() => action.actionCallback(directory, action)}
                                                >
                                                    {action.action}
                                                    {action.actionIndicator &&
                                                        <div className={classes.actionIndicator}>
                                                            <CircularProgress size='16px' />
                                                        </div>
                                                    }
                                                </Button>
                                            </Grid>
                                        </div>
                                    ))}
                                </Grid>
                            }
                            {!walletAddress &&
                                <Button
                                    className={classes.actionButton}
                                    onClick={() => history.push('/authorization/signin', { follow: history.location.pathname })}
                                >
                                    Sign Up to see available actions
                                </Button>
                            }
                        </Grid>
                    </Grid>
                ))
            }
            {error &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {error.message}
                    </Typography>
                </div>
            }
        </>
    );
};

const PublicDirectories = props => {
    const classes = styles();
    const {
        indexError,
        pollingError
    } = props;

    return (
        <Container className={classes.container}>
            <div className={classes.titleWrapper}>
                <Typography variant={'inherit'}>Directories</Typography>
            </div>
            <dir >
                <DirectoriesList {...props}/>
            </dir>
            {indexError &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {indexError.message}
                    </Typography>
                </div>
            }
            {pollingError &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {pollingError.message}
                    </Typography>
                </div>
            }
        </Container>
    );
}

const mapStateToProps = state => ({
    web3: selectWeb3(state),
    walletAddress: selectSignInAddress(state),
    directories: directories(state),
    isIndexFetching: isIndexFetching(state),
    orgDirectoriesFetched: orgDirectoriesFetched(state),
    orgDirectories: orgDirectories(state),
    organizationItem: selectOrganizationItem(state),
    ethBalance: ethBalance(state),
    indexError: indexError(state),
    pollingError: pollingError(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PublicDirectories);
