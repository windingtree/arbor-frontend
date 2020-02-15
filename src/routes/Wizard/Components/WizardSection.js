import React from "react";

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InputField, SelectField, JsonHostingField } from "../Fields";

const styles = makeStyles({
  sectionTitle: {
    fontStyle: 'normal',
    fontWight: 500,
    fontSize: '16px',
    lineHeight: '28px',
  }
});

const WizardSection = (props) => {
  const classes = styles();
  let { handleChange, handleBlur, values, errors, touched, data: { name, fields } } = props;
  // console.log(`<Section name="${name}" fields="`, fields);
  const knownFields = {
    'input': InputField,
    'select': SelectField,
    'json_hosting': JsonHostingField
  };

  fields = fields.map((item, index) => {
    if (knownFields[item.type]) {
      // console.log(`<${item.type} name="${item.name}" `, item);
      return knownFields[item.type]({...item, index, handleChange, handleBlur, values, errors, touched})
    }
    return (
      <div key={index}>Field <pre>${item.name}</pre> has unknown type: <pre>{item.type}</pre></div>
    );
  });

  return (
    <Container>
      <Typography className={classes.sectionTitle}>{name}</Typography>
      {fields}
    </Container>
  );
};

export default WizardSection;
