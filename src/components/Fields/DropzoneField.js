import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';
import {saveMediaToArbor, extendOrgidJson, selectWizardOrgidJson} from '../../ducks/wizard'
import {selectSignInAddress} from '../../ducks/signIn'

import {Tab, Tabs, TextField, Typography, Button, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DragAndDropImage from '../../assets/SvgComponents/dragNDrop-image.svg';

import colors from '../../styles/colors';

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
  previewContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: '8px',
    border: `1px solid ${colors.greyScale.lightest}`,
    marginBottom: '8px',
    marginRight: '8px',
    width: '100px',
    height: '100px',
    padding: '4px',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  thumbInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '0',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '110%',
  },
  previewButtonWrapper: {
    marginLeft: '10px'
  },
  previewButton: {
    textTransform: 'none'
  },
  previewButtonLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.secondary.cyan
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
  },
  uploadedImage: {
    maxWidth: '100%',
    border: '1px dashed #D9D9D9',
    borderRadius: '8px'
  },
  removePhotoLink: {
    color: colors.secondary.peach,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    cursor: 'pointer'
  }
});

function Previews(props) {
  const classes = styles();
  const {setFiles, files, helperText, description, address, orgidJson: {id}} = props;
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    maxSize: 500 * 1024,
    multiple: false,
    onDrop: (acceptedFiles, ) => {
      window['file_0'] = acceptedFiles[0];
      props.saveMediaToArbor({address, id, file: acceptedFiles[0]});

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const handleDeletePreview = () => {
    props.saveMediaToArbor({address, id, file: null});
    setFiles([]);
  };

  const thumbs = files.map(file => (
    <div className={classes.previewContainer}>
      <div className={classes.thumb} key={file.name}>
        <div className={classes.thumbInner}>
          <img
            alt={'Preview'}
            src={file.preview}
            className={classes.img}
          />
        </div>
      </div>
      <div className={classes.previewButtonWrapper}>
        <Button onClick={handleDeletePreview} className={classes.previewButton}>
          <Typography variant={'caption'} className={classes.previewButtonLabel} noWrap>Remove photo</Typography>
        </Button>
      </div>
    </div>
  ));


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
        <aside className={classes.thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    </div>
  );
}

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

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

const DropzoneField = (props) => {
  const classes = styles();
  const {saveMediaToArbor, address, orgidJson, type, name, description, orgidJsonPath, index, helperText, required, values, errors, touched, handleChange, handleBlur} = props;
  const isError = _.get(errors, orgidJsonPath) && _.get(touched, orgidJsonPath);
  const [tabValue, setTabValue] = useState(0);
  const [showPreviewOnly, setShowPreviewOnly] = useState(!!_.get(values, orgidJsonPath, false));
  const [files, setFiles] = useState([]);

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
    props.extendOrgidJson(values);
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const removePhotoHandler = () => {
    setShowPreviewOnly(false);
    props.saveMediaToArbor({address, id: orgidJson.id, file: null});
  };

  const value = _.get(values, orgidJsonPath);

  return (
    <div key={index} className={classes.tabsContainer}>
      {showPreviewOnly &&
      <div>
        <div>
          <img className={classes.uploadedImage} src={value} alt={`File cannot be shown as image. URI: ${value}`}/> {/* eslint-disable-line jsx-a11y/img-redundant-alt */}
        </div>
        <Link className={classes.removePhotoLink} onClick={removePhotoHandler}>Remove photo</Link>
      </div>
      }

      {!showPreviewOnly &&
      <div>
        <div>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor='primary'
            textColor="primary"
          >
            <Tab label={'Upload an image'}/>
            <Tab label={'Add link to image'}/>
          </Tabs>
        </div>
        <TabPanel value={tabValue} index={0}>
          <Previews
            files={files}
            setFiles={setFiles}
            address={address}
            orgidJson={orgidJson}
            saveMediaToArbor={saveMediaToArbor}
            name={orgidJsonPath}
            description={description}
            value={value}
            helperText={isError ? _.get(errors, orgidJsonPath) : helperText}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <div className={classes.inputWrapper}>
            <TextField
              type={type}
              variant={'filled'}
              label={name}
              name={orgidJsonPath}
              value={value}
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
      }
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
  saveMediaToArbor,
  extendOrgidJson
};

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneField);
