import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import {
    setOrgId,
    isIndexFetching,
    isOrgDirectoriesFetching,
    directories,
    orgDirectories,
    indexError,
    statsError,
    orgError
} from '../../../ducks/directories';
import { selectWeb3, selectSignInAddress } from '../../../ducks/signIn';
import { selectItem as selectOrganizationItem } from '../../../ducks/fetchOrganizationInfo';
import {
    getLifTokenContract,
    getArbDirContract,
    sendMethod
} from '../../../ducks/utils/ethereum';
import { strCenterEllipsis } from '../../../utils/helpers';
import {
    isResponseTimeout,
    isExecutionTimeout,
    isWithdrawTimeout,
    responseTimeoutTitle,
    executionTimeoutTitle,
    withdrawTimeoutTitle
} from '../../../utils/directories';

import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';

import DialogComponent from '../../../components/Dialog';
import ChallengeDetailsDialog from './ChallengeDetailsDialog';
import SelectField from '../../../components/Fields/SelectField';

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
import DirRequestedIcon from '../../../assets/SvgComponents/dir-requested-icon.svg';
import DirChallengedIcon from '../../../assets/SvgComponents/dir-challenged-icon.svg';
import DirRegisteredIcon from '../../../assets/SvgComponents/dir-registered-icon.svg';

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
        width: '600px',
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
        marginLeft: '10px'
    },
    actionButtonIndicator: {
        marginLeft: '10px'
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
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '10px',
        padding: '10px',
        boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)'
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
    disputeInfoWrapper: {
        fontSize: '16px',
        fontWeight: 500,
        paddingTop: '20px',
        paddingBottom: '40px',
        '& p': {
            marginBottom: '10px'
        },
        '& p:last-child': {
            marginBottom: 0
        }
    },
    disputeInfoLabel: {
        fontSize: '18px',
        fontWeight: 600,
        color: colors.greyScale.darkest
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
const extractDirectory = (address, directories) => directories.filter(d => d.address === address)[0];

const fetchLifBalance = async (web3, owner) => {
    const lif = getLifTokenContract(web3);
    const balance = await lif.methods.balanceOf(owner).call();
    return web3.utils.fromWei(balance, 'ether');
};

const fetchLifAllowance = async (web3, owner, spender) => {
    const lif = getLifTokenContract(web3);
    const allowance = await lif.methods.allowance(owner, spender).call();
    return web3.utils.fromWei(allowance, 'ether');
};

const fetchEthBalance = async (web3, owner) => {
    const balance = await web3.eth.getBalance(owner);
    return web3.utils.fromWei(balance, 'ether');
};

const fetchBalances = async (web3, owner, spender) => {
    const lifBalance = await fetchLifBalance(web3, owner);
    const lifAllowance = await fetchLifAllowance(web3, owner, spender);
    const ethBalance = await fetchEthBalance(web3, owner);
    return {
        lifBalance,
        lifAllowance,
        ethBalance
    };
}

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
        setOrgId,
        isOpened,
        handleClose,
        directories,
        isOrgDirectoriesFetching,
        orgDirectories,
        organizationItem
    } = props;
    const [error, setError] = useState(null);
    const [step, setStep] = useState(0);

    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [orgData, setOrgDta] = useState(null);
    const [lifBalance, setLifBalance] = useState(0);
    const [isBalanceOk, setBalanceOk] = useState(false);
    const [isAllowanceOk, setAllowanceOk] = useState(false);

    const [approvalLifStarted, setApprovalLifStarted] = useState(false);
    const [requestStarted, setRequestStarted] = useState(false);

    useEffect(() => {
        if (selectedDirectory) {
            setOrgDta(
                orgDirectories
                    .filter(
                        org => org.ID === organizationItem.orgid &&
                            org.address === selectedDirectory.address
                    )[0]
            );
        } else {
            setOrgDta(null);
        }
    }, [organizationItem, orgDirectories, selectedDirectory]);

    useEffect(() => {
        let pollingInterval;
        if (selectedDirectory) {
            pollingInterval = setInterval(() => {
                fetchBalances(web3, walletAddress, selectedDirectory.address)
                    .then(balances => {
                        setLifBalance(Number(balances.lifBalance));
                        setBalanceOk(Number(balances.lifBalance) >= selectedDirectory.requesterDeposit);
                        setAllowanceOk(Number(balances.lifAllowance) >= selectedDirectory.requesterDeposit);
                    })
                    .catch(setError)
            }, 1500);
        } else {
            clearInterval(pollingInterval);
        }
        return () => clearInterval(pollingInterval);
    }, [web3, walletAddress, organizationItem, directories, selectedDirectory]);

    useEffect(() => {
        switch (step) {
            case 0:
                setSelectedDirectory(null)
                break;
            case 1:
                break;
            case 2:
                break;
            default:
        }
    }, [step]);

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
                setOrgId(organizationItem.orgid);
            })
            .catch(error => {
                setRequestStarted(false);
            });
    }, [web3, walletAddress, organizationItem, setOrgId, setRequestStarted]);

    const onDialogClose = () => {
        setStep(0);
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

    // Extract organization status
    const isOrgRequested = orgData && orgData.status && Number(orgData.status) > 0;

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
                                    initialValues={{
                                        directory: selectedDirectory
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        return errors;
                                    }}
                                    onSubmit={values => {
                                        console.log('@@@', values);
                                        setSelectedDirectory(extractDirectory(
                                            values.directory,
                                            directories
                                        ));
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
                                                    helperText={errors.directory && touched.directory ? errors.directory : null}
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
                    {(step === 1 && !isOrgRequested && isOrgDirectoriesFetching) &&
                        <DialogTitle noMargin>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {((step === 1 || step === 2) && isOrgRequested) &&
                        <>
                            <DialogTitle>
                                Organization Registration Request to the {selectedDirectory.title} Directory has been sent successfully
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
                    {(step === 1 && !isOrgRequested) &&
                        <>
                            <DialogTitle>
                                {selectedDirectory.title} Directory Rules
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
                    {(step === 2 && !isOrgRequested) &&
                        <>
                            <DialogTitle>
                                Register {organizationItem.name} in {selectedDirectory.title} Directory
                            </DialogTitle>
                            <div className={classes.depositNote + (isBalanceOk ? '' : ' insufficient')}>
                                <Typography className={classes.depositNoteSubtitle}>
                                    Required deposit
                                </Typography>
                                <Typography className={classes.depositNoteTitle}>
                                    {selectedDirectory.requesterDeposit} LÍF
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
                                                    onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
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
                                                    selectedDirectory.address,
                                                    selectedDirectory.requesterDepositRaw
                                                )}
                                            >
                                                Unlock Lif Tokens
                                                {(approvalLifStarted || isOrgDirectoriesFetching) &&
                                                    <CircularProgress
                                                        className={classes.inButtonProgress}
                                                        size='26px'
                                                        color='secondary'
                                                    />
                                                }
                                            </Button>
                                        }
                                        {(isBalanceOk && isAllowanceOk) &&
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={requestStarted}
                                                onClick={() => sendRequestToAdd(selectedDirectory)}
                                            >
                                                Request to Register
                                                {(requestStarted || isOrgDirectoriesFetching) &&
                                                    <CircularProgress
                                                        className={classes.inButtonProgress}
                                                        size='26px'
                                                        color='secondary'
                                                    />
                                                }
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    }
                    {error &&
                        <div className={classes.errorWrapper}>
                            <Typography className={classes.errorMessage}>
                                {error.message}
                            </Typography>
                        </div>
                    }
                </div>
            )}
        />
    );
};

