import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import {
    setDirectory,
    resetState,
    isIndexFetching,
    directories,
    lifBalance,
    lifAllowance,
    ethBalance,
    isOrgRequested,
    isOrgRequestedFetched,
    selectedDirectory,
    orgDirectoriesFetched,
    orgDirectories,
    indexError,
    pollingError
} from '../../../ducks/directories';
import { selectWeb3, selectSignInAddress } from '../../../ducks/signIn';
import { selectItem as selectOrganizationItem } from '../../../ducks/fetchOrganizationInfo';
import {
    getLifTokenContract,
    getArbDirContract,
    sendMethod,
    getEvidenceEvent
} from '../../../ducks/utils/ethereum';
import { fetchJson } from '../../../redux/api';

import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';

import DialogComponent from '../../../components/Dialog';
import SelectField from '../../../components/Fields/SelectField';
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
import DirRequestedIcon from '../../../assets/SvgComponents/dir-requested-icon.svg';
import DirChallengedIcon from '../../../assets/SvgComponents/dir-challenged-icon.svg';
import DirRegisteredIcon from '../../../assets/SvgComponents/dir-registered-icon.svg';
import { ChallengeDialog } from './PublicDirectories';

const styles = makeStyles({
    container: {
        position: 'relative',
        fontWeight: 400,
        fontSize: '14px',
        color: colors.greyScale.dark,
        padding: '20px 0'
    },
    titleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    contentWrapper: {},
    inButtonProgress: {
        marginLeft: '10px'
    },
    addButtonWrapper: {
        width: '100%',
        margin: '20px 0'
    },
    addButton: {
        width: '100%',
        position: 'relative',
        fontSize: '16px',
        fontWeight: 500,
        color: colors.secondary.cyan,
        textTransform: 'none',
        boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
        backgroundColor: colors.primary.white,
        borderRadius: '8px',
        padding: '20px 0'
    },
    dialogContent: {
        width: '440px',
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
    dialogSelectorWrapper: {
        display: 'flex',
        alignItems: 'stretch',
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
    dialogNewButton: {
        fontSize: '14px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        textDecoration: 'underline',
        textTransform: 'none',
        marginTop: '10px'
    },
    buyLifWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'baseline'
    },
    yourBalanceNote: {
        fontWeight: 500,
        fontSize: '14px',
        color: colors.primary.accent,
        marginRight: '14px'
    },
    inputFieldWrapper: {
        position: 'relative',
        marginBottom: '28px',
        '&:last-child': {
            marginBottom: '0'
        }
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
    dirListIcon: {
        position: 'absolute',
        marginLeft: '-38px'
    },
    actionIndicator: {
        float: 'right',
        marginRight: '10px'
    },
    statusLabelWrapper: {
        display: 'flex',

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
    challengeDetailsWrapper: {
        marginBottom: '10px'
    },
    challengeDetailsLabel: {
        fontSize: '14px',
        fontWeight: 600,
        color: colors.greyScale.darkest
    },
    challengeDetailsText: {
        fontSize: '16px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        '& a, a:visited': {
            color: colors.primary.green
        }
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    }
});

// Extract specific directory from the list
const getDirectory = (address, directories) => directories.filter(d => d.address === address)[0];

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

const AddDirectoryDialog = props => {
    const classes = styles();
    const {
        web3,
        walletAddress,
        isOpened,
        handleClose,
        directories,
        resetState,
        setDirectory,
        lifBalance,
        lifAllowance,
        isOrgRequestedFetched,
        isOrgRequested,
        selectedDirectory,
        organizationItem
    } = props;
    const [step, setStep] = useState(0);
    const [isBalanceOk, setBalanceOk] = useState(true);
    const [isAllowanceOk, setAllowanceOk] = useState(true);
    const [approvalLifStarted, setApprovalLifStarted] = useState(false);
    const [requestStarted, setRequestStarted] = useState(false);

    useEffect(() => {
        resetState();
    }, [organizationItem]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        switch (step) {
            case 0:
                resetState();
                setRequestStarted(false);
                setApprovalLifStarted(false);
                break;
            case 1:
                break;
            case 2:
                break;
            default:
        }
    }, [resetState, isOpened, organizationItem, step]);

    useEffect(() => {
        if (selectedDirectory !== '') {
            const deposit = getDirectory(selectedDirectory, directories).requesterDeposit;
            setBalanceOk(Number(lifBalance) >= Number(deposit));
            if (lifAllowance) {
                setAllowanceOk(Number(lifAllowance) >= Number(deposit));
            }
        }
    }, [directories, lifBalance, lifAllowance, selectedDirectory]);

    const sendLifApproval = useCallback((spender, amount) => {
        setApprovalLifStarted(true);
        sendMethod(
            web3,
            walletAddress,
            undefined,
            getLifTokenContract,
            'approve',
            [
                spender,
                amount
            ]
        )
            .then(() => {
                setApprovalLifStarted(false);
            })
            .catch(error => {
                setApprovalLifStarted(false);
            });
    }, [web3, walletAddress, setApprovalLifStarted]);

    const sendRequestToAdd = useCallback((directory) => {
        setRequestStarted(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'requestToAdd',
            [
                organizationItem.orgid
            ]
        )
            .then(() => {
                setRequestStarted(false);
            })
            .catch(error => {
                setRequestStarted(false);
            });
    }, [web3, walletAddress, organizationItem, setRequestStarted]);

    const onDialogClose = () => {
        setStep(0);
        resetState();
        handleClose();
    };

    if (!isOpened) {
        return null;
    }

    // address => title
    const options = directories.reduce(
        (a, d) => Object.assign(a, { [d.address]: d.title }),
        {}
    );

    const selectedDirectoryDetails = getDirectory(selectedDirectory, directories);

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <div className={classes.dialogContent}>
                    {step === 0 &&
                        <>
                            <DialogTitle>
                                Choose a Directory
                            </DialogTitle>
                            <div className={classes.dialogSelectorWrapper}>
                                <Formik
                                    initialValues={{ directory: selectedDirectory }}
                                    validate={values => {
                                        const errors = {};
                                        return errors;
                                    }}
                                    onSubmit={values => {
                                        console.log('@@@', values);
                                        setDirectory({
                                            directory: values.directory
                                        });
                                        setStep(1);
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
                                                <SelectField
                                                    name={'directory'}
                                                    variant={'filled'}
                                                    label={'Segment name'}
                                                    fullWidth
                                                    required
                                                    options={options}
                                                    values={values.directory}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    helperText={errors.type && touched.type ? errors.type : null}
                                                />
                                            </div>
                                            <div className={classes.dialogButtonWrapper}>
                                                <Button
                                                    className={classes.dialogButton}
                                                    type={'submit'}
                                                    disabled={isSubmitting}
                                                >
                                                    Register in Directory
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                            <div className={classes.dialogButtonWrapper}>
                                <Button
                                    className={classes.dialogNewButton}
                                    onClick={() => window.open('https://forms.gle/GsVZYqPXJMbdkerF8', '_blank')}
                                >
                                    Propose a new Directory
                                </Button>
                            </div>
                        </>
                    }
                    {(step === 1 && !isOrgRequestedFetched) &&
                        <DialogTitle noMargin>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {((step === 1 || step === 2) && isOrgRequested && isOrgRequestedFetched) &&
                        <>
                            <DialogTitle>
                                Organization Registration Request to the {selectedDirectoryDetails.title} Directory has been sent successfully
                            </DialogTitle>
                            <div className={classes.dialogButtonWrapper}>
                                <Button
                                    className={classes.dialogButton}
                                    onClick={onDialogClose}
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    }
                    {(step === 1 && isOrgRequestedFetched && !isOrgRequested) &&
                        <>
                            <DialogTitle>
                                {selectedDirectoryDetails.title} Directory Rules
                            </DialogTitle>
                            <div className={classes.depositNote}>
                                [Rules text will be here]
                            </div>
                            <div>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                >
                                    <Grid item>
                                        <Button
                                            className={classes.dialogButton}
                                            onClick={() => setStep(0)}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                    <Button
                                            className={classes.dialogButton}
                                            onClick={() => setStep(2)}
                                        >
                                            Next
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    }
                    {(step === 2 && !isOrgRequestedFetched) &&
                        <DialogTitle>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {(step === 2 && isOrgRequestedFetched && !isOrgRequested) &&
                        <>
                            <DialogTitle>
                                Register {organizationItem.name} in {selectedDirectoryDetails.title} Directory
                            </DialogTitle>
                            <div className={classes.depositNote + (isBalanceOk ? '' : ' insufficient')}>
                                <Typography className={classes.depositNoteSubtitle}>
                                    Required deposit
                                </Typography>
                                <Typography className={classes.depositNoteTitle}>
                                    {selectedDirectoryDetails.requesterDeposit} LÍF
                                </Typography>
                            </div>
                            <div>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                >
                                    <Grid item>
                                        <Button
                                            className={classes.dialogButton}
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {!isBalanceOk &&
                                            <div className={classes.buyLifWrapper}>
                                                <Typography className={classes.yourBalanceNote}>
                                                    Your balance: {lifBalance} LÍF
                                                </Typography>
                                                <Button
                                                    className={classes.dialogButtonRed}
                                                >
                                                    Buy LÍF
                                                </Button>
                                            </div>
                                        }
                                        {(isBalanceOk && !isAllowanceOk) &&
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={approvalLifStarted}
                                                onClick={() => sendLifApproval(
                                                    selectedDirectoryDetails.address,
                                                    selectedDirectoryDetails.requesterDepositRaw
                                                )}
                                            >
                                                Unlock Lif Tokens
                                                {(approvalLifStarted) &&
                                                    <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                }
                                            </Button>
                                        }
                                        {(isBalanceOk && isAllowanceOk) &&
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={requestStarted}
                                                onClick={() => sendRequestToAdd(selectedDirectoryDetails)}
                                            >
                                                Request to Register
                                                {(requestStarted) &&
                                                    <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                }
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    }
                </div>
            )}
        />
    );
};

const ChallengeDetailsDialog = props => {
    const classes = styles();
    const {
        isOpened,
        handleClose,
        evidenceURI
    } = props;
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [evidence, setEvidence] = useState(null);

    useEffect(() => {
        if (evidenceURI) {
            setIsFetching(true);
            fetchJson(evidenceURI)
                .then(evidence => {
                    console.log('%%%%', evidence);
                    setEvidence(evidence);
                    setIsFetching(false);
                })
                .catch(error => {
                    console.log('!!!!!',error);
                    setError(error);
                    setIsFetching(false);
                });
        }
    }, [evidenceURI]);

    const onDialogClose = () => {
        handleClose();
    };

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <>
                    <div className={classes.dialogContent}>
                        <DialogTitle>
                            Challenge Details
                        </DialogTitle>
                    </div>
                    {isFetching &&
                        <DialogTitle noMargin>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {(!isFetching && evidence) &&
                        <div>
                            <div className={classes.challengeDetailsWrapper}>
                                <Typography className={classes.challengeDetailsLabel}>
                                    Name:
                                </Typography>
                                <Typography className={classes.challengeDetailsText}>
                                    {evidence.name}
                                </Typography>
                            </div>
                            <div className={classes.challengeDetailsWrapper}>
                                <Typography className={classes.challengeDetailsLabel}>
                                    Description:
                                </Typography>
                                <Typography className={classes.challengeDetailsText}>
                                    {evidence.description}
                                </Typography>
                            </div>
                            <div className={classes.challengeDetailsWrapper}>
                                <Typography className={classes.challengeDetailsText}>
                                    <a
                                        alt={evidence.description}
                                        href={evidence.fileURI}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Link to the evidence
                                    </a>
                                </Typography>
                            </div>
                        </div>
                    }
                    {error &&
                        <div className={classes.errorWrapper}>
                            <Typography className={classes.errorMessage}>
                                {error.message}
                            </Typography>
                        </div>
                    }
                    <div className={classes.dialogButtonWrapper}>
                        <Button
                            className={classes.dialogButton}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </div>
                </>
            )}
        />
    );
};

const DirectoriesList = props => {
    const classes = styles();
    const {
        directories: directoriesDetails,
        orgDirectories,
        orgDirectoriesFetched,
        organizationItem,
        web3,
        walletAddress
    } = props;
    const [error, setError] = useState(null);
    const [executeTimeoutSending, setExecuteTimeoutSending] = useState(false);
    const [withdrawTokensSending, setWithdrawTokensSending] = useState(false);
    const [makeWithdrawalRequestSending, setMakeWithdrawalRequestSending] = useState(false);
    const [acceptChallengeSending, setAcceptChallengeSending] = useState(false);
    const [challengeDetailsOpen, setChallengeDetailsOpen] = useState(false);
    const [evidenceURI, setEvidenceURI] = useState(null);
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [isAcceptDialogOpen, seIsAcceptDialogOpen] = useState(false);

    useEffect(() => {
        if (evidenceURI) {
            setChallengeDetailsOpen(true);
        } else {
            setChallengeDetailsOpen(false);
        }
    }, [evidenceURI]);

    useEffect(() => {
        if (selectedDirectory) {
            seIsAcceptDialogOpen(true);
        } else {
            seIsAcceptDialogOpen(false);
        }
    }, [selectedDirectory]);

    const handleCloseChallengeDetails = () => {
        setEvidenceURI(null);
    };

    const handleCloseAcceptDialog = () => {
        setSelectedDirectory(null);
    };

    const executeTimeoutAction = useCallback(directory => {
        setError(null);
        directory.config.actionIndicatorCallback(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'executeTimeout',
            [
                organizationItem.orgid
            ]
        )
            .then(() => {
                directory.config.actionIndicatorCallback(false);
            })
            .catch(error => {
                setError(error);
                directory.config.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem]);

    const makeWithdrawalRequestAction = useCallback(directory => {
        setError(null);
        directory.config.actionIndicatorCallback(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'makeWithdrawalRequest',
            [
                organizationItem.orgid
            ]
        )
            .then(() => {
                directory.config.actionIndicatorCallback(false);
            })
            .catch(error => {
                setError(error);
                directory.config.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem]);

    const withdrawTokensAction = useCallback(directory => {
        setError(null);
        directory.config.actionIndicatorCallback(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'withdrawTokens',
            [
                organizationItem.orgid
            ]
        )
            .then(() => {
                directory.config.actionIndicatorCallback(false);
            })
            .catch(error => {
                setError(error);
                directory.config.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem]);

    const acceptChallengeAction = useCallback((directory, challengeNumber, fetchDetails) => {
        console.log('Accept Challenge', directory);
        if (fetchDetails === 'details') {
            return getEvidenceEvent(
                web3,
                directory.address,
                directory.organization.challenges[challengeNumber].arbitrator,
                directory.organization.ID,
                challengeNumber + 1
            )
                .then(events => {
                    console.log('Evidence', events[0].returnValues._evidence);
                    setEvidenceURI(events[0].returnValues._evidence);
                })
                .catch(setError);
        }

        setSelectedDirectory(directory);
    }, [web3]);

    const parseDirectories = directories => directories
        .map((d, index) => {
            const config = [
                // The organization is not registered and doesn't have an open request.
                {
                    status: 'Not Registered',
                    statusClass: '',
                    icon: '',
                    action: 'Register',
                    actionIndicator: false,
                    actionIndicatorCallback: () => {},
                    actionCallback: () => {}
                },
                // The organization has an open request.
                {
                    status: 'Registration Requested',
                    statusClass: 'requested',
                    icon: DirRequestedIcon,
                    action: 'Execute Timeout',
                    actionIndicator: executeTimeoutSending,
                    actionIndicatorCallback: setExecuteTimeoutSending,
                    actionCallback: executeTimeoutAction
                },
                // The organization made a withdrawal request.
                {
                    status: 'Withdrawal Requested',
                    statusClass: 'withdrawal-requested',
                    icon: DirChallengedIcon,
                    action: 'Withdraw Tokens',
                    actionIndicator: withdrawTokensSending,
                    actionIndicatorCallback: setWithdrawTokensSending,
                    actionCallback: withdrawTokensAction
                },
                // The organization has been challenged.
                {
                    status: 'Challenged',
                    statusClass: 'challenged',
                    icon: DirChallengedIcon,
                    action: 'Accept Challenge',
                    actionIndicator: acceptChallengeSending,
                    actionIndicatorCallback: setAcceptChallengeSending,
                    actionCallback: acceptChallengeAction
                },
                // The challenge has been disputed.
                {
                    status: 'Disputed',
                    statusClass: 'disputed',
                    icon: DirChallengedIcon,
                    action: '',
                    actionIndicator: false,
                    actionIndicatorCallback: () => {},
                    actionCallback: () => {}
                },
                {
                    status: 'Registered',
                    statusClass: 'registered',
                    icon: DirRegisteredIcon,
                    action: 'Request Tokens Withdrawal',
                    actionIndicator: makeWithdrawalRequestSending,
                    actionIndicatorCallback: setMakeWithdrawalRequestSending,
                    actionCallback: makeWithdrawalRequestAction
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
        .filter(d => d !== null);

    return (
        <>
            <ChallengeDetailsDialog
                isOpened={challengeDetailsOpen}
                evidenceURI={evidenceURI}
                handleClose={handleCloseChallengeDetails}
            />
            <ChallengeDialog
                dialogTitle='Accept Challenge'
                actionMethod='acceptChallenge'
                isOpened={isAcceptDialogOpen}
                handleClose={handleCloseAcceptDialog}
                directory={selectedDirectory}
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
            {orgDirectoriesFetched && parseDirectories(orgDirectories).map((directory, i) => (
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
                    <Grid item xs={6}>
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
                    <Grid item xs={4} className={classes.actionsBlock}>
                        {directory.config.actionIndicator &&
                            <div className={classes.actionIndicator}>
                                <CircularProgress size='16px' />
                            </div>
                        }
                        {(directory.status !== 3 && directory.config.action && !directory.config.actionIndicator) &&
                            <Button
                                className={classes.actionButton}
                                onClick={() => directory.config.actionCallback(directory)}
                            >
                                {directory.config.action}
                            </Button>
                        }
                        {(directory.status === 3 && directory.config.action && !directory.config.actionIndicator) &&
                            directory.organization.challenges.map((ch, i) => (
                                <table key={i}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button
                                                    className={classes.actionButton}
                                                    onClick={() => directory.config.actionCallback(directory, i, 'details')}
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    className={classes.actionButton}
                                                    onClick={() => directory.config.actionCallback(directory, i)}
                                                >
                                                    {directory.config.action} {directory.organization.challenges.length > 1 ? i+1 : ''}
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                        }
                    </Grid>
                </Grid>
            ))}
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

const Directories = props => {
    const classes = styles();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const toggleDialogOpen = () => setDialogOpen(!isDialogOpen);

    return (
        <Container>
            <AddDirectoryDialog
                isOpened={isDialogOpen}
                handleClose={toggleDialogOpen}
                {...props}
            />
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                    <Typography variant={'inherit'}>Directories</Typography>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.addButtonWrapper}>
                        <Button
                            className={classes.addButton}
                            onClick={toggleDialogOpen}
                        >
                            <Typography variant={'inherit'}>
                                Add Directory
                            </Typography>
                        </Button>
                    </div>
                </div>
                <dir>
                    <DirectoriesList {...props}/>
                </dir>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        isIndexFetching: isIndexFetching(state),
        directories: directories(state),
        lifBalance: lifBalance(state),
        lifAllowance: lifAllowance(state),
        isOrgRequested: isOrgRequested(state),
        isOrgRequestedFetched:  isOrgRequestedFetched(state),
        selectedDirectory: selectedDirectory(state),
        indexError: indexError(state),
        pollingError: pollingError(state),
        organizationItem: selectOrganizationItem(state),
        orgDirectoriesFetched: orgDirectoriesFetched(state),
        orgDirectories: orgDirectories(state),
        web3: selectWeb3(state),
        walletAddress: selectSignInAddress(state),
        ethBalance: ethBalance(state)
    }
};

const mapDispatchToProps = {
    setDirectory,
    resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
