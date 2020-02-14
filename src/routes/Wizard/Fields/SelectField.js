import React from "react";

import { Container, FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  formControl: {
  }
});

const SelectField = (props) => {
  const classes = styles();
  const {name, index, options, values, errors, touched, handleChange, handleBlur} = props;
  const optionsObj = Array.isArray(options) ? options.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : options;
  return (
    <Container key={index}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{name}</InputLabel>
        <Select
          native
          fullWidth
          inputProps={{
            name: name,
            id: `select-${name.replace(' ','-')}-${index}`,
          }}
          value={values[name]}
          error={errors[name] && touched[name]}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {
            Object.keys(optionsObj).map((value) => (
              <option value={value} key={value}>{optionsObj[value]}</option>
            ))
          }
        </Select>
      </FormControl>
    </Container>
  );
};

export default SelectField;
