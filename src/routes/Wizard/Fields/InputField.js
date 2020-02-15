import React from 'react';
import _ from 'lodash';

import {Container, TextField} from '@material-ui/core';

const InputField = (props) => {
  const { type, name, orgidJson, index, helperText, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = errors[name] && touched[name];
  return (
    <Container key={index}>
      <TextField
        type={type}
        label={name}
        name={orgidJson}
        value={_.get(values, orgidJson)}
        helperText={isError ? errors[orgidJson] : helperText}
        required={required}
        fullWidth
        error={errors[orgidJson] && touched[orgidJson]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Container>
  )
};

export default InputField;
