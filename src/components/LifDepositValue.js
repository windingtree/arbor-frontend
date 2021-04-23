import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../redux/history';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import IconLif from './icons/IconLif';
import IconRestart from './icons/IconRestart';

import {
    enrichLifData,
    selectLifDepositDataFetching,
    selectOrgIdLifDepositAmount,
    selectOrgIdLifWithdrawalExist,
    selectOrgIdLifWithdrawalValue,
    selectOrgIdLifWithdrawalTime
} from '../ducks/lifDeposit';

const useStyles = makeStyles({
    item: {
        marginBottom: '24px',
        '&:last-child': {
            marginBottom: 0
        }
    },
    alignRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'row',
        marginBottom: '10px',
    },
    label: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: 'black',
        textDecoration: 'underline',
        cursor: 'pointer',
        marginLeft: '27px',
        '&.removed': {
            color: '#5E666A',
            textDecoration: 'none',
            cursor: 'auto'
        }
    },
    lifLabel: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        textDecoration: 'none',
        cursor: 'pointer',
        marginLeft: '52px',
        color: 'rgb(94, 102, 106)'
    },
    labelPub: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        marginLeft: '27px',
        '&.removed': {
            color: '#5E666A',
            textDecoration: 'none',
            cursor: 'auto'
        }
    },
    labelProof: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        textDecoration: 'none',
        color: '#969696',
        cursor: 'pointer',
        marginLeft: '27px',
        '& a,span': {
            color: '#969696',
            textDecoration: 'none',
            '&:hover': {
                color: '#98CCB0',
                textDecoration: 'underline'
            }
        }
    },
    deleteBtn: {
        cursor: 'pointer'
    },
    deleteBtnDisabled: {
        cursor: 'auto',
        opacity: '0.5'
    },
    state: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '28px',
        color: 'black',
        '&.verified': {
            color: '#4E9D96'
        },
        '&.not-verified': {
            color: '#F8997A'
        },
        '&.not-deployed': {
            color: '#4E9D96'
        },
        '&.in-queue': {
            color: '#5E666A'
        }
    },
    progress: {
        color: '#5E666A'
    },
    withdrawalLabel: {
        color: '#F8997A'
    },
    actionBlock: {
        display: 'flex',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            justifyContent: 'flex-start',
            paddingLeft: '48px'
        }
    }
});

const LifDepositValue = props => {
    const {
        orgid,
        canManage,
        isFetching,
        deposit,
        withdrawalExist,
        withdrawalValue,
        withdrawalTime,
        enrichLifData
    } = props;
    const classes = useStyles();

    useEffect(() => {
        enrichLifData({ orgid });
    }, [orgid, enrichLifData]);

    return (
        <Grid className={classes.item} container justify='space-between' alignItems='center'>
            <Grid item xs={12} sm={6} className={classes.alignRow}>
                <IconLif />
                <Typography className={classes.labelProof}>
                    {canManage &&
                        <span onClick={() => {
                            history.push(`/my-organizations/${orgid}/lif-stake`, { id: orgid })
                        }}
                        >
                            Líf stake
                        </span>
                    }
                    {!canManage &&
                        <>Líf stake</>
                    }
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.alignRow}>
                {isFetching &&
                    <Typography className={classes.lifLabel}>
                        <CircularProgress
                            className={classes.progress}
                            variant='indeterminate'
                            size={18}
                        />
                    </Typography>
                }
                {!isFetching &&
                    <Typography className={classes.lifLabel}>
                        {deposit} deposited
                    </Typography>
                }
                {withdrawalExist &&
                    <Typography className={[classes.lifLabel, classes.withdrawalLabel].join(' ')}>
                        (withdrawal requested: {withdrawalValue} Líf at {(new Date(withdrawalTime)).toISOString().split('T')[0]})
                    </Typography>
                }
            </Grid>
            <Grid item xs={12} sm={1} justify='flex-end' className={classes.actionBlock}>
                {canManage &&
                    <div onClick={!isFetching
                        ? () => enrichLifData({ orgid })
                        : () => {}
                    }>
                        <IconRestart style={{marginLeft: '4px'}} stroke='#F79A8B' />
                    </div>
                }
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        isFetching: selectLifDepositDataFetching(state),
        deposit: selectOrgIdLifDepositAmount(state),
        withdrawalExist: selectOrgIdLifWithdrawalExist(state),
        withdrawalValue: selectOrgIdLifWithdrawalValue(state),
        withdrawalTime: selectOrgIdLifWithdrawalTime(state)
    }
  };

  const mapDispatchToProps = {
    enrichLifData
  };

  export default connect(mapStateToProps, mapDispatchToProps)(LifDepositValue);
