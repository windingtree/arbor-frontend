import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import { saveMediaToArbor, selectWizardOrgidJson } from '../../../ducks/wizard'
import { selectSignInAddress } from '../../../ducks/signIn'

import {Container, TextField} from '@material-ui/core';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function Previews(props) {
  const { saveMediaToArbor, address, orgidJson: { id } } = props;
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxSize: 500 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);

      window['file_0'] = acceptedFiles[0];
      saveMediaToArbor({address, id, file: acceptedFiles[0]});

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}


const DropzoneField = (props) => {
  console.log(props);
  const { saveMediaToArbor, address, orgidJson, type, name, orgidJsonPath, index, helperText, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);
  return (
    <Container key={index}>
      <Previews
        address={address}
        orgidJson={orgidJson}
        saveMediaToArbor={saveMediaToArbor}
        name={orgidJsonPath}
        value={_.get(values, orgidJsonPath)}
        helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        type={type}
        label={name}
        name={orgidJsonPath}
        value={_.get(values, orgidJsonPath)}
        helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
        required={required}
        fullWidth
        error={isError}
        onChange={(...args) => {
          console.log(args);
          handleChange(...args)
        }}
        onBlur={handleBlur}
      />
    </Container>
  )
};


const mapStateToProps = state => {
  return {
    orgidJson: selectWizardOrgidJson(state),
    address: selectSignInAddress(state)
  }
};

const mapDispatchToProps = {
  saveMediaToArbor
};

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneField);