const DirectoriesList = props => {
    const classes = styles();
    const {
        orgError,
        isIndexFetching,
        isOrgDirectoriesFetching,
        directories: directoriesDetails,
        orgDirectories,
        organizationItem,
        web3,
        walletAddress,
        setOrgId
    } = props;
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const [executeTimeoutSending, setExecuteTimeoutSending] = useState(false);
    const [withdrawTokensSending, setWithdrawTokensSending] = useState(false);
    const [makeWithdrawalRequestSending, setMakeWithdrawalRequestSending] = useState(false);

    const [challengeDetailsOpen, setChallengeDetailsOpen] = useState(false);
    const [selectedChallengeID, setSelectedChallengeID] = useState(null);
    const [selectedDirectory, setSelectedDirectory] = useState(null);

    useEffect(() => {
        const timeInterval = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(timeInterval);
    }, []);

    const executeTimeoutAction = useCallback((directory, action) => {
        setError(null);
        action.actionIndicatorCallback(true);
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
                setTimeout(() => {
                    action.actionIndicatorCallback(false);
                    setOrgId(organizationItem.orgid);
                }, 5000);
            })
            .catch(error => {
                setError(error);
                action.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem, setOrgId]);

    const makeWithdrawalRequestAction = useCallback((directory, action) => {
        setError(null);
        action.actionIndicatorCallback(true);
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
                setTimeout(() => {
                    action.actionIndicatorCallback(false);
                    setOrgId(organizationItem.orgid);
                }, 5000);
            })
            .catch(error => {
                setError(error);
                action.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem, setOrgId]);

    const withdrawTokensAction = useCallback((directory, action) => {
        console.log('Directory', directory);
        setError(null);
        action.actionIndicatorCallback(true);
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
                setTimeout(() => {
                    action.actionIndicatorCallback(false);
                    setOrgId(organizationItem.orgid);
                }, 5000);
            })
            .catch(error => {
                setError(error);
                action.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem, setOrgId]);

    const showEvidence = (directory, challengeID) => {
        setSelectedDirectory(directory);
        setSelectedChallengeID(challengeID);
        setChallengeDetailsOpen(true);
    };

    const handleCloseChallengeDetails = () => {
        setChallengeDetailsOpen(false);
        setSelectedChallengeID(null);
        setSelectedDirectory(null);
    };

    /**
    Available Actions by the organization status:

    *[CH] Chow only for challenger

    RegistrationRequested:
        challengeOrganization [CH]
        executeTimeout                  executionTimeout >= now
        makeWithdrawalRequest           owner, director

    WithdrawalRequested:
        challengeOrganization [CH]
        executeTimeout                  executionTimeout >= time
        withdrawTokens                  withdrawTimeout >= now

    Challenged:
        acceptChallenge                 responseTimeout <= now
        executeTimeout                  executionTimeout >= now
        withdrawFeesAndRewards [CH]     challenge.resolved <- in the context of the challenge

    Disputed
        submitEvidence                  !challenge.resolved
        fundAppeal                      appealPeriodStart < now < appealPeriodEnd  <- in the context of the challenge
        withdrawFeesAndRewards          challenge.resolved <- in the context of the challenge

    Registered
        challengeOrganization [CH]
        makeWithdrawalRequest           owner, director

    */

    const parseDirectories = (orgDirectories, directories) => orgDirectories
        .map((d, index) => {
            const config = [
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
                            action: 'Finalize registration',
                            actionIndicator: executeTimeoutSending,
                            actionIndicatorCallback: setExecuteTimeoutSending,
                            actionCallback: executeTimeoutAction,
                            timeoutCallback: () => isExecutionTimeout(directories[index], d),
                            timeoutTitle: () => executionTimeoutTitle(directories[index], d)
                        },
                        {
                            action: 'Request Tokens Withdrawal',
                            actionIndicator: makeWithdrawalRequestSending,
                            actionIndicatorCallback: setMakeWithdrawalRequestSending,
                            actionCallback: makeWithdrawalRequestAction,
                            timeoutCallback: () => false,
                            timeoutTitle: () => ''
                        }
                    ]
                },
                // The organization made a withdrawal request.
                {
                    status: 'Withdrawal Requested',
                    statusClass: 'withdrawal-requested',
                    icon: DirChallengedIcon,
                    actions: [
                        // {
                        //     action: 'Remove registration',
                        //     actionIndicator: executeTimeoutSending,
                        //     actionIndicatorCallback: setExecuteTimeoutSending,
                        //     actionCallback: executeTimeoutAction,
                        //     timeoutCallback: isExecutionTimeout
                        // },
                        {
                            action: 'Withdraw Tokens',
                            actionIndicator: withdrawTokensSending,
                            actionIndicatorCallback: setWithdrawTokensSending,
                            actionCallback: withdrawTokensAction,
                            timeoutCallback: () => isWithdrawTimeout(directories[index], d),
                            timeoutTitle: () => withdrawTimeoutTitle(directories[index], d)
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
                            action: 'Remove request',// In current state this action will remove organization request and refund all Lif tokens
                            actionIndicator: executeTimeoutSending,
                            actionIndicatorCallback: setExecuteTimeoutSending,
                            actionCallback: executeTimeoutAction,
                            timeoutCallback: () => isResponseTimeout(directories[index], d),
                            timeoutTitle: () => responseTimeoutTitle(directories[index], d)
                        }
                    ]
                },
                // The challenge has been disputed.
                {
                    status: 'Disputed',
                    statusClass: 'disputed',
                    icon: DirChallengedIcon,
                    actions: []
                },
                {
                    status: 'Registered',
                    statusClass: 'registered',
                    icon: DirRegisteredIcon,
                    actions: [
                        {
                            action: 'Request Tokens Withdrawal',
                            actionIndicator: makeWithdrawalRequestSending,
                            actionIndicatorCallback: setMakeWithdrawalRequestSending,
                            actionCallback: makeWithdrawalRequestAction,
                            timeoutCallback: () => false,
                            timeoutTitle: () => ''
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
        .filter(d => d !== null);

    return (
        <>
            <ChallengeDetailsDialog
                isOpened={challengeDetailsOpen}
                directory={selectedDirectory}
                challengeID={selectedChallengeID}
                handleClose={handleCloseChallengeDetails}
                {...props}
            />
            {(isIndexFetching || isOrgDirectoriesFetching) &&
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
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parseDirectories(orgDirectories, directoriesDetails).map((directory, dirIndex) => (
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    key={dirIndex}
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
                        {[3, 4, 5].includes(directory.status) &&
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
                        <Grid container direction='column'>
                            {directory.config.actions.map((action, i) => (
                                <div  key={i} title={action.timeoutTitle()}>
                                    <Grid item>
                                        <Button
                                            disabled={currentTime && (action.timeoutCallback() || action.actionIndicator)}
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
            {orgError &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {orgError.message}
                    </Typography>
                </div>
            }
        </>
    );
};

const Directories = props => {
    const classes = styles();
    const {
        indexError,
        statsError
    } = props;
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
                {indexError &&
                    <div className={classes.errorWrapper}>
                        <Typography className={classes.errorMessage}>
                            {indexError.message}
                        </Typography>
                    </div>
                }
                {statsError &&
                    <div className={classes.errorWrapper}>
                        <Typography className={classes.errorMessage}>
                            {statsError.message}
                        </Typography>
                    </div>
                }
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        isIndexFetching: isIndexFetching(state),
        isOrgDirectoriesFetching: isOrgDirectoriesFetching(state),
        directories: directories(state),
        orgDirectories: orgDirectories(state),
        indexError: indexError(state),
        statsError: statsError(state),
        orgError: orgError(state),
        organizationItem: selectOrganizationItem(state),
        web3: selectWeb3(state),
        walletAddress: selectSignInAddress(state)
    }
};

const mapDispatchToProps = {
    setOrgId
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
