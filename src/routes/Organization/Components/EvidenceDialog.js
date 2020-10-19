import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import {
    ApiGetGasPrice,
    getArbDirContract,
    sendMethod
} from '../../../ducks/utils/ethereum';
import {
    getHash,
    saveMediaToArbor,
    buildAndSaveEvidenceJson,
    fetchBalances
} from '../../../utils/directories';

import { Typography, Button, Grid, CircularProgress, TextField } from '@material-ui/core';
import { Formik } from 'formik';

import DialogComponent from '../../../components/Dialog';

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
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

export default props => {
    const classes = styles();
    const {
        dialogTitle,
        actionMethod,
        web3,
        isOpened,
        handleClose,
        directory,
        walletAddress,
        organizationItem,
        noFunding
    } = props;
    const [error, setError] = useState(null);
    const [isBalanceOk, setBalanceOk] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [fileHash, setFileHash] = useState('');
    const [fileURI, setFileUri] = useState('');
    const [challengeSending, setChallengeSending] = useState(false);

    useEffect(() => {
        let pollingInterval;
        if (directory) {
            pollingInterval = setInterval(() => {
                fetchBalances(web3, walletAddress, directory.address)
                    .then(balances => {
                        setBalanceOk(Number(balances.ethBalance) >= directory.challengeBaseDeposit);
                    })
                    .catch(setError)
            }, 1500);
        } else {
            clearInterval(pollingInterval);
        }
        return () => clearInterval(pollingInterval);
    }, [web3, walletAddress, organizationItem, directory]);

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
            const { data } = await buildAndSaveEvidenceJson({
                ...values,
                ...{
                    id: organizationItem.orgid,
                    address: walletAddress
                }
            });
            const methodGas = '259527';
            const gasPrice = await ApiGetGasPrice(web3);
            const refinedValue = web3.utils.toBN(directory.challengeBaseDepositRaw)
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
            setTimeout(() => {
                setChallengeSending(false);
            }, 5000);
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
                                        {directory.challengeBaseDeposit} ETH
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
                                        .finally(() => {
                                            setSubmitting(false);
                                            handleClose();
                                        });
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