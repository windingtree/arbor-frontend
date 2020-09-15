import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import colors from "../../../styles/colors";
import RefershButton from '../../../components/buttons/Refresh';
import DialogComponent from '../../../components/Dialog';
import SelectField from '../../../components/Fields/SelectField';
import { Formik } from 'formik';
import { createToken } from '../../../utils/jwt';
import {
  SIMARD_URL,
  SIMARD_DID,
  SIMARD_EXPIRATION
} from '../../../utils/constants';

import {
  selectSignInAddress,
  selectWeb3
} from '../../../ducks/signIn';

const styles = makeStyles({
  error: {
    color: colors.primary.accent,
    marginTop: '10px'
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
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center'
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
    padding: '20px 0',
    '&:disabled': {
      opacity: '0.5'
    }
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
    lineHeight: '14px',
    '&:disabled': {
      opacity: '0.5'
    }
  },
  deleteButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    float: 'right',
    color: colors.secondary.peach,
    textTransform: 'none',
    '&:disabled': {
      opacity: '0.5'
    }
  },
  dialogContent: {
    width: '440px'
  },
  dialogTitleWrapper: {
    marginBottom: '20px'
  },
  dialogTitleWrapperCenter: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest
  },
  inputFieldWrapper: {
    position: 'relative',
    marginBottom: '28px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  dialogButtonWrapper: {
    display: 'table',
    paddingTop: '10px',
    margin: '0 auto'
  },
  dialogButton: {
    height: '44px',
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    backgroundImage: colors.gradients.orange,
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    textTransform: 'none',
    padding: '6px 20px',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'none'
    }
  },
  dialogCancelButton: {
    height: '44px',
    border: `1px solid #3A9492`,
    borderRadius: '8px',
    background: 'linear-gradient(180deg, #99D7C5 -25%, #3A9492 103.57%)',
    boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
    textTransform: 'none',
    padding: '6px 20px',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'none'
    }
  },
  dialogButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  editAccount: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  confirmationButtonsWrapper: {
    marginTop: '20px'
  }
});

const callSimard = async (authToken, path, method, body) => new Promise((resolve, reject) => {
  fetch(
    path,
    {
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        ...(
          body
            ? {
              'Content-Type': 'application/json'
            }
            : {}
        )
      },
      ...(
        body
          ? { body: JSON.stringify(body) }
          : {}
      )
    }
  )
  .then(async response => {
    try {
      const json = await response.json();
      return {
        isOk: response.ok,
        status: response.status,
        json
      };
    } catch (error) {
      console.log(error);
      const err = new Error('Unable to parse response from the Simard Pay');
      err.details = error.message;
      throw err;
    }
  })
  .then(({ isOk, status, json }) => {
    if (!isOk) {
      const message = json.message
        ? json.message.split('|')[0]
        : 'Unknown error'
      const error = new Error(message);
      error.status = status;
      return reject(error);
    }

    resolve(json);
  })
  .catch(reject);
});

const getSimardAccounts = async authToken => {
  const accounts = await callSimard(
    authToken,
    `${SIMARD_URL}/accounts`,
    'GET'
  );

  return Object.entries(accounts).map(record => ({
    accountId: record[0],
    ...record[1]
  }));
}

const createSimardAccount = (authToken, { currency, iban }) => callSimard(
  authToken,
  `${SIMARD_URL}/accounts`,
  'POST',
  {
    currency,
    iban
  }
);

const updateSimardAccount = (authToken, { accountId, currency, iban }) => callSimard(
  authToken,
  `${SIMARD_URL}/accounts/${accountId}`,
  'POST',
  {
    currency,
    iban
  }
);

const removeSimardAccount = (authToken, accountId) => callSimard(
  authToken,
  `${SIMARD_URL}/accounts/${accountId}`,
  'DELETE'
);

