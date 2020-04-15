import React from "react";

import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = makeStyles({
  selectWrapper: {
    marginBottom: '28px'
  },
  formControl: {
    width: '100%',
    '& > .MuiInputLabel-root': {
      zIndex: 1,
      transform: 'translate(12px, 22px) scale(1)'
    },
    '& > .MuiInputLabel-shrink': {
      transform: 'translate(20px, 10px) scale(0.75)'
    }
  }
});

const SelectField = (props) => {
  const classes = styles();
  const {name, orgidJsonPath, index, options, required, values, errors, touched, handleChange, handleBlur} = props;
  const optionsObj = Array.isArray(options) ? options.reduce((o, key) => Object.assign(o, {[key]: key}), {}) : options;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);

  return (
    <div key={index} className={classes.selectWrapper}>
      <FormControl className={classes.formControl}>
        <InputLabel>{name}</InputLabel>
        <Select
          variant={'filled'}
          name={orgidJsonPath}
          value={_.get(values, orgidJsonPath, '')}
          required={required}
          error={isError}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <MenuItem value={''} key={''}/>
          {
            Object.keys(optionsObj).map((value) => (
              <MenuItem value={value} key={value}>{optionsObj[value]}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
