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
        alignItems: 'row'
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
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        marginLeft: 0
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
        marginLeft: '12px',
        marginBottom: '-4px',
        color: '#5E666A'
    },
    withdrawalLabel: {
        color: '#F8997A'
    }
});

const LifDepostValue = props => {
    const {
        orgid: id,
        canManage,
        isFetching,
        deposit,
        withdrawalExist,
        withdrawalValue,
        withdrawalTime,
        enrichLifData
    } = props;
    const classes = useStyles();
    const orgid = id || (history.location.state ? history.location.state.id : history.location.pathname.split('/')[2]);

    useEffect(() => {
        enrichLifData({ orgid });
    }, [orgid, enrichLifData]);

    return (
        <Grid className={classes.item} container justify='space-between' alignItems='center'>
            <Grid item xs={4} className={classes.alignRow}>
                <IconLif />
                <Typography className={classes.labelProof}>
                    {canManage &&
                        <span onClick={() => history.push({
                            pathname: '/trust/lif-stake',
                            state: {
                                orgid
                            }
                        })}
                        >
                            Líf tokens deposit
                        </span>
                    }
                    {!canManage &&
                        <>Líf tokens deposit</>
                    }
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {isFetching &&
                    <CircularProgress
                        className={classes.progress}
                        variant='indeterminate'
                        size={18}
                        thickness={4}
                    />
                }
                {!isFetching &&
                    <Typography className={classes.lifLabel}>
                        {deposit} Líf
                    </Typography>
                }
                {withdrawalExist &&
                    <Typography className={[classes.lifLabel, classes.withdrawalLabel].join(' ')}>
                        (withdrawal requested: {withdrawalValue} Líf at {(new Date(withdrawalTime)).toISOString().split('T')[0]}) 
                    </Typography>
                }
            </Grid>
            <Grid item xs={1}>
                <div onClick={!isFetching 
                    ? () => enrichLifData({ orgid })
                    : () => {}
                }>
                    <IconRestart style={{marginLeft: '4px'}} stroke='#F79A8B' />
                </div>
                
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(LifDepostValue);
