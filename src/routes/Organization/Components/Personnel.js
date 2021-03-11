import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  IconButton,
  Container,
  Typography,
  Grid,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from '../../../styles/colors';
// import CopyIdComponent from '../../../components/CopyIdComponent';
import { strCenterEllipsis } from '../../../utils/helpers';
import CopyTextComponent from "../../../components/CopyTextComponent";
import DialogComponent from '../../../components/Dialog';
import SelectField from '../../../components/Fields/SelectField';
import match from '../../../utils/regex';
import {
  createToken
} from '../../../utils/jwt';
import {
  api
} from '../../../redux/api';

import {
  selectWeb3,
  selectSignInAddress
} from '../../../ducks/signIn';

const styles = makeStyles({
  content: {
    position: 'relative',
    fontWeight: 400,
    fontSize: '14px',
    color: colors.greyScale.dark,
    marginBottom: '40px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
    marginBottom: '20px'
  },
  subtitle: {
    marginTop: '16px'
  },
  buttonWrapper: {
    width: '100%',
    margin: '20px 0 25px 0'
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
  addButton: {
    width: '64px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'linear-gradient(180deg, #99D7C5 0%, #3A9492 98.96%)',
    borderRadius: '6px',
    marginLeft: '8px'
  },
  deleteButton: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.secondary.peach,
    textTransform: 'none',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      marginLeft: '-8px'
    }
  },
  listContainer: {},
  listItemWrapper: {
    marginBottom: '10px'
  },
  dialogContent: {
    width: '440px',
    paddingBottom: '40px'
  },
  dialogTitle: {
    fontSize: '32px',
    fontWeight: 500,
    textAlign: 'start',
    color: colors.greyScale.darkest,
    marginBottom: '20px',
    display: 'inline-block'
  },
  inputFieldWrapper: {
    position: 'relative',
    marginBottom: '16px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  addAccountCmpWrapper: {
    position: 'relative',
    marginTop: '20px',
    paddingTop: '8px',
    paddingBottom: '4px'
  },
  dialogButtonWrapper: {
    display: 'flex',
    paddingTop: '10px',
    margin: '20px auto 0 auto',
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'column'
  },
  dialogButton: {
    height: '50px',
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
  dialogButtonLabel: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white
  },
  accountsBlockLabel: {
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '20px',
    marginBottom: '8px'
  },
  signNote: {
    marginTop: '18px',
    '& > p': {
      fontSize: '14px',
      marginBottom: '14px',
      color: '#8F999F'
    }
  },
  errorWrapper: {
    marginTop: '20px',
    fontSize: '16px',
    color: 'black'
  },
  personLine: {
    marginBottom: '5px',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'flex-start',
      marginBottom: '10px',
    }
  },
  actionBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'flex-start',
      marginTop: 0,
      marginBottom: '10px',
      '&> .MuiButton-text': {
        padding: 0,
        marginTop: '3px',
        marginLeft: 0
      }
    }
  }
});

const callFetchPersonsApi = orgid => api(
  `trustedPerson/orgId/${orgid}`,
  'GET'
);

