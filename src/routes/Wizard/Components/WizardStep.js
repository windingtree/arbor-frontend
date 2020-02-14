import React from 'react';
import { connect } from "react-redux";
import { Container, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import _ from 'lodash';

import { extendOrgidJson, selectWizardOrgidJson } from '../../../ducks/wizard'
import { WizardSection } from '../Components';


const WizardStep = (props) => {
  const { extendOrgidJson, data: { longName, description, sections, cta } } = props;
  const emptyInitialValues = { email: '', password: '' };
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }
  const validators = sections ?
    _.chain(_.filter(_.flatten(sections.map(({ fields }) => fields.map(({ name, schema }) => ({ name, schema })))), 'schema')).keyBy('name').mapValues('schema').value() :
    {};


  // console.log(`<Step longName='${longName} sections="'`, sections);
  return (
    <Container>
      <Typography variant={'h3'}>Step: {longName}</Typography>
      <div>{description}</div>

      <Formik
        initialValues={Object.assign({}, emptyInitialValues, props.orgidJson)}
        validate={values => {
          const errors = {};
          _.each(values, (value, field) => {
            if (!validators[field]) return;
            const { error } = validators[field].validate(value);
            if (error) {
              errors[field] = error.toString();
            }
          });
          if(errors) console.log('ERRORS', errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('%conSubmit', 'background:red; color:white;');
          extendOrgidJson(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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

            <button type="submit" disabled={isSubmitting}>{cta}</button>
          </form>
        )}
      </Formik>
    </Container>
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
