import Web3 from 'web3';
import React, { useState, useEffect, useCallback } from 'react';
import history from '../../../redux/history';

import {
    ARBITRATOR_ADDRESS
} from '../../../utils/constants';
import {
    getArbDirContract,
    sendMethod,
    getEvidenceEvent,
    getArbitratorContract,
    disputeStatus,
    appealPeriod,
    appealDisputes,
    getCurrentRuling,
    getChallengeInfo,
    getRoundInfo,
    calculateAppealCost,
    getMultiplierDivisor
} from '../../../ducks/utils/ethereum';
import { fetchJson } from '../../../redux/api';
import {
    serializeJson,
    isResponseTimeout
} from '../../../utils/directories';

import { Typography, Button, Grid, CircularProgress, TextField } from '@material-ui/core';
import { Formik } from 'formik';

import DialogComponent from '../../../components/Dialog';
import EvidenceDialog from './EvidenceDialog';
import SelectField from '../../../components/Fields/SelectField';

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";

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
        marginRight: '10px'
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
    appealFundsWrapper: {
        marginLeft: '10px'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    }
});

const validateFile = (uri, jsonData) => {
    const hash = Web3.utils.soliditySha3(serializeJson(jsonData));
    const fileName = uri.match(/([A-Fa-f0-9]{64})(\.json)$/);
    if (!fileName || `0x${fileName[1]}` !== hash) {
        throw new Error('Evidence file is not valid');
    }
};

const createEvidenceStor = async (web3, directory, challengeID) => {
    console.log('Directory', directory);
    const events = await getEvidenceEvent(
        web3,
        directory.address,
        directory.organization.challenges[challengeID].arbitrator,
        directory.organization.ID,
        challengeID + 1
    );
    console.log('Evidence', events);

    const challenge = await getChallengeInfo(web3, directory.address, directory.organization.ID, challengeID);
    console.log('Challenge', challenge);

    let dStatus;
    let aPeriod;
    let aDispute;
    let currentRuling;

    if (challenge.disputed) {
        dStatus = await disputeStatus(
            web3,
            challenge.disputeID
        );
        console.log('disputeStatus:', dStatus);

        if (Number(dStatus) === 1) {
            aPeriod = await appealPeriod(
                web3,
                challenge.disputeID
            );
            aPeriod = {
                start: Number(aPeriod.start) * 1000,
                end: Number(aPeriod.end) * 1000
            };
            console.log('appealPeriod:', aPeriod);
            aDispute = await appealDisputes(
                web3,
                challenge.disputeID
            );
            console.log('appealDisputes:', aDispute);
        }

        currentRuling = await getCurrentRuling(
            web3,
            challenge.disputeID
        );
        console.log('Ruling:', currentRuling);
    }

    const roundInfo = await getRoundInfo(
        web3,
        directory.address,
        directory.organization.ID,
        challengeID,
        Number(challenge.numberOfRounds) - 1
    );
    console.log('Round:', roundInfo);

    const multiplierDivisor = await getMultiplierDivisor(web3, directory.address);

    return {
        directory,
        challenge: {
            challengeID,
            ...challenge
        },
        events: events.map(ev => ev.returnValues),
        disputeStatus: Number(dStatus),
        appealPeriod: aPeriod,
        appealDispute: aDispute,
        currentRuling: Number(currentRuling),
        roundInfo,
        multiplierDivisor
    };
};

const fetchFiles = async events => Promise.all(events.map(
    ev => new Promise(
        resolve => fetchJson(ev._evidence)
            .then(evidence => {
                console.log('%%%%', evidence);
                resolve({
                    ...ev,
                    evidence,
                    validated: validateFile(ev._evidence, evidence, true)
                });
            })
            .catch(error => {
                resolve({
                    ...ev,
                    evidence: null,
                    validated: false,
                    error
                });
            })
    )
));

const getWinner = currentRuling => {
    switch (currentRuling) {
        case 1:
            return 'requester';
        case 2:
            return 'challenger';
        default:
            return 'not selected';
    }
};

