import React from "react";

import {Container, TextField} from "@material-ui/core";

const InputField = (props) => {
  const { type, name, index, helperText, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = errors[name] && touched[name];
  return (
    <Container key={index}>
      <TextField
        type={type}
        label={name}
        name={name}
        value={values[name]}
        helperText={isError ? errors[name] : helperText}
        required={required}
        fullWidth
        error={errors[name] && touched[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Container>
  )
};

export default InputField;
