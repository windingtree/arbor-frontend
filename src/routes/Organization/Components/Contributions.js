import React, { useState, useEffect, useCallback } from 'react';
import history from '../../../redux/history';
import { Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from "../../../styles/colors";
import {
    getArbDirContract,
    sendMethod
} from '../../../ducks/utils/ethereum';
import {
    amountFromWei
} from '../../../utils/directories';

const styles = makeStyles({
    titleWrapper: {
        fontSize: '18px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    dirListIcon: {
        position: 'absolute',
        marginLeft: '-38px'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    },
    hLine: {
        width: '100%',
        borderTop: `1px dotted rgb(143, 153, 159)`,
        marginTop: '20px',
        marginBottom: '20px'
    },
    actionsTable: {
        width: '100%'
    },
    actionButton: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.3,
        float: 'right',
        color: colors.secondary.peach,
        textTransform: 'none'
    },
    actionIndicator: {
        float: 'right',
        marginLeft: '10px'
    }
});

export default props => {
    const classes = styles();
    const {
        isIndexFetching,
        isOrgDirectoriesFetching,
        directories,
        orgDirectories,
        web3,
        walletAddress,
        setOrgId
    } = props;
    const [error, setError] = useState(null);
    const [parsedDirectories, setParsedDirectories] = useState([]);
    const [withdrawFeesAndRewardsSending, setWithdrawFeesAndRewardsSending] = useState(false);
    const [withdrawChallengeId, setWithdrawChallengeId] = useState(null);

    const parseDirectories = useCallback(() => orgDirectories
        .map((d, index) => {
            console.log('[[[', d);
            if (d.status === '0' || !d.contributions || d.contributions.length === 0) {
                return null;
            }

            const details = directories[index];

            return {
                ...details,
                contributions: d.contributions,
                challenges: d.challenges
            };
        })
        .filter(d => d !== null), [
            directories,
            orgDirectories
        ]);

    useEffect(() => {
        setParsedDirectories(parseDirectories());
    }, [parseDirectories]);

    const withdrawFeesAndRewardsAction = (dirAddress, orgId, challengeId) => {
        setError(null);
        setWithdrawChallengeId(challengeId);
        setWithdrawFeesAndRewardsSending(true);
        sendMethod(
            web3,
            walletAddress,
            dirAddress,
            getArbDirContract,
            'withdrawFeesAndRewardsTotal',
            [
                walletAddress, //beneficiary,
                orgId,
                challengeId
            ]
        )
            .then(() => {
                setOrgId(orgId);
                setWithdrawFeesAndRewardsSending(false);
            })
            .catch(error => {
                setError(error);
                setWithdrawFeesAndRewardsSending(false);
            });
    };

    return (
        <>
            <div className={classes.hLine}></div>
            <div className={classes.titleWrapper}>
                <Typography variant={'inherit'}>Fees and Rewards</Typography>
            </div>
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
                            Fees and Rewards list is loading...
                        </Typography>
                    </Grid>
                </Grid>
            }
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.map((directory, dirIndex) => (
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    key={dirIndex}
                >
                    <Grid item xs={3}>
                        <img
                            width='16px'
                            height='16px'
                            className={classes.dirListIcon}
                            alt={directory.title}
                            src={directory.icon}
                        />
                        {directory.title}
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <table>
                            <tbody>
                                <tr>
                                    {directory.contributions.map((contribution, i) => (
                                        <td key={i}>
                                            <Button
                                                className={classes.actionButton}
                                                onClick={() => {
                                                    history.push(`/challenge/${contribution.orgId}/${directory.address}/${contribution.challengeId}`);
                                                }}
                                            >
                                                {amountFromWei(contribution.rewards)} ETH
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={3}>
                        <table className={classes.actionsTable}>
                            <tbody>
                                <tr>
                                    {directory.contributions.map((contribution, i) => (
                                        <td key={i}>
                                            <Button
                                                className={classes.actionButton}
                                                disabled={(withdrawFeesAndRewardsSending &&
                                                    withdrawChallengeId === contribution.challengeId)}
                                                onClick={() => withdrawFeesAndRewardsAction(
                                                    directory.address,
                                                    contribution.orgId,
                                                    contribution.challengeId
                                                )}
                                            >
                                                Withdraw
                                                {(withdrawFeesAndRewardsSending &&
                                                withdrawChallengeId === contribution.challengeId) &&
                                                    <div className={classes.actionIndicator}>
                                                        <CircularProgress size='16px' />
                                                    </div>
                                                }
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            ))}
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.length === 0 &&
                <Typography>
                    No fees or rewards are available for withdrawal
                </Typography>
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
