import React from 'react';
import _ from 'lodash';

import {Container, TextField, InputAdornment} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  inputWrapper: {
    margin: '14px 0'
  },
  input: {}
});

const InputField = (props) => {
  const classes = styles();
  const { type, name, orgidJsonPath, index, helperText, icon, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);
  return (
    <div key={index} className={classes.inputWrapper}>
      <TextField
        type={type}
        label={name}
        variant={'filled'}
        name={orgidJsonPath}
        value={_.get(values, orgidJsonPath)}
        helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
        required={required}
        InputProps={
          icon ? (
          {
            startAdornment: (
              (
                <InputAdornment position={'start'}>
                  {icon}
                </InputAdornment>
              )
            )
          }
        ) : null}
        fullWidth
        error={isError}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
      />
    </div>
  )
};

export default InputField;
