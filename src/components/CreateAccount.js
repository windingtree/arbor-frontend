import React from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography, Button} from '@material-ui/core';
import {Formik} from 'formik';

import noMetamaskConfig from '../utils/noMetamaskAccount';
import { Section } from './index';
import { postJoinRequest } from '../ducks/join';
import colors from '../styles/colors';

export const styles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: colors.greyScale.moreLighter,
  },
  mainContent: {
    paddingTop: '40px',
    paddingBottom: '160px'
  },
  formContainer: {
    border: `1px solid ${colors.greyScale.lighter}`,
    borderRadius: '8px',
    boxShadow: ' 0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    backgroundColor: colors.primary.white,
  },
  formContentWrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: '80px 80px 60px 80px',
    ['@media (max-width:600px)']: {
      padding: '20px 10px 10px 20px',
    }
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.14,
    color: colors.greyScale.darkest
  },
  stepTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: colors.greyScale.darkest,
  },
  subtitleWrapper: {
    margin: '12px 0'
  },
  subtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common
  },
  link: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.secondary.cyan,
    letterSpacing: '0.005em',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  linkIcon: {
    width: '13px',
    height: '12px',
    color: colors.secondary.cyan,
    transform: 'rotate(180deg)',
    marginLeft: '4px'
  },
  buttonWrapper: {
    display: 'table',
    margin: '40px auto 0 auto'
  },
  button: {
    border: `1px solid ${colors.primary.accent}`,
    borderRadius: '8px',
    backgroundImage: colors.gradients.orange,
    textTransform: 'capitalize'
  },
  buttonLabel: {
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.24,
    color: colors.primary.white,
    padding: '4px 12px'
  },
  dialogContent: {
    width: '440px'
  },
  modalTitle: {
    fontSize: '24px',
    lineHeight: '28px'
  },
  paragraph: {
    marginTop: '23px',
    lineHeight: '28px',
    color: colors.greyScale.dark,
    '& b': {
      color: colors.secondary.peach,
      fontWeight: 500
    }
  },
  formDescription: {
    color: colors.greyScale.common,
    padding: '40px 0'
  }
});

const CreateAccount = props => {
  const classes = styles();
  const {longName, sections, cta} = noMetamaskConfig;
  const dispatch = useDispatch();

  const validateForm = (values) => {
    const errors = {};
    const validators = sections
      ? sections.reduce((a, v) => {
        return [
          ...a,
          ...v.fields.map(f => ({ orgidJsonPath: f.orgidJsonPath, validate: f.validate}))
        ];
      }, [])
      : [];
    validators.forEach(v => {
      const value = _.get(values, v.orgidJsonPath, undefined);
      if (v.validate) {
        const error = v.validate(value);
        if (error) {
          errors[v.orgidJsonPath] = error;
        }
      }
    });
    // Return errors
    return errors;
  };

  const onSubmitForm = (values) => {
    dispatch(postJoinRequest(values))
    sessionStorage.setItem('email', values.email)
  }

  return (
    <div className={classes.mainContainer}>
      <Container className={classes.mainContent}>
        <Container maxWidth="sm" className={classes.formContainer}>
          <div className={classes.formContentWrapper}>
            <div>
              <Typography variant={'h2'} className={classes.formTitle}>{longName}</Typography>
            </div>
            <div>
              <Formik
                initialValues={Object.assign({}, props.orgidJson)}
                enableReinitialize={true}
                validate={validateForm}
                onSubmit={(values) => onSubmitForm(values)}
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
                    {
                      !sections
                        ? <div/>
                        : sections.map((section, index) => {
                          return (
                            <Section
                              key={index}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              values={values}
                              errors={errors}
                              touched={touched}
                              data={section}
                            />
                          )
                        })
                    }
                    <div className={classes.buttonWrapper}>
                      <Button type="submit" disabled={isSubmitting} className={classes.button}>
                        <Typography variant={'caption'} className={classes.buttonLabel}>{cta}</Typography>
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div>
              <Typography className={classes.formDescription}>
                Creating an organization profile requires an Ethereum transaction. Make sure you have enough funds in your MetaMask account to cover the transaction fee.
              </Typography>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  )
};

export default CreateAccount;
