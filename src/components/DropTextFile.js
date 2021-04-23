import React, { createRef, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import dropFileIcon from '../assets/SvgComponents/dropFile.svg';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dropArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        flexDirection: 'column',
        background: '#FAFAFA',
        border: '1px dashed #D9D9D9',
        boxSizing: 'border-box',
        borderRadius: '8px',
        padding: '22px',
        textAlign: 'center'
    },
    isDrag: {
        background: 'rgba(250,250,250,0.5)',
        border: '1px dashed #949494'
    },
    dropAreaTitle: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#8F999F'
    },
    dropBottomText: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: '#3E9693'
    },
    dropAreaIcon: {
        width: '25px',
        height: '25px',
        margin: '20px',
        backgroundImage: `url(${dropFileIcon})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#8F999F',
        margin: '26px 0 12px 0'
    }
});

const DropTextFile = props => {
    const inputRef = useRef();
    const classes = useStyles();
    const {
        label,
        name,
        value = '',
        helperText,
        error,
        onChange = () => {},
        onBlur = () => {},
        onError = () => {}
    } = props;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'application/json',
        multiple: false,
        onDrop: async acceptedFiles => {
            try {
                window['file_0'] = acceptedFiles[0];
                if (!acceptedFiles[0]) {
                    throw new Error('Unable to get the file');
                }
                const file = acceptedFiles[0];
                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    const nativeTextareaSetter = Object
                        .getOwnPropertyDescriptor(
                            window.HTMLTextAreaElement.prototype,
                            'value'
                        ).set;
                    nativeTextareaSetter.call(inputRef.current, reader.result);
                    const inputEvent = new Event('input', { bubbles: true});
                    console.log({inputRef});
                    inputRef.current.dispatchEvent(inputEvent);
                };
                reader.onerror = () => {
                    onError(reader.error);
                };
                reader.readAsText(file);
            } catch (error) {
                onError(error);
            }
        }
    });

    return (
        <div {...getRootProps({
            onClick: event => {
                if (event.target.nodeName === 'TEXTAREA') {
                    event.stopPropagation();
                }
            }
        })}>
            <input {...getInputProps()} />
            <Grid
                container
                alignItems='stretch'
                justify='center'
                direction='column'
            >
                <Grid item>
                    <div className={`${classes.dropArea} ${isDragActive ? classes.isDrag : ''}`}>
                        <Typography className={classes.dropAreaTitle}>
                            Drag a file here
                        </Typography>
                        <div className={classes.dropAreaIcon} />
                        <Typography className={classes.dropBottomText}>
                            or select a file from your computer
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                    <Typography className={classes.textTitle}>
                        or manually copypaste .json content here
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        inputRef={inputRef}
                        label={label}
                        name={name}
                        value={value}
                        helperText={helperText}
                        error={error}
                        onChange={onChange}
                        onBlur={onBlur}
                        rows={3}
                        variant='filled'
                        required
                        multiline
                        fullWidth
                    />
                </Grid>
            </Grid>

        </div>
    );
};

export default DropTextFile;
