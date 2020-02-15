import React from "react";

import { Container, FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = makeStyles({
  formControl: {
  }
});

const SelectField = (props) => {
  const classes = styles();
  const {name, orgidJsonPath, index, options, values, errors, touched, handleChange, handleBlur} = props;
  const optionsObj = Array.isArray(options) ? options.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : options;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);

  return (
    <Container key={index}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{name}</InputLabel>
        <Select
          native
          fullWidth
          inputProps={{
            label: name,
            name: orgidJsonPath,
            id: `select-${name.replace(' ','-')}-${index}`,
          }}
          value={_.get(values, orgidJsonPath)}
          error={isError}
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
