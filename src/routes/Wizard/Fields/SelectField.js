import React from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = makeStyles({
  selectWrapper: {
    margin: '14px 0'
  }
});

const SelectField = (props) => {
  const classes = styles();
  const {name, orgidJsonPath, index, options, values, errors, touched, handleChange, handleBlur} = props;
  const optionsObj = Array.isArray(options) ? options.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : options;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);

  return (
    <div key={index} className={classes.selectWrapper}>
      <TextField
        select
        fullWidth
        label={name}
        name={orgidJsonPath}
        id={`select-${name.replace(' ','-')}-${index}`}
        variant={'filled'}
        value={_.get(values, orgidJsonPath)}
        error={isError}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        onBlur={handleBlur}
      >
        {
          Object.keys(optionsObj).map((value) => (
            <option value={value} key={value}>{optionsObj[value]}</option>
          ))
        }
      </TextField>
    </div>
  );
};

export default SelectField;
