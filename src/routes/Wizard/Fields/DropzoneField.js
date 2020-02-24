import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import { saveMediaToArbor, selectWizardOrgidJson } from '../../../ducks/wizard'
import { selectSignInAddress } from '../../../ducks/signIn'

import { Tab, Tabs, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DragAndDropImage from '../../../assets/SvgComponents/dragNDrop-image.svg';

import colors from '../../../styles/colors';

const styles = makeStyles({
  tabsContainer: {
    marginTop: '40px'
  },
  dropzoneContentTitleWrapper: {
    margin: '20px 0 32px 0'
  },
  dropzoneContentTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: colors.greyScale.common
  },
  dropzoneContent: {
    marginTop: '32px'
  },
  dropzone: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px',
    marginBottom: '12px',
    borderWidth: '1px',
    borderRadius: '8px',
    borderColor: colors.greyScale.light,
    borderStyle: 'dashed',
    backgroundColor: colors.greyScale.inputBg,
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
  dropzoneTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.greyScale.common,
  },
  dropzoneImageWrapper: {
    margin: '8px 0'
  },
  selectFilesButton: {
    textTransform: 'none'
  },
  selectFilesButtonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.secondary.cyan
  },
  helperText: {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.greyScale.common,
  },
  inputWrapper: {
    marginTop: '20px'
  }
});

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
  const classes = styles();
  const { saveMediaToArbor, helperText, description, address, orgidJson: { id } } = props;
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxSize: 500 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
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
          alt={'Preview'}
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
    <div>
      <div className={classes.dropzoneContentTitleWrapper}>
        <Typography variant={'subtitle1'} className={classes.dropzoneContentTitle}>{description}</Typography>
      </div>
      <section className={classes.dropzoneContent}>
        <div {...getRootProps({className: classes.dropzone})}>
          <input {...getInputProps()} />
          <Typography variant={'subtitle2'} className={classes.dropzoneTitle}>Drag a file here</Typography>
          <div className={classes.dropzoneImageWrapper}>
            <img src={DragAndDropImage} alt={'drag-and-drop'}/>
          </div>
          <Button onClick={() => console.log('select a file')} className={classes.selectFilesButton}>
            <Typography variant={'caption'} className={classes.selectFilesButtonLabel}>
              or select a file from your computer
            </Typography>
          </Button>
        </div>
        <Typography variant={'caption'} className={classes.helperText}>{helperText}</Typography>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    </div>
  );
}


const DropzoneField = (props) => {
  const classes = styles();
  const [value, setValue] = useState(0);
  const { saveMediaToArbor, address, orgidJson, type, name, description, orgidJsonPath, index, helperText, required, values, errors, touched, handleChange, handleBlur } = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </Typography>
    )
  };

  return (
    <div key={index} className={classes.tabsContainer}>
      <div>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor='primary'
          textColor="primary"
        >
          <Tab label={'Upload an image'}/>
          <Tab label={'Add link to image'}/>
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <Previews
          address={address}
          orgidJson={orgidJson}
          saveMediaToArbor={saveMediaToArbor}
          name={orgidJsonPath}
          description={description}
          value={_.get(values, orgidJsonPath)}
          helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.inputWrapper}>
          <TextField
            type={type}
            variant={'filled'}
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
        </div>
      </TabPanel>
    </div>
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
