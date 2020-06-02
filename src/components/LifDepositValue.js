import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";

import {
    enrichLifData,
    selectLifDepositDataFetching,
    selectOrgIdLifDepositAmount,
    selectOrgIdLifWithdrawalExist,
    selectOrgIdLifWithdrawalValue,
    selectOrgIdLifWithdrawalTime
  } from '../ducks/lifDeposit';

const LifDepostValue = props => {
    const {
        orgid,
        isFetching,
        deposit,
        withdrawalExist,
        withdrawalValue,
        withdrawalTime,
        enrichLifData
    } = props;

    useEffect(() => {
        enrichLifData({ orgid });
    }, [orgid, enrichLifData]);

    return (
        <Typography>
            {isFetching &&
                <span>
                    Fetching deposit value...
                </span>
            }
            {!isFetching &&
                <span>
                    {deposit} Lif tokens in deposit (<i onClick={() => props.enrichLifData({ orgid })}>reload</i>)
                </span>
            }
            {withdrawalExist &&
                <span>
                   (withdrawal requested: {withdrawalValue} at {(new Date(withdrawalTime)).toISOString().split('T')}) 
                </span>
            }    
        </Typography>
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
