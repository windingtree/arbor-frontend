import React from 'react';
import { connect } from "react-redux";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Tooltip
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Formik } from "formik";
import Joi from '@hapi/joi';
import { saveOrgidUri, saveOrgidJsonToArbor, selectWizardOrgidUri, selectWizardOrgidJson } from '../ducks/wizard'
import { selectSignInAddress } from '../ducks/signIn'

import InfoIcon from '../assets/SvgComponents/InfoIcon';
import DownloadIcon from '../assets/SvgComponents/download-icon.svg';
import { styles } from './WizardStep';
import colors from '../styles/colors';

const useStyles = makeStyles({
  formControlGroup: {
    width: '100%',
    marginTop: '20px',
  },
  formControlItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyScale.inputBg,
    borderRadius: '8px',
    margin: '6px 0',
    padding: '12px',
    boxSizing: 'border-box'
  },
  formControlTitle: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
    color: colors.greyScale.darkest,
    paddingBottom: '6px'
  },
  radioItem: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.common
  },
  tooltipRef: {
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer'
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    marginLeft: '-7px',
    opacity: .5,
    color: colors.greyScale.common,
    transition: `opacity .3s ease, color .3s ease`,
    '&:hover': {
      opacity: 1,
      color: colors.secondary.green
    }
  },
  selfHostingSubtitleWrapper: {
    margin: '20px 0'
  },
  selfHostingSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common
  },
  selfHostingLinkWrapper: {
    marginBottom: '24px'
  },
  selfHostingLink: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.03,
    letterSpacing: '.005em',
    textDecoration: 'none',
    color: colors.secondary.cyan
  },
  selfHostingLinkIcon: {
    verticalAlign: 'middle',
    marginRight: '10px'
  },
});

const LightTooltip = withStyles({
  tooltip: {
    backgroundColor: colors.primary.white,
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
    color: colors.greyScale.common,
    fontSize: '12px',
    fontWeight: 400,
    padding: '10px',
    boxSizing: 'border-box',
  }
})(Tooltip);

const WizardStepHosting = (props) => {
  const classes = useStyles();
  const inheritClasses = styles();

  const { index, orgidUri, orgidJson, address, data: { longName, description, cta }, handleNext, action, stepTitle = true } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }

  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orgidJson, null, 2));

  const scheme = Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri');

  return (
    <div key={index}>
      <Typography variant={'h3'} className={inheritClasses.stepTitle}>
        {stepTitle && `Step ${index+1}. `}
        {longName}
      </Typography>
      <div className={inheritClasses.subtitleWrapper}>
        <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>{description}</Typography>
      </div>

      <Formik
        initialValues={Object.assign({}, { hostingType: 'default-hosting', orgidUri: orgidUri || '' })}
        validate={values => {
          const errors = {};
          const { error } = scheme.validate(values.uri);
          if(error) errors['orgidUri'] = error.toString();
          if(!_.isEmpty(errors)) console.log('ERRORS', errors);
          return errors;
        }}
        onSubmit={(values) => {
          if (values['hostingType'] === 'default-hosting') {
            props.saveOrgidJsonToArbor(address)
          } else {
            props.saveOrgidUri(values['orgidUri']);
          }
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

            <FormControl component="fieldset" className={classes.formControlGroup}>
              <RadioGroup aria-label="hostingType" name="hostingType" value={values['hostingType']} onChange={handleChange}>
                <div className={classes.formControlItem}>
                  <FormControlLabel value="default-hosting" control={<Radio color='primary' />} label="Winding Tree Marketplace" className={classes.radioItem}/>
                  <div>
                    <LightTooltip
                      title={'We will store your data \n on our servers and back it up \n regularly.'}
                      placement={'right-start'}
                    >
                      <button className={classes.tooltipRef}>
                        <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
                      </button>
                    </LightTooltip>
                  </div>
                </div>
                <div className={classes.formControlItem}>
                  <FormControlLabel value="self-hosting" control={<Radio color='primary' />} label="Your server" className={classes.radioItem}/>
                  <div>
                    <LightTooltip
                      title={'You choose where to store your \n data and give us a link to it. \n You may use any cloud storage \n or even a file sharing \n service, as long as the link remains \n  accessible. '}
                      placement={'right-start'}
                    >
                      <button className={classes.tooltipRef}>
                        <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
                      </button>
                    </LightTooltip>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>

            {
              values['hostingType'] === 'self-hosting' ?
                <div>
                  <div className={classes.selfHostingSubtitleWrapper}>
                    <Typography variant={'subtitle2'} className={classes.selfHostingSubtitle}>
                      Great job! We encourage our users to retain full control of their data.
                    </Typography>
                  </div>
                  <div className={classes.selfHostingSubtitleWrapper}>
                    <Typography variant={'subtitle2'} className={classes.selfHostingSubtitle}>
                      Please download the JSON file with your profile and store it somewhere, where it would be publicly accessible. Then paste the resulting URL below.
                    </Typography>
                  </div>
                  <br />
                  <div className={classes.selfHostingLinkWrapper}>
                    <a href={data} download="ORG.ID.json" className={classes.selfHostingLink}>
                      <img src={DownloadIcon} alt={'download'} className={classes.selfHostingLinkIcon}/>
                      Download Data
                    </a>
                  </div>
                  <br />
                  <div key={index}>
                    <TextField
                      type='input'
                      label='Enter URL'
                      name='orgidUri'
                      variant={'filled'}
                      value={values['orgidUri']}
                      helperText={errors['orgidUri'] && touched['orgidUri'] ? errors['orgidUri'] : undefined}
                      required={true}
                      fullWidth
                      error={errors['orgidUri'] && touched['orgidUri']}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                :
                <div/>
            }

            <div className={inheritClasses.buttonWrapper}>
              <Button type="submit" disabled={isSubmitting} className={inheritClasses.button}>
                <Typography variant={'caption'} className={inheritClasses.buttonLabel}>{action === 'edit' ? 'Next' : `${cta}`}</Typography>
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
    orgidUri: selectWizardOrgidUri(state),
    orgidJson: selectWizardOrgidJson(state),
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  saveOrgidUri,
  saveOrgidJsonToArbor,
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStepHosting);
