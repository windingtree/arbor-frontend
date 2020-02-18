import React from "react";

import {  Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InputField, SelectField, JsonHostingField, DropzoneField } from "../Fields";

import colors from '../../../styles/colors';

const styles = makeStyles({
  section: {
    padding: '16px 0'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.45,
    color: colors.greyScale.darkest,
  }
});

const WizardSection = (props) => {
  const classes = styles();
  let { handleChange, handleBlur, values, errors, touched, data: { name, fields } } = props;
  // console.log(`<Section name="${name}" fields="`, fields);
  const knownFields = {
    'input': InputField,
    'select': SelectField,
    'json_hosting': JsonHostingField,
    'dropzone': DropzoneField
  };

  fields = fields.map((item, index) => {
    if (item.type === 'dropzone') {
      return (
      <DropzoneField
        key={index}
        index={index}
        name={name}
        type={item.type}
        orgidJsonPath={item.orgidJsonPath}
        helperText={item.helperText}
        required={item.required}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      )
    }
    if (knownFields[item.type]) {
      // console.log(`<${item.type} name="${item.name}" `, item);
      return knownFields[item.type]({...item, index, handleChange, handleBlur, values, errors, touched})
    }
    return (
      <div key={index}>Field <pre>${item.name}</pre> has unknown type: <pre>{item.type}</pre></div>
    );
  });

  return (
    <div className={classes.section}>
      <Typography className={classes.sectionTitle}>{name}</Typography>
      {fields}
    </div>
  );
};

export default WizardSection;
