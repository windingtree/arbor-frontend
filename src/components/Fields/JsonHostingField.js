import React from 'react';

import { Container } from '@material-ui/core';

const JsonHostingField = (props) => {
  const { index, values /*, orgidJsonPath,  type, name, helperText, required,  errors, touched, handleChange, handleBlur*/ } = props;
  // const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(values, null, 2));

  return (
    <Container key={index}>
      <a href={data} download="ORG.ID.json">Download ORG.JSON</a>
    </Container>
  )
};

export default JsonHostingField;
