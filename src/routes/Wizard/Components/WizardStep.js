import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Formik } from 'formik';
import _ from 'lodash';

import { extendOrgidJson, selectWizardOrgidJson } from '../../../ducks/wizard'
import { WizardSection } from '../Components';
import ArrowLeftIcon from '../../../assets/SvgComponents/ArrowLeftIcon';

import colors from '../../../styles/colors';

const styles = makeStyles({
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
  form: {
    marginTop: '12px'
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
  }
});

const WizardStep = (props) => {
  const classes = styles();
  const { extendOrgidJson, data: { longName, description, sections, cta }, handleNext } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }
  const validators = sections ?
    _.chain(_.filter(_.flatten(sections.map(({ fields }) => fields.map(({ orgidJsonPath, schema }) => ({ orgidJsonPath, schema })))), 'schema')).keyBy('orgidJsonPath').mapValues('schema').value() :
    {};

  return (
    <div>
      <Typography variant={'h3'} className={classes.stepTitle}>Step: {longName}</Typography>
      <div className={classes.subtitleWrapper}>
        <Typography variant={'subtitle1'} className={classes.subtitle}>{description}</Typography>
      </div>
      <div>
        <Link to={'/how-to'} className={classes.link}>
          Learn how to obtain Ether <ArrowLeftIcon viewBox={'0 0 12 12'} className={classes.linkIcon}/>
        </Link>
      </div>

      <Formik
        initialValues={Object.assign({}, props.orgidJson)}
        validate={values => {
          const errors = {};
          _.each(validators, (validator, orgidJsonPath) => {
            const value = _.get(values, orgidJsonPath, false);
            if (value !== false) {
              const { error } = validator.validate(value);
              if (error) {
                _.set(errors, orgidJsonPath, error.toString());
              }
            }
          });
          if(!_.isEmpty(errors)) console.log('ERRORS', errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
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
          <form onSubmit={handleSubmit} className={classes.form}>
            {
              !sections ?
                <div />
                :sections.map((section, index) => {
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
