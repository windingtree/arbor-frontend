import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

import {
  Container,
  Grid,
  Button,
  Typography
} from "@material-ui/core";
import colors from "../../../styles/colors";
import RefershButton from '../../../components/buttons/Refresh';
import { getWeb3 } from '../../../web3/w3';
import { createToken } from '../../../utils/jwt';
import {
  SIMARD_URL,
  SIMARD_DID,
  SIMARD_EXPIRATION
} from '../../../utils/constants';

import {
  selectSignInAddress
} from '../../../ducks/signIn';

const styles = makeStyles({
  error: {
    color: colors.primary.accent
  },
  content: {
    marginBottom: '60px'
  },
  header: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    padding: '40px 0 0 0'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  headerSubtitle: {
    fontSize: '16px',
    lineHeight: 1.4
  },
  accounts: {
    marginTop: '20px'
  },
  accountsTitle: {
    fontWeight: 500,
    fontSize: '18px',
    color: colors.greyScale.darkest,
  },
  buttonWrapper: {
    width: '100%',
    margin: '20px 0'
  },
  button: {
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
  buttonFetch: {
    background: 'linear-gradient(180deg, #99D7C5 -25%, #3A9492 103.57%)',
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    borderRadius: 6,
    color: 'white',
    width: 'auto',
    height: 40,
    textTransform: 'none',
    padding: '12px 20px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '14px'
  },
  deleteButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    float: 'right',
    color: colors.secondary.peach,
    textTransform: 'none'
  }
});

const callSimard = async (authToken) => {
  const result = await fetch(
    `${SIMARD_URL}/accounts`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }
  );

  console.log(result);
};

const SimardAccounts = props => {
  const classes = styles();
  const { orgid, address } = props;
  const sessionKey = `${orgid}:token`;
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem(sessionKey)
  );
  const [accounts, setAccounts] = useState();
  const [error, setError] = useState();
  const [sessionTimeout, setSessionTimeout] = useState();

  useEffect(() => {
    const fetchAccounts = async authToken => {
      setError(null);

      try {
        if (authToken) {
          const accounts = await callSimard(authToken);
          setAccounts(accounts);
        } 
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAccounts(authToken);
  }, [orgid, authToken]);// eslint-disable-line

  const handleFetchAccounts = async () => {
    setError(null);

    try {
      if (!authToken) {
        clearTimeout(sessionTimeout);
        const token = await createToken(
          getWeb3(),
          {
            algorithm: 'ETH',
            expiration: SIMARD_EXPIRATION,
            issuerDidValue: `did:orgid:${orgid}`,
            audienceDidValue: SIMARD_DID,
            scope: '',
            from: address
          }
        );
        sessionStorage.setItem(sessionKey, token);
        setSessionTimeout(setTimeout(
          () => sessionStorage.removeItem(sessionKey),
          SIMARD_EXPIRATION * 1000
        ));
        setAuthToken(token);
        return;
      } else {
        const accounts = await callSimard(authToken);
        setAccounts(accounts);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = () => {};

  return (
    <Container className={classes.content}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant={'inherit'}>
            Simard accounts
          </Typography>
        </div>
        <div className={classes.headerSubtitle}>
          <Typography variant={'inherit'}>
            Review your accounts on the Simard
          </Typography>
        </div>
      </div>
      <div className={classes.accounts}>
        <div className={classes.accountsTitle}>
          <Typography variant={'inherit'}>Accounts</Typography>
        </div>
        <div className={classes.buttonWrapper}>
          <Button onClick={() => {}} className={classes.button}>
            <Typography variant={'inherit'}>+ Add Account</Typography>
          </Button>
        </div>
        <div>
          {(!authToken || !accounts) &&
            <div>
              <RefershButton
                onClick={() => handleFetchAccounts()}
              >
                Fetch Accounts
              </RefershButton>
            </div>
          }
          {(accounts && Array.isArray(accounts)) &&
            <div>
              <ul>
                {accounts.map((a, index) => (
                  <Grid container justify={'space-between'} alignItems={'center'}>
                    <Grid item xs={4}>
                      <Typography>{a.currency}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{a.iban}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        onClick={() => handleDelete(index)}
                        className={classes.deleteButton}
                      >
                        <Typography variant={'inherit'}>Delete Account</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </ul>
            </div>
          }
        </div>
        <div>
          <Typography className={classes.error}>{error}</Typography>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SimardAccounts);