const DeleteAccountDialog = props => {
  const classes = styles();
  const { handleClose, isOpen, onDelete } = props;

  return (
    <DialogComponent
      handleClose={handleClose}
      isOpen={isOpen}
      children={(
        <div className={classes.dialogContent}>
          <div className={classes.dialogTitleWrapperCenter}>
            <Typography
              variant={'caption'}
              className={classes.dialogTitle}>
                Confirm account deletion
            </Typography>
          </div>
          <div className={classes.confirmationButtonsWrapper}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item xs={6}>
                <div className={classes.dialogButtonWrapper}>
                  <Button
                    onClick={() => handleClose()}
                    title='Cancel'
                    className={classes.dialogCancelButton}
                  >
                    <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                      Cancel
                    </Typography>
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.dialogButtonWrapper}>
                  <Button
                    onClick={() => onDelete()}
                    title='Cancel'
                    className={classes.dialogButton}
                  >
                    <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                    Delete
                    </Typography>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    />
  );
};

const AccountDialog = props => {
  const classes = styles();
  const { handleClose, isOpen, onAction, forUpdate } = props;
  const allowedCurrencies = ['EUR', 'USD', 'NOK', 'GBP', 'SEK', 'CAD'];

  return (
    <DialogComponent
      handleClose={handleClose}
      isOpen={isOpen}
      children={(
        <div className={classes.dialogContent}>
          <div className={classes.dialogTitleWrapper}>
            <Typography
              variant={'caption'}
              className={classes.dialogTitle}>
                {forUpdate ? 'Edit Account' : 'Add Account'}
            </Typography>
          </div>
          <Formik
            initialValues={forUpdate || { currency: '', iban: '' }}
            validate={values => {
              const errors = {};

              Object.keys(values).forEach(
                key => {
                  const value = values[key];
                  switch (key) {
                    case 'currency':
                        if (!allowedCurrencies.includes(value)) {
                            errors[key] = 'Please enter an allowed currency code';
                        }
                        break;
                    case 'iban':
                      if (!value.match(/^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/)) {
                        errors[key] = `IBAN address has wrong format`;
                        break;
                      }
                      break;
                    default:
                  }
                }
              );

              return errors;
            }}
            onSubmit={values => {
              onAction(values);
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
                    name={'currency'}
                    variant={'filled'}
                    label={'Select a currency'}
                    fullWidth
                    required
                    options={allowedCurrencies}
                    values={values.currency}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    helperText={errors.currency && touched.currency ? errors.currency : null}
                  />
                </div>
                <div className={classes.inputFieldWrapper}>
                  <TextField
                    name={'iban'}
                    autoComplete={'none'}
                    variant={'filled'}
                    label={'Enter IBAN address'}
                    fullWidth
                    required
                    error={errors.iban && touched.iban}
                    value={values.iban}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.iban && touched.iban ? errors.iban : null}
                  />
                </div>
                <div className={classes.dialogButtonWrapper}>
                  <Button
                    type={'submit'}
                    disabled={forUpdate ? false : isSubmitting || Object.keys(touched).length === 0}
                    className={classes.dialogButton}>
                    <Typography variant={'caption'} className={classes.dialogButtonLabel}>
                      {forUpdate ? 'Save' : 'Create'}
                    </Typography>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    />
  );
};

const SimardAccounts = props => {
  const classes = styles();
  const { orgid, address, web3 } = props;
  const sessionKey = `${orgid}:token`;
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem(sessionKey)
  );
  const [error, setErrorMessage] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [accounts, setAccounts] = useState();
  const [sessionTimeout, setSessionTimeout] = useState();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [forUpdate, setForUpdate] = useState();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  const resetAuthToken = sessionKey => {
    sessionStorage.removeItem(sessionKey)
    setAuthToken(null);
  };

  const setError = error => {
    if (error && error.status && error.status === 403) {
      resetAuthToken(sessionKey);
    }
    setErrorMessage(error ? error.message : null);
  };

  useEffect(() => {
    const fetchAccounts = async authToken => {
      setError(null);

      try {
        if (authToken) {
          setIsFetching(true);
          const accounts = await getSimardAccounts(authToken);
          setIsFetching(false);
          setAccounts(accounts);
        } else {
          setErrorMessage(
            'A signature will be requested to manage accounts on behalf of your organization'
          );
        }
      } catch (error) {
        setIsFetching(false);
        setError(error);
      }
    };
    fetchAccounts(authToken);
  }, [orgid, authToken]);// eslint-disable-line

  const checkAuthToken = async () => {
    if (!authToken) {
      clearTimeout(sessionTimeout);
      const token = await createToken(
        web3,
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
        () => resetAuthToken(sessionKey),
        SIMARD_EXPIRATION * 1000
      ));
      setAuthToken(token);
      return token;
    }
  };

  const handleDialogClose = () => {
    setForUpdate(null);
    setDialogOpen(false);
  };

  const handleFetchAccounts = async () => {
    let accounts;
    let token = authToken;
    setError(null);

    try {
      if (!authToken) {
        token = await checkAuthToken();
      }

      setIsFetching(true);
      accounts = await getSimardAccounts(token);
      setIsFetching(false);
      setAccounts(accounts);
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  };

  const handleStartCreate = () => {
    setForUpdate(null);
    setDialogOpen(true);
  };

  const handleStartEdit = account => {
    setForUpdate(account);
    setDialogOpen(true);
  };

  const handleUpdate = async ({ currency, iban }) => {
    try {
      setError(null);
      setDialogOpen(false);

      await checkAuthToken();
      setIsFetching(true);
      await updateSimardAccount(authToken, {
        accountId: forUpdate.accountId,
        currency,
        iban
      });
      setForUpdate(null);
      setIsFetching(false);
      handleFetchAccounts();
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  };

  const handleCreate = async ({ currency, iban }) => {
    try {
      setError(null);
      setDialogOpen(false);

      await checkAuthToken();
      setIsFetching(true);
      await createSimardAccount(authToken, { currency, iban });
      setIsFetching(false);
      handleFetchAccounts();
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  };

  const handleDeleteDialogClose = () => {
    setAccountToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteStart = account => {
    setAccountToDelete(account);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async account => {
    try {
      setError(null);
      setDeleteDialogOpen(false);

      await checkAuthToken();
      setIsFetching(true);
      await removeSimardAccount(authToken, account.accountId);
      setIsFetching(false);
      handleFetchAccounts();
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  };

  return (
    <Container className={classes.content}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant={'inherit'}>
            Bank Accounts
          </Typography>
        </div>
        <div className={classes.headerSubtitle}>
          <Typography variant={'inherit'}>
            Connect to Simard Pay to manage bank accounts for receiving and sending payments.
          </Typography>
        </div>



      </div>
      <div className={classes.accounts}>
        <div className={classes.accountsTitle}>
          <Typography variant={'inherit'}>Accounts</Typography>
        </div>
        <div className={classes.buttonWrapper}>
          {isFetching &&
            <CircularProgress />
          }
          {!isFetching &&
            <Button
              onClick={() => handleStartCreate()}
              className={classes.button}
              disabled={!authToken || isFetching}
            >
              <Typography variant={'inherit'}>+ Add Account</Typography>
            </Button>
          }
        </div>
        <div>
        {!authToken &&
          <div>
            <RefershButton
              onClick={() => handleFetchAccounts()}
              disabled={isFetching}
            >
              Connect to Simard Pay
            </RefershButton>
          </div>
        }
        </div>
        <div>
          {(authToken && !accounts) &&
            <div>
              <RefershButton
                onClick={() => handleFetchAccounts()}
                disabled={isFetching}
              >
                Fetching accounts
              </RefershButton>
            </div>
          }
          {(accounts && Array.isArray(accounts)) &&
            <div>
              <ul>
                {accounts.map((account, index) => (
                  <li key={index}>
                    <Grid container justify={'space-between'} alignItems={'center'}>
                      <Grid item xs={4}>
                        <Typography
                          onClick={() => handleStartEdit(account)}
                          title='Edit Account'
                          className={classes.editAccount}
                        >{account.currency}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          onClick={() => handleStartEdit(account)}
                          title='Edit Account'
                          className={classes.editAccount}
                        >{account.iban}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() => handleDeleteStart(account)}
                          className={classes.deleteButton}
                          disabled={isFetching}
                        >
                          <Typography variant={'inherit'}>Delete Account</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </li>
                ))}
                {(accounts.length === 0) &&
                  <Typography variant={'inherit'}>You do not have any accounts</Typography>
                }
              </ul>
            </div>
          }
        </div>
        {error &&
          <div>
            <Typography className={classes.error}>{error}</Typography>
          </div>
        }
      </div>
      <AccountDialog
        forUpdate={forUpdate}
        isOpen={isDialogOpen}
        handleClose={() => handleDialogClose()}
        onAction={values => forUpdate
          ? handleUpdate(values)
          : handleCreate(values)}
      />
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => handleDeleteDialogClose()}
        onDelete={() => handleDelete(accountToDelete)}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    address: selectSignInAddress(state),
    web3: selectWeb3(state)
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SimardAccounts);