const callSavePersonsApi = token => api(
  'trustedPerson',
  'POST',
  {
    body: JSON.stringify({
      token
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

const callDeletePersonApi = (ipfsHash, options) => api(
  `trustedPerson/${ipfsHash}`,
  'DELETE',
  options
);

const accountsTemplate = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'person@domain.com',
    validate: value => {
      if (value && !value.trim().match(match.email)) {
        return 'Wrong email format';
      }
    }
  },
  {
    name: 'telegram',
    label: 'Telegram',
    placeholder: '@accountName',
    validate: value => {
      if (value && !value.trim().match(match.at)) {
        return 'Wrong Telegram account format';
      }
    }
  },
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: '@accountName',
    validate: value => {
      if (value && !value.trim().match(match.at)) {
        return 'Wrong Instagram account format';
      }
    }
  },
  {
    name: 'twitter',
    label: 'Twitter',
    placeholder: '@accountName',
    validate: value => {
      if (value && !value.trim().match(match.at)) {
        return 'Wrong Twitter account format';
      }
    }
  },
  {
    name: 'discord',
    label: 'Discord',
    placeholder: 'accountName#[id]',
    validate: value => {
      if (value && !value.trim().match(match.discord)) {
        return 'Wrong Discord account format';
      }
    }
  }
];

const AddForm = props => {
  const classes = styles();
  const {
    orgid,
    visible,
    onClose,
    web3,
    address
  } = props;
  const [error, setError] = useState(null);
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const addAccountOptions = accountsTemplate.reduce(
    (a, v, i) => ({
      ...a,
      [i]: v.label
    }),
    {}
  );

  const handleClose = () => {
    onClose();
  };

  const handleAddAccount = values => {
    const newValues = {
      ...values,
      accounts: [
        ...values.accounts,
        {
          ...accountsTemplate[selectedAccountType],
          type: accountsTemplate[selectedAccountType].name,
          name: `${accountsTemplate[selectedAccountType].name}-${values.accounts.length}`,
          value: ''
        }
      ]
    }
    setSelectedAccountType(null);
    return newValues;
  };

  const handleAccountChange = (event, values, index) => ({
    ...values,
    accounts: values.accounts.map(
      (account, i) => {
        if (i === index) {
          account.value = event.target.value;
        }
        return account;
      }
    )
  });

  const handleDeleteAccount = (values, index) => ({
    ...values,
    accounts: values.accounts.filter(
      (_, i) => i !== index
    )
  });

  const handleSavePerson = async values => {
    const data = {
      did: `did:orgid:${orgid}`,
      name: values.name,
      accounts: values.accounts.map(account => ({
        type: account.type,
        value: account.value
      })),
      created: new Date().toISOString()
    };
    console.log('Data:', data);

    const token = await createToken(
      web3,
      {
        algorithm: 'ETH',
        expiration: 60 * 60 * 24 * 365 * 10,
        issuerDidValue: data.did,
        subject: data,
        from: address
      }
    );
    console.log('Token:', token);

    return await callSavePersonsApi(token);
  };

  return (
    <DialogComponent
      handleClose={handleClose}
      isOpen={visible}
    >
      <div className={classes.dialogContent}>
        <Typography variant={'caption'} className={classes.dialogTitle}>
          Trusted Person
        </Typography>
        <Formik
          initialValues={{
            name: '',
            accounts: []
          }}
          validate={values => {
            const errors = {};
            Object.keys(values).forEach(
              key => {
                const value = values[key];
                switch (key) {
                  case 'name':
                    if (!value) {
                        errors[key] = 'Trusted person name is required';
                    }
                    break;
                  case 'accounts':
                    values.accounts.forEach(account => {
                      errors[account.name] = account.validate(account.value);
                      if (errors[account.name] === undefined) {
                        delete errors[account.name];
                      }
                    });
                    break;
                  default:
                }
              }
            );
            return errors;
          }}
          onSubmit={async values => {
            setError(null);
            // Create token
            // Upload file to the IPFS
            // Save data to the database
            if (!values.accounts || values.accounts.length === 0) {
              console.log('At least one account should be defined');
              return false;
            }

            try {
              await handleSavePerson(values);
              handleClose();
            } catch (error) {
              console.log(error);
              setError(error.message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setValues
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.inputFieldWrapper}>
                <TextField
                  name='name'
                  autoComplete='none'
                  variant='filled'
                  label='Name'
                  fullWidth
                  required
                  error={errors.name && touched.name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name ? errors.name : null}
                />
              </div>

              <div>
                <Typography className={classes.accountsBlockLabel}>
                  Accounts
                </Typography>
              </div>
              {values.accounts.length > 0 &&
                values.accounts.map((account, index) => (
                  <Grid container key={index}>
                    <Grid item xs className={classes.inputFieldWrapper}>
                      <TextField
                        name={account.name}
                        autoComplete='none'
                        variant='filled'
                        label={account.label}
                        fullWidth
                        required
                        error={errors[account.name] && touched[account.name]}
                        value={account.value}
                        placeholder={account.placeholder}
                        onChange={event => {
                          setValues(
                            handleAccountChange(event, values, index)
                          );
                        }}
                        onBlur={handleBlur}
                        helperText={errors[account.name] && touched[account.name] ? errors[account.name] : null}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          setValues(handleDeleteAccount(values, index));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))
              }

              <div className={classes.addAccountCmpWrapper}>
                <Grid container alignItems='stretch' alignContent='center'>
                  <Grid item xs>
                    <SelectField
                      name='party'
                      variant='filled'
                      label='Account type to add'
                      fullWidth
                      options={addAccountOptions}
                      values={selectedAccountType}
                      styleWrapperOverride={'none'}
                      handleChange={evt => {
                          setSelectedAccountType(evt.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item style={{display: 'flex'}}>
                    <Button
                      className={classes.addButton}
                      onClick={() => {
                        setValues(handleAddAccount(values));
                      }}
                      disabled={selectedAccountType === null}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.signNote}>
                <p>
                  You can add as many social accounts as you want here and then save, approving your action with Metamask signature.
                </p>
                <p>
                  This creates a JSON file and automatically stores it on the IPFS network.
                </p>
                <p>
                  You would be given the link to this file once the file is thereYour representative could use the given link when he needs to prove it’s him and not somebody else in the Internet
                </p>
              </div>
              <div className={classes.dialogButtonWrapper}>
                <Button
                  type='submit'
                  disabled={isSubmitting || Object.keys(touched).length === 0}
                  className={classes.dialogButton}
                >
                  <Typography
                    variant={'caption'}
                    className={classes.dialogButtonLabel}
                  >
                    Sign
                  </Typography>
                </Button>
              </div>

              {error &&
                <div className={classes.errorWrapper}>{error}</div>
              }
            </form>
          )}
        </Formik>
      </div>
    </DialogComponent>
  );
};

const Personnel = props => {
  const classes = styles();
  const {
    orgid,
    web3,
    address
  } = props;
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [personsLoading, setPersonsLoading] = useState(false);
  const [persons, setPersons] = useState([]);

  const fetchPersons = async orgid => {
    try {
      setPersonsLoading(true);
      const records = await callFetchPersonsApi(orgid);
      console.log('Persons:', typeof records, records);
      setPersons(records);
      setPersonsLoading(false);
    } catch (error) {
      console.log(error);
      setPersonsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons(orgid);
  }, [orgid]);

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    fetchPersons(orgid);
  };

  const handleDeletePerson = async index => {
    try {
      const token = await createToken(
        web3,
        {
          algorithm: 'ETH',
          expiration: 60,
          issuerDidValue: `did:orgid:${orgid}`,
          from: address
        }
      );
      await callDeletePersonApi(
        persons[index].ipfs,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Person deleted');
      await fetchPersons(orgid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddForm
        orgid={orgid}
        visible={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        web3={web3}
        address={address}
      />
      <Container>
        <div className={classes.content}>
          <div className={classes.title}>
            <Typography variant={'inherit'}>Company Representatives</Typography>
          </div>
          <div>
            <Typography variant={'inherit'} className={classes.subtitle}>
            You may add social media accounts of official representatives of your company in order to prevent fraud
            </Typography>
          </div>
          <div className={classes.listContainer}>
            <div className={classes.buttonWrapper}>
              <Button
                onClick={() => setAddDialogOpen(true)}
                className={classes.button}
                disabled={personsLoading}
              >
                {personsLoading &&
                  <CircularProgress visible='true' />
                }
                {!personsLoading &&
                  <Typography variant={'inherit'}>
                    Add trusted person
                  </Typography>
                }
              </Button>
            </div>

            {(persons && persons.length > 0) &&
              <div>
                <ul>
                  {persons.map(
                    (person, index) => (
                      <li key={index.toString()} className={classes.listItemWrapper}>
                        <Grid container alignItems='center'>
                          <Grid item xs={12} sm={4} className={classes.personLine}>
                            {person.name}
                          </Grid>
                          <Grid item xs={12} sm={6} className={classes.personLine}>
                            {/* <CopyIdComponent
                              id={person.ipfs}
                              fontSize={'14px'}
                              width={15}
                              title='Copied to clipboard'
                              color={colors.greyScale.dark}
                            /> */}
                            <CopyTextComponent
                              title='IPFS hash is copied to clipboard'
                              text={person.ipfs}
                              label={strCenterEllipsis(person.ipfs, 14)}
                              color='rgb(94, 102, 106)'
                              fontWeight='500'
                              fontSize='14px'
                            />
                          </Grid>
                          <Grid item xs={12} sm={2} className={classes.actionBlock}>
                            <Button onClick={() => handleDeletePerson(index)} className={classes.deleteButton}>
                              <Typography variant={'inherit'}>Remove person</Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </li>
                    )
                  )}
                </ul>
              </div>
            }
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  web3: selectWeb3(state),
  address: selectSignInAddress(state)
});

export default connect(mapStateToProps, null)(Personnel);
