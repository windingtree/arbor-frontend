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
import { saveOrgidUri, saveOrgidJsonToArbor, selectWizardOrgidUri, selectWizardOrgidJson } from '../../../ducks/wizard'
import { selectSignInAddress } from '../../../ducks/signIn'

import InfoIcon from '../../../assets/SvgComponents/InfoIcon';
import DownloadIcon from '../../../assets/SvgComponents/download-icon.svg';
import { styles } from './WizardStep';
import colors from '../../../styles/colors';

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

  const [valueHostingType, setValueHostingType] = React.useState('default-hosting');

  const handleChangeHostingType = event => {
    setValueHostingType(event.target.value);
  };

  const { index, saveOrgidUri, saveOrgidJsonToArbor, orgidUri, orgidJson, address, data: { longName, description, cta }, handleNext } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }

  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orgidJson, null, 2));

  const scheme = Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri');

  return (
    <div key={index}>
      <Typography variant={'h3'} className={inheritClasses.stepTitle}>Step {index+1}: {longName}</Typography>
      <div className={inheritClasses.subtitleWrapper}>
        <Typography variant={'subtitle1'} className={inheritClasses.subtitle}>{description}</Typography>
      </div>

      <Formik
        initialValues={Object.assign({}, { hostingType: 'default-hosting', orgidUri: orgidUri })}
        validate={values => {
          const errors = {};
          const { error } = scheme.validate(values.uri);
          if(error) errors['orgidUri'] = error.toString();
          if(!_.isEmpty(errors)) console.log('ERRORS', errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (values['hostingType'] === 'default-hosting') {
            saveOrgidJsonToArbor(address)
          } else {
            saveOrgidUri(values['orgidUri']);
          }
          handleNext();

          setTimeout(() => {
            console.info(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              <Typography variant={'subtitle2'} className={classes.formControlTitle}>Choose type of JSON Hosting</Typography>
              <RadioGroup aria-label="hostingType" name="hostingType" value={valueHostingType} onChange={handleChangeHostingType}>
                <div className={classes.formControlItem}>
                  <FormControlLabel value="default-hosting" control={<Radio color='primary' />} label="Hosting with Arbor" className={classes.radioItem}/>
                  <div>
                    <LightTooltip
                      title={'We will store your organization \n information on our servers and back it \n up regularly.'}
                      placement={'right-start'}
                    >
                      <button className={classes.tooltipRef}>
                        <InfoIcon viewBox={'0 0 16 16'} className={classes.infoIcon}/>
                      </button>
                    </LightTooltip>
                  </div>
                </div>
                <div className={classes.formControlItem}>
                  <FormControlLabel value="self-hosting" control={<Radio color='primary' />} label="Self-hosting option" className={classes.radioItem}/>
                  <div>
                    <LightTooltip
                      title={'You choose where to store your \n organization information and provide \n us with a link. You may use private \n cloud storages or even file sharing \n services as long as the link remains \n permanently accessible. '}
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
              valueHostingType === 'self-hosting' ?
                <div>
                  <div className={classes.selfHostingSubtitleWrapper}>
                    <Typography variant={'subtitle2'} className={classes.selfHostingSubtitle}>
                      If you want to have full control over your data, you may choose to host ORG.JSON on your own server.
                    </Typography>
                  </div>
                  <div className={classes.selfHostingSubtitleWrapper}>
                    <Typography variant={'subtitle2'} className={classes.selfHostingSubtitle}>
                      Once you download the ORG.JSON file, upload it to your server and enter URL in the respective field below.
                    </Typography>
                  </div>
                  <br />
                  <div className={classes.selfHostingLinkWrapper}>
                    <a href={data} download="ORG.ID.json" className={classes.selfHostingLink}>
                      <img src={DownloadIcon} alt={'download'} className={classes.selfHostingLinkIcon}/>
                      Download ORG JSON
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
                      required={valueHostingType === 'self-hosting'}
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
                <Typography variant={'caption'} className={inheritClasses.buttonLabel}>{cta}</Typography>
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
