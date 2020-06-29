import React, {useState} from 'react';
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Button} from '@material-ui/core';

import {Formik} from 'formik';
import _ from 'lodash';

import DialogComponent from './Dialog';
import {extendOrgidJson, selectWizardOrgidJson} from '../ducks/wizard'; //validateOrgidSchema
import {Section} from './index';
import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';

import colors from '../styles/colors';

export const styles = makeStyles({
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
});

const WizardStep = (props) => {
  const profileId = sessionStorage.getItem('profileId');
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const classes = styles();

  const {index, extendOrgidJson, data: {longName, description, sections, cta}, 
    handleNext, orgidJson, joinOrganizations} = props;
  // Modal to provide more details on how to obtain Ether
  const renderModal = () => {
    return (
      <DialogComponent
        handleClose={handleCloseModal}
        isOpen={isModalOpen}
        children={(
          <div className={classes.dialogContent}>
            <Typography className={classes.modalTitle}>Learn how to obtain Ether</Typography>
            <Typography className={classes.paragraph}>Ether is Ethereum’s native cryptocurrency, the second most established
              and popular cryptocurrency after Bitcoin.</Typography>
            <Typography className={classes.paragraph}>It is common to obtain Ether through online exchange platforms that
              operate in your country and accept your preferred currency. Reputable exchange platforms have strict KYC
              processes and will ask you to share your personal data.</Typography>
            <Typography className={classes.paragraph}>MetaMask is linked with two exchanges, <b>Wyre</b> and <b>Coinswitch</b>, so you can purchase Ether directly from your account.</Typography>
            <Typography className={classes.paragraph}>It is also possible to buy Ether from crypto
              ATMs or through Peer-to-Peer options like <b>LocalCryptos</b>, <b>Hodl Hodl</b> or similar services. The latter can be
              private or centralized and offer a wide selection of buying and selling options, from in-person meetings to
              online gift cards, wire or PayPal transfers.</Typography>
            <Typography className={classes.paragraph}>Finally, there are fintech apps like <b>Uphold</b>, <b>Revolut</b> and other
              services that allow users buy, sell and transfer cryptocurrencies as well as trade for a broad spectrum of
              fiat currencies.
            </Typography>
          </div>
        )}
      />
    );
  };

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  // Validate the form
  const validateForm = (values) => {
    const errors = {};
    const validators = sections
      ? sections
          .reduce(
            (a, v) => {
              return [
                ...a,
                ...v.fields.map(
                  f => ({
                    orgidJsonPath: f.orgidJsonPath,
                    validate: f.validate
                  })
                )
              ];
            },
            []
          )
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
    console.log('ERRORS', errors)
    return errors;
  };

  const deepMerge = (target, source) => {
  
    for (const key of Object.keys(source)) {
      
      if (source[key].constructor === Object && target[key]) {
        Object.assign(source[key], deepMerge(target[key], source[key]));
      } else {
        target[key] = source[key];
      }
    }
  
    return Object.assign(target || {}, source);
  };

  const setInitialValues = () => {
    if (profileId) {
      const clonJson = JSON.parse(JSON.stringify(orgidJson));
      const clonProfile = JSON.parse(JSON.stringify(joinOrganizations[profileId]));
      const email = clonProfile.email;
      delete clonProfile.email;
      const values = deepMerge(clonJson, clonProfile);
      values.legalEntity.contacts = values.legalEntity.contacts ? values.legalEntity.contacts : [];      
      if (values.legalEntity.contacts.length === 0) {
        values.legalEntity.contacts.push({ email });
      } else {
        values.legalEntity.contacts[0].email = email;
      }
      return values;
    } else {
      return orgidJson
    }
  }
  
  return (
    <div key={index}>
      <Typography variant={'h3'} className={classes.stepTitle}>Step {index + 1}. {longName}</Typography>
      <div className={classes.subtitleWrapper}>
        <Typography variant={'subtitle1'} className={classes.subtitle}>{description}</Typography>
      </div>
      {
        longName !== 'Details' ? (
          <div>
            <div onClick={handleOpenModal} className={classes.link}>
              Learn how to obtain Ether <ArrowLeftIcon viewBox={'0 0 12 12'} className={classes.linkIcon}/>
            </div>
            {renderModal()}
          </div>
        ) : null
      }

      <Formik
        initialValues={Object.assign({}, setInitialValues())}
        enableReinitialize={true}
        validate={validateForm}
        onSubmit={(values, /*{setSubmitting}*/) => {
          extendOrgidJson(values);
          handleNext();
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
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            {
              !sections
                ? <div/>
                : sections.map((section, index) => {
                  //console.log(`<Section key="${index}" name="${section.name}" ... />`);
                  //console.log(`[In WizardStep] Loading section ${section.name} and index ${index} with values: ${JSON.stringify(values)}`);
                  
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
  )
};

const mapStateToProps = state => {
  return {
    joinOrganizations: state.join.joinOrganizations,
    orgidJson: selectWizardOrgidJson(state)
  }
};

const mapDispatchToProps = {
  extendOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