const toBN = value => Web3.utils.toBN(value);

const isWinner = (currentRuling, party) => String(currentRuling) === String(party);

const amountToWei = amount => Web3.utils.toWei(String(amount), 'ether');

const amountFromWei = (amount, withDivisor) => {
    if (withDivisor) {
        amount = toBN(amount).mul(toBN(withDivisor)).toString();
    }
    return Web3.utils.fromWei(String(amount), 'ether');
};

const isLoserPeriod = (currentRuling, party, appealPeriod) => {
    // (now-appealPeriodStart < (appealPeriodEnd-appealPeriodStart)/2)
    const start = Number(appealPeriod.start) * 1000;
    const end = Number(appealPeriod.end) * 1000;
    return !isWinner(currentRuling, party) &&
        (Date.now() - start < (end - start) / 2)
};

const loserDeadline = appealPeriod => {
    const start = Number(appealPeriod.start) * 1000;
    const end = Number(appealPeriod.end) * 1000;
    return new Date(Date.now() - ((end - start) / 2)).toISOString();
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

const InfoLabel = props => {
    const classes = styles();
    const {
        children
    } = props;

    return (
        <Typography
            className={classes.disputeInfoLabel}
            variant='inherit'
        >
            {children}
        </Typography>
    );
};

const AppealDialog = props => {
    const classes = styles();
    const {
        web3,
        walletAddress,
        ethBalance,
        organizationItem,
        directory,
        challengeID,
        evidenceStor,
        isOpened,
        handleClose
    } = props;
    const [error, setError] = useState(null);

    // Storage
    const [isLoading, setIsLoading] = useState(false);
    const [selectOptions, setSelectOptions] = useState({});
    const [challenge, setChallenge] = useState(null);
    const [appealCost, setAppealCost] = useState(null);
    const [isAppealSending, setIsAppealSending] = useState(false);
    const [appealAmount, setAppealAmount] = useState(0);

    const isAmountOk = amount => {
        const amountBN = toBN(amountToWei(amount));
        const balance = toBN(amountToWei(ethBalance));
        const gasCost = toBN(appealCost.gasCost);
        return amountBN.gte(gasCost) && balance.gte(amountBN);
    };

    const updateAppealCost = useCallback(party => {
        if (challenge) {
            setError(null);
            if (isLoserPeriod(evidenceStor.currentRuling, party, evidenceStor.appealPeriod)) {
                setError(new Error(
                    `The loser must contribute during the first half of the period. No later than ${loserDeadline(evidenceStor.appealPeriod)}`
                ));
            }
            setIsLoading(true);
            calculateAppealCost(
                web3,
                walletAddress,
                directory.address,
                organizationItem.orgid,
                party,
                challengeID,
                challenge
            )
                .then(({ totalCost, gasCost, gasPrice }) => {
                    setAppealCost({
                        rawValue: totalCost,
                        value: Web3.utils.fromWei(totalCost, 'ether'),
                        gasCost,
                        gasPrice
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                });
        }
    }, [web3, walletAddress, directory, organizationItem, challengeID, challenge, evidenceStor]);

    useEffect(() => {
        if (evidenceStor && evidenceStor.currentRuling) {
            setSelectOptions({
                0: 'No winners',
                1: `Requester${isWinner(evidenceStor.currentRuling, 1) ? ' (winner)' : ''}`,
                2: `Challenger${isWinner(evidenceStor.currentRuling, 2) ? ' (winner)' : ''}`
            });
        }
    }, [evidenceStor]);

    useEffect(() => {
        setError(null);
        getChallengeInfo(
            web3,
            directory.address,
            organizationItem.orgid,
            challengeID
        )
            .then(setChallenge)
            .catch(setError);
    }, [web3, directory, organizationItem, challengeID]);

    useEffect(() => {}, []);

    const onDialogClose = () => {
        handleClose();
    };

    const fundAppealAction = async (party, amount) => {
        try {
            setError(null);
            if (!appealCost) {
                throw new Error(
                    'Please select a party fo funding to get the appeal cost'
                );
            }
            setIsAppealSending(true);
            await sendMethod(
                web3,
                walletAddress,
                directory.address,
                getArbDirContract,
                'fundAppeal',
                [
                    organizationItem.orgid,
                    party
                ],
                amountToWei(amount),
                appealCost.gasPrice
            );
            setIsAppealSending(false);
            handleClose();
        } catch (error) {
            setError(error);
            setIsAppealSending(false);
        }
    };

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <div className={classes.dialogContent}>
                    <DialogTitle>
                        Fund Appeal
                    </DialogTitle>
                    {isLoading &&
                        <DialogTitle noMargin>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {(appealCost && !isLoading) &&
                        <div className={classes.depositNote + (isAmountOk(appealAmount) ? '' : ' insufficient')}>
                            <Typography className={classes.depositNoteSubtitle}>
                                Total Appeal Cost
                            </Typography>
                            <Typography className={classes.depositNoteTitle}>
                                {appealCost.value} ETH
                            </Typography>
                            <Typography>
                                Minimum amount (Gas cost): {amountFromWei(appealCost.gasCost)} ETH
                            </Typography>
                            <Typography>
                                You can fund less than required total cost.
                            </Typography>
                            <Typography>
                                If you send more the rest will be returned to your account during the transaction
                            </Typography>
                        </div>
                    }
                    <div className={classes.dialogSelectorWrapper}>
                        <Formik
                            initialValues={{ party: '', amount: 0 }}
                            validate={values => {
                                const errors = {};
                                return errors;
                            }}
                            onSubmit={values => {
                                console.log('@@@', values);
                                fundAppealAction(
                                    values.party,
                                    values.amount
                                );
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.inputFieldWrapper}>
                                        <SelectField
                                            name='party'
                                            variant='filled'
                                            label='Challenge Party'
                                            fullWidth
                                            required
                                            options={selectOptions}
                                            values={values.party}
                                            handleChange={evt => {
                                                updateAppealCost(evt.target.value);
                                                handleChange(evt);
                                            }}
                                            handleBlur={handleBlur}
                                            helperText={errors.party && touched.party ? errors.party : null}
                                        />
                                    </div>
                                    <div className={classes.inputFieldWrapper}>
                                        <TextField
                                            type='number'
                                            name='amount'
                                            autoComplete='none'
                                            variant='filled'
                                            label='Amount ETH'
                                            fullWidth
                                            required
                                            value={values.amount}
                                            onChange={evt => {
                                                setAppealAmount(evt.target.value || 0);
                                                handleChange(evt);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.amount && touched.amount ? errors.amount : null}
                                        />
                                    </div>
                                    {error &&
                                        <div className={classes.errorWrapper}>
                                            <Typography className={classes.errorMessage}>
                                                {error.message}
                                            </Typography>
                                        </div>
                                    }
                                    <div className={classes.dialogButtonWrapper}>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='space-between'
                                        >
                                            <Grid item>
                                                <Button
                                                    className={classes.dialogButton}
                                                    onClick={handleClose}
                                                >
                                                    Close
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction='column'>
                                                    <Grid item>
                                                        <Button
                                                            className={classes.dialogButton}
                                                            disabled={!appealCost || isAppealSending || isLoading}
                                                            type='submit'
                                                        >
                                                            Fund Appeal
                                                            {(isAppealSending) &&
                                                                <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                            }
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
        )} />
    );
};

export default props => {
    const classes = styles();
    const {
        web3,
        walletAddress,
        organizationItem,
        directory,
        challengeID,
        isOpened,
        handleClose
    } = props;
    const [error, setError] = useState(null);

    // Storage
    const [isFetching, setIsFetching] = useState(false);
    const [evidenceStor, setEvidenceStor] = useState(null);
    const [evidenceList, setEvidenceList] = useState([]);

    // Dialogs open flags
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [isEvidenceDialogOpen, setIsEvidenceDialogOpen] = useState(false);
    const [isAppealOpened, setIsAppealOpened] = useState(false);

    // Actions progress
    const [withdrawFeesAndRewardsSending, setWithdrawFeesAndRewardsSending] = useState(false);
    const [giveRulingNoneSending, setGiveRulingNoneSending] = useState(false);
    const [giveRulingRequesterSending, setGiveRulingRequesterSending] = useState(false);
    const [giveRulingChallengerSending, setGiveRulingChallengerSending] = useState(false);
    const [finalRuleRequesterSending, setFinalRuleRequesterSending] = useState(false);
    const [finalRuleChallengerSending, setFinalRuleChallengerSending] = useState(false);

    const updateEvidenceStor = useCallback(() => {
        if (directory !== null && challengeID !== null) {
            setIsFetching(true);
            createEvidenceStor(web3, directory, challengeID)
                .then(stor => {
                    setEvidenceStor(stor);
                    return fetchFiles(stor.events);
                })
                .then(items => {
                    setEvidenceList(items);
                    setIsFetching(false);
                })
                .catch(error => {
                    setError(error);
                    setIsFetching(false);
                });
        }
    }, [web3, directory, challengeID]);

    useEffect(() => {
        updateEvidenceStor();
        return () => {
            setEvidenceStor(null);
            setEvidenceList([]);
        };
    }, [updateEvidenceStor]);

    const onDialogClose = () => {
        handleClose();
    };

    const handleCloseAcceptDialog = () => {
        updateEvidenceStor();
        setIsAcceptDialogOpen(false);
    };

    const handleCloseEvidenceDialog = () => {
        updateEvidenceStor();
        setIsEvidenceDialogOpen(false);
    };

    const handleCloseAppealDialog = () => {
        updateEvidenceStor();
        setIsAppealOpened(false);
    };

    // Actions
    const acceptChallengeAction = () => {
        setIsAcceptDialogOpen(true)
    };

    const submitEvidenceAction = () => {
        setIsEvidenceDialogOpen(true)
    };

    const withdrawFeesAndRewardsAction = roundId => {
        setError(null);
        setWithdrawFeesAndRewardsSending(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'withdrawFeesAndRewards',
            [
                walletAddress, //beneficiary,
                organizationItem.orgid,
                challengeID,
                roundId
            ]
        )
            .then(() => {
                updateEvidenceStor();
                setWithdrawFeesAndRewardsSending(false);
            })
            .catch(error => {
                setError(error);
                setWithdrawFeesAndRewardsSending(false);
            });
    };

    const giveRulingAction = (disputeId, party) => {
        setError(null);
        if (!ARBITRATOR_ADDRESS) {
            return setError(new Error('Arbitrator features are disabled'));
        }
        let progressCallback;
        switch (party) {
            case 0:
                progressCallback = setGiveRulingNoneSending;
                break;
            case 1:
                progressCallback = setGiveRulingRequesterSending;
                break;
            case 2:
                progressCallback = setGiveRulingChallengerSending;
                break;
            default:
                throw new Error('Wrong party');
        }
        progressCallback(true);
        console.log('>>>', [
            disputeId,
            party
        ]);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbitratorContract,
            'giveRuling',
            [
                disputeId,
                party
            ]
        )
            .then(() => {
                updateEvidenceStor();
                progressCallback(false);
            })
            .catch(error => {
                setError(error);
                progressCallback(false);
            });
    };

    const finalRuleAction = (disputeId, party) => {
        setError(null);
        if (!ARBITRATOR_ADDRESS) {
            return setError(new Error('Arbitrator features are disabled'));
        }
        let progressCallback;
        switch (party) {
            case 1:
                progressCallback = setFinalRuleRequesterSending;
                break;
            case 2:
                progressCallback = setFinalRuleChallengerSending;
                break;
            default:
                throw new Error('Wrong party');
        }
        progressCallback(true);
        sendMethod(
            web3,
            walletAddress,
            ARBITRATOR_ADDRESS,
            getArbitratorContract,
            'rule',
            [
                disputeId,
                party
            ]
        )
            .then(() => {
                updateEvidenceStor();
                progressCallback(false);
            })
            .catch(error => {
                setError(error);
                progressCallback(false);
            });
    };

    const fundAppealAction = () => {
        setIsAppealOpened(true);
    };

    const isFeeNotRewarded = () => evidenceStor && evidenceStor.roundInfo && Number(evidenceStor.roundInfo.feeRewards) > 0;

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <div className={classes.dialogContent}>
                    <EvidenceDialog
                        {...props}
                        dialogTitle='Accept Challenge'
                        actionMethod='acceptChallenge'
                        isOpened={isAcceptDialogOpen}
                        handleClose={handleCloseAcceptDialog}
                        directory={directory}
                    />
                    <EvidenceDialog
                        {...props}
                        dialogTitle='Submit Evidence'
                        actionMethod='submitEvidence'
                        isOpened={isEvidenceDialogOpen}
                        handleClose={handleCloseEvidenceDialog}
                        directory={directory}
                        noFunding
                    />
                    <AppealDialog
                        {...props}
                        isOpened={isAppealOpened}
                        handleClose={handleCloseAppealDialog}
                        directory={directory}
                        evidenceStor={evidenceStor}
                    />
                    <DialogTitle>
                        Challenge Details
                    </DialogTitle>
                    {isFetching &&
                        <DialogTitle noMargin>
                            <CircularProgress />
                        </DialogTitle>
                    }
                    {(!isFetching && evidenceStor) &&
                        <div>
                            {evidenceStor.challenge &&
                                <div className={classes.disputeInfoWrapper}>
                                    <p>
                                        <InfoLabel>
                                            Directory:
                                        </InfoLabel> {evidenceStor.directory.title}
                                    </p>
                                    <p>
                                        <InfoLabel>
                                            Requester:
                                        </InfoLabel> {evidenceStor.directory.organization.requester}
                                    </p>
                                    <p>
                                        <InfoLabel>
                                            Challenger:
                                        </InfoLabel> {evidenceStor.challenge.challenger}
                                    </p>
                                    <p>
                                        <InfoLabel>
                                            Round:
                                        </InfoLabel> {evidenceStor.challenge.numberOfRounds}
                                    </p>
                                    <p>
                                        <InfoLabel>
                                            Winner:
                                        </InfoLabel> {getWinner(evidenceStor.currentRuling)}
                                    </p>
                                    <p>
                                        <InfoLabel>
                                            Disputed:
                                        </InfoLabel> {evidenceStor.challenge.disputed ? 'yes' : 'no'}
                                    </p>
                                    {evidenceStor.challenge.disputed &&
                                        <>
                                            <p>
                                                <InfoLabel>
                                                    Dispute #
                                                </InfoLabel> {evidenceStor.challenge.disputeID}
                                            </p>
                                            <p>
                                                <InfoLabel>
                                                    Dispute status:
                                                </InfoLabel> {evidenceStor.disputeStatus === 0 ? 'waiting' : evidenceStor.disputeStatus === 1 ? 'appealable' : 'solved'}
                                            </p>
                                            {evidenceStor.appealPeriod &&
                                                <>
                                                    <p>
                                                        <InfoLabel>
                                                            Current time:
                                                        </InfoLabel> {new Date().toISOString()}
                                                    </p>
                                                    <p>
                                                        <InfoLabel>
                                                            Appealable period start:
                                                        </InfoLabel> {new Date(evidenceStor.appealPeriod.start).toISOString()}
                                                    </p>
                                                    <p>
                                                        <InfoLabel>
                                                            Appealable period end:
                                                        </InfoLabel> {new Date(evidenceStor.appealPeriod.end).toISOString()}
                                                    </p>
                                                    <p>
                                                        <InfoLabel>
                                                            Appeal funds:
                                                        </InfoLabel>
                                                    </p>
                                                    <div className={classes.appealFundsWrapper}>
                                                        <p>
                                                            No winners: {amountFromWei(evidenceStor.roundInfo.paidFees[0], evidenceStor.multiplierDivisor)} ETH;
                                                        </p>
                                                        <p>
                                                            Requester:  {amountFromWei(evidenceStor.roundInfo.paidFees[1], evidenceStor.multiplierDivisor)} ETH;
                                                        </p>
                                                        <p>
                                                            Challenger: {amountFromWei(evidenceStor.roundInfo.paidFees[2], evidenceStor.multiplierDivisor)} ETH
                                                        </p>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                            }
                            {evidenceList.map((ev, i) => (
                                <div key={i} className={classes.challengeDetailsWrapper}>
                                    <table
                                        cellSpacing='10'
                                        width='100%'
                                    >
                                        <thead>
                                            <tr>
                                                <td width='20%'>
                                                    <Typography className={classes.challengeDetailsLabel}>
                                                        Evidence from:
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography className={classes.challengeDetailsText}>
                                                        {ev._party}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </thead>
                                        {ev.evidence &&
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Typography className={classes.challengeDetailsLabel}>
                                                            Name:
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography className={classes.challengeDetailsText}>
                                                            {ev.evidence.name}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Typography className={classes.challengeDetailsLabel}>
                                                            Description:
                                                        </Typography>
                                                    </td>
                                                    <td>
                                                        <Typography className={classes.challengeDetailsText}>
                                                            {ev.evidence.description}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2'>
                                                        <a
                                                            alt={ev.evidence.description}
                                                            href={ev.evidence.fileURI}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                        >
                                                            Link to the evidence
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                        {(!ev.evidence && ev.error) &&
                                            <tbody>
                                                <tr>
                                                    <td colSpan='2'>
                                                        <a
                                                            alt={''}
                                                            href={ev._evidence}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                        >
                                                            Link to the evidence
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2'>
                                                        <Typography className={classes.errorMessage}>
                                                            {ev.error.message}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            ))}
                        </div>
                    }
                    {error &&
                        <div className={classes.errorWrapper}>
                            <Typography className={classes.errorMessage}>
                                {error.message}
                            </Typography>
                        </div>
                    }
                    {!isFetching &&
                        <div className={classes.dialogButtonWrapper}>
                            <Grid
                                container
                                direction='row'
                                justify='space-between'
                            >
                                <Grid item>
                                    <Button
                                        className={classes.dialogButton}
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column'>
                                        {!walletAddress &&
                                            <Grid item>
                                                <Button
                                                    className={classes.dialogButtonRed}
                                                    onClick={() => history.push('/authorization/signin', { follow: history.location.pathname })}
                                                >
                                                    Sign Up to see available actions
                                                </Button>
                                            </Grid>
                                        }
                                        {(walletAddress && evidenceStor) &&
                                            <>
                                                {walletAddress.toLowerCase() === evidenceStor.directory.organization.requester.toLowerCase() &&
                                                    <Grid item>
                                                        <Button
                                                            className={classes.dialogButton}
                                                            disabled={!walletAddress || !isResponseTimeout(evidenceStor.directory)}
                                                            onClick={() => acceptChallengeAction()}
                                                        >
                                                            Accept Challenge
                                                        </Button>
                                                    </Grid>
                                                }
                                                {evidenceStor.challenge.disputed &&
                                                    <>
                                                        {!evidenceStor.challenge.resolved &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButton}
                                                                    disabled={!walletAddress}
                                                                    onClick={() => submitEvidenceAction()}
                                                                >
                                                                    Submit Evidence
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(!evidenceStor.challenge.resolved && evidenceStor.currentRuling !== 0 && evidenceStor.appealPeriod) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButton}
                                                                    disabled={!walletAddress ||
                                                                        Date.now() > evidenceStor.appealPeriod.end ||
                                                                        isAppealOpened}
                                                                    onClick={() => fundAppealAction(evidenceStor.directory)}
                                                                >
                                                                    Fund Appeal
                                                                    {withdrawFeesAndRewardsSending &&
                                                                        <div className={classes.actionIndicator}>
                                                                            <CircularProgress size='16px' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(evidenceStor.challenge.resolved && isFeeNotRewarded()) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButton}
                                                                    disabled={!walletAddress || withdrawFeesAndRewardsSending}
                                                                    onClick={() => withdrawFeesAndRewardsAction(
                                                                        evidenceStor.directory,
                                                                        evidenceStor.challenge.challengeID,
                                                                        Number(evidenceStor.challenge.numberOfRounds) - 1
                                                                    )}
                                                                >
                                                                    Withdraw Fees And Rewards
                                                                    {withdrawFeesAndRewardsSending &&
                                                                        <div className={classes.actionIndicator}>
                                                                            <CircularProgress size='16px' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(ARBITRATOR_ADDRESS && !evidenceStor.challenge.resolved) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButtonRed}
                                                                    disabled={!walletAddress || finalRuleRequesterSending}
                                                                    onClick={() => finalRuleAction(
                                                                        evidenceStor.challenge.disputeID,
                                                                        1
                                                                    )}
                                                                >
                                                                    Final Rule: Requester
                                                                    {finalRuleRequesterSending &&
                                                                        <div className={classes.actionButtonIndicator}>
                                                                            <CircularProgress size='16px' color='secondary' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(ARBITRATOR_ADDRESS && !evidenceStor.challenge.resolved) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButtonRed}
                                                                    disabled={!walletAddress || finalRuleChallengerSending}
                                                                    onClick={() => finalRuleAction(
                                                                        evidenceStor.challenge.disputeID,
                                                                        2
                                                                    )}
                                                                >
                                                                    Final Ruling: Challenger
                                                                    {finalRuleChallengerSending &&
                                                                        <div className={classes.actionButtonIndicator}>
                                                                            <CircularProgress size='16px' color='secondary' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(ARBITRATOR_ADDRESS && !evidenceStor.challenge.resolved) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButtonRed}
                                                                    disabled={!walletAddress || withdrawFeesAndRewardsSending}
                                                                    onClick={() => giveRulingAction(
                                                                        evidenceStor.challenge.disputeID,
                                                                        0
                                                                    )}
                                                                >
                                                                    Juror: NO Winners
                                                                    {giveRulingNoneSending &&
                                                                        <div className={classes.actionButtonIndicator}>
                                                                            <CircularProgress size='16px' color='secondary' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(ARBITRATOR_ADDRESS && !evidenceStor.challenge.resolved) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButtonRed}
                                                                    disabled={!walletAddress || withdrawFeesAndRewardsSending}
                                                                    onClick={() => giveRulingAction(
                                                                        evidenceStor.challenge.disputeID,
                                                                        1
                                                                    )}
                                                                >
                                                                    Juror: set Requester as Winner
                                                                    {giveRulingRequesterSending &&
                                                                        <div className={classes.actionButtonIndicator}>
                                                                            <CircularProgress size='16px' color='secondary' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                        {(ARBITRATOR_ADDRESS && !evidenceStor.challenge.resolved) &&
                                                            <Grid item>
                                                                <Button
                                                                    className={classes.dialogButtonRed}
                                                                    disabled={!walletAddress || withdrawFeesAndRewardsSending}
                                                                    onClick={() => giveRulingAction(
                                                                        evidenceStor.challenge.disputeID,
                                                                        2
                                                                    )}
                                                                >
                                                                    Juror: set Challenger as Winner
                                                                    {giveRulingChallengerSending &&
                                                                        <div className={classes.actionButtonIndicator}>
                                                                            <CircularProgress size='16px' color='secondary' />
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </Grid>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    }
                </div>
            )}
        />
    );
};
