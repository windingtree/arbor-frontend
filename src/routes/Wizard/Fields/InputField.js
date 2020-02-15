import React from 'react';
import _ from 'lodash';

import {Container, TextField} from '@material-ui/core';

const InputField = (props) => {
  const { type, name, orgidJsonPath, index, helperText, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);
  return (
    <Container key={index}>
      <TextField
        type={type}
        label={name}
        name={orgidJsonPath}
        value={_.get(values, orgidJsonPath)}
        helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
        required={required}
        fullWidth
        error={isError}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Container>
  )
};

export default InputField;
