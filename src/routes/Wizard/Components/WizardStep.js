import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography, Button, Dialog, DialogActions} from '@material-ui/core';

import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {Formik} from 'formik';
import _ from 'lodash';

import {extendOrgidJson, selectWizardOrgidJson} from '../../../ducks/wizard'
import {WizardSection} from '../Components';
import ArrowLeftIcon from '../../../assets/SvgComponents/ArrowLeftIcon';

import colors from '../../../styles/colors';

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
    textDecoration: 'none'
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
  // TODO refactor into one component
  dialogContainer: {
    '& > .MuiDialog-paper > .MuiDialogContent-root:first-child': {
      paddingTop: '80px'
    }
  },
  dialogContentWrapper: {
    position: 'relative',
    padding: '80px 100px',
    boxSizing: 'border-box'
  },
  dialogCloseButtonWrapper: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  dialogCloseButton: {
    padding: '4px',
    borderRadius: '50%',
    minWidth: 'auto',
    '& .MuiButton-label > .MuiSvgIcon-root': {
      fill: colors.greyScale.common
    }
  },
  dialogCloseButtonIcon: {
    fontSize: 'medium',
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


//mui overrides
const DialogContent = withStyles({
  root: {
    '&:first-child': {
      paddingTop: '80px'
    }
  }
})(MuiDialogContent);


const WizardStep = (props) => {
  const [isModalOpen, toggleModalOpenState] = useState(false);
  const classes = styles();

  const {index, extendOrgidJson, data: {longName, description, sections, cta}, handleNext} = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }
  const validators = sections ?
    _.chain(_.filter(_.flatten(sections.map(({fields}) => fields.map(({orgidJsonPath, schema}) => ({
      orgidJsonPath,
      schema
    })))), 'schema')).keyBy('orgidJsonPath').mapValues('schema').value() :
    {};

  const renderModal = () => {
    return <Dialog onClose={handleCloseModal} open={isModalOpen} className={classes.dialogContainer}>
      <DialogContent className={classes.dialogContentWrapper}>
        <DialogActions className={classes.dialogCloseButtonWrapper}>
          <Button onClick={handleCloseModal} className={classes.dialogCloseButton}>
            <CloseIcon className={classes.dialogCloseButtonIcon}/>
          </Button>
        </DialogActions>
        <Typography className={classes.modalTitle}>Learn how to obtain Ether</Typography>
        <Typography className={classes.paragraph}>Ether is Ethereum’s native cryptocurrency, the second most established
          and popular cryptocurrency after Bitcoin.</Typography>
        <Typography className={classes.paragraph}>It is common to obtain Ether through online exchange platforms that
          operate in your country and accept your preferred currency. Reputable exchange platforms have strict KYC
          processes and will ask you to share your personal data.</Typography>
        <Typography className={classes.paragraph}>MetaMask is linked with two exchanges, <b>Coinbase</b> and <b>ShapeShift</b>, so you can purchase Ether directly from your account.</Typography>
        <Typography className={classes.paragraph}>It is also possible to buy Ether from crypto
          ATMs or through Peer-to-Peer options like <b>LocalCryptos</b>, <b>Hodl Hodl</b> or similar services. The latter can be
          private or centralized and offer a wide selection of buying and selling options, from in-person meetings to
          online gift cards, wire or PayPal transfers.</Typography>
        <Typography className={classes.paragraph}>Finally, there are fintech apps like <b>Uphold</b>, <b>Revolut</b> and other
          services that allow users buy, sell and transfer cryptocurrencies as well as trade for a broad spectrum of
          fiat currencies.</Typography>

      </DialogContent>
    </Dialog>;
  };

  const handleOpenModal = () => {
    toggleModalOpenState(true);
  };

  const handleCloseModal = () => {
    toggleModalOpenState(false)
  };

  return (
    <div key={index}>
      <Typography variant={'h3'} className={classes.stepTitle}>Step {index + 1}: {longName}</Typography>
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
        initialValues={Object.assign({}, props.orgidJson)}
        validate={values => {
          const errors = {};
          _.each(validators, (validator, orgidJsonPath) => {
            const value = _.get(values, orgidJsonPath, false);
            if (value !== false) {
              const {error} = validator.validate(value);
              if (error) {
                _.set(errors, orgidJsonPath, error.toString());
              }
            }
          });
          if (!_.isEmpty(errors)) console.log('ERRORS', errors);
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          console.log('%conSubmit', 'background:red; color:white;', values);

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
            isSubmitting,
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            {
              !sections ?
                <div/>
                : sections.map((section, index) => {
                  // console.log(`<WizardSection key="${index}" name="${section.name}" ... />`);
                  return (
                    <WizardSection
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
    orgidJson: selectWizardOrgidJson(state)
  }
};

const mapDispatchToProps = {
  extendOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStep);
