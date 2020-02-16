import React from 'react';
import { connect } from "react-redux";
import { Container, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Formik } from "formik";
import Joi from '@hapi/joi';
import { saveOrgidUri, saveOrgidJsonToArbor, selectWizardOrgidUri, selectWizardOrgidJson } from '../../../ducks/wizard'
import { selectSignInAddress } from '../../../ducks/signIn'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const WizardStepHosting = (props) => {
  const classes = useStyles();

  const [valueHostingType, setValueHostingType] = React.useState('default-hosting');

  const handleChangeHostingType = event => {
    setValueHostingType(event.target.value);
  };

  const { index, saveOrgidUri, saveOrgidJsonToArbor, orgidUri, orgidJson, address, data: { longName, description, cta } } = props;
  // next line collect from "sections" all fields with non empty "schema" to object { [fieldName]:schema }

  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orgidJson, null, 2));

  const scheme = Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri');

  return (
    <Container key={index}>
      <Typography variant={'h3'}>Step: {longName}</Typography>
      <Typography>{description}</Typography>

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

            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Choose type of JSON Hosting</FormLabel>
              <RadioGroup aria-label="hostingType" name="hostingType" value={valueHostingType} onChange={handleChangeHostingType}>
                <FormControlLabel value="default-hosting" control={<Radio />} label="Default hosting option" />
                <FormControlLabel value="self-hosting" control={<Radio />} label="Self-hosting option" />
              </RadioGroup>
            </FormControl>

            {
              valueHostingType === 'self-hosting' ?
                <Container>
                  <Typography>Description why user need download his ORG JSON and next steps</Typography>
                  <br />
                  <a href={data} download="ORG.ID.json">Download ORG JSON</a>
                  <br />
                  <Container key={index}>
                    <TextField
                      type='input'
                      label='Enter URL'
                      name='orgidUri'
                      value={values['orgidUri']}
                      helperText={errors['orgidUri'] && touched['orgidUri'] ? errors['orgidUri'] : undefined}
                      required={valueHostingType === 'self-hosting'}
                      fullWidth
                      error={errors['orgidUri'] && touched['orgidUri']}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Container>
                </Container>
                :
                <div/>
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
