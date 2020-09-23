import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    fetchDirectories,
    isDirectoriesFetching,
    isDirectoriesFetched,
    directoriesError,
    directoriesList
} from '../../../ducks/directoriesIndex';
import { getSegmentMeta } from '../../../utils/directories';

import { Container, Typography, Button } from '@material-ui/core';
import { Formik } from 'formik';
import DialogComponent from '../../../components/Dialog';
import SelectField from '../../../components/Fields/SelectField';
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";

const styles = makeStyles({
    container: {
        position: 'relative',
        fontWeight: 400,
        fontSize: '14px',
        color: colors.greyScale.dark,
        padding: '20px 0'
    },
    titleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    contentWrapper: {},
    addButtonWrapper: {
        width: '100%',
        margin: '20px 0'
    },
    addButton: {
        width: '100%',
        position: 'relative',
        fontSize: '16px',
        fontWeight: 500,
        color: colors.secondary.cyan,
        textTransform: 'none',
        boxShadow: '0px 0px 20px rgba(189, 191, 203, 0.25), 0px 0px 2px rgba(188, 194, 211, 0.25)',
        backgroundColor: colors.primary.white,
        borderRadius: '8px',
        padding: '20px 0'
    },
    dialogContent: {
        width: '440px',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%'
        }
    },
    dialogTitleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    dialogButtonWrapper: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column'
    },
    dialogSelectorWrapper: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    dialogButton: {
        backgroundImage: colors.gradients.green,
        borderRadius: '6px',
        textTransform: 'none',
        color: colors.primary.white,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '24px',
        padding: '14px 26px',
        marginTop: '16px'
    },
    dialogNewButton: {
        fontSize: '14px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        textDecoration: 'underline',
        textTransform: 'none',
        marginTop: '10px'
    },
    inputFieldWrapper: {
        position: 'relative',
        marginBottom: '28px',
        '&:last-child': {
            marginBottom: '0'
        }
    }
});

const AddDirectoryDialog = props => {
    const classes = styles();
    const {
        isOpened,
        handleClose,
        directories
    } = props;

    if (!isOpened) {
        return null;
    }

    // address => title
    const options = directories.reduce(
        (a, d) => Object.assign(a, {[d.address]: d.title}),
        {}
    );

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={handleClose}
            children={(
                <div className={classes.dialogContent}>
                    <div className={classes.dialogTitleWrapper}>
                        <Typography variant={'inherit'}>
                            Choose a Directory
                        </Typography>
                    </div>
                    <div className={classes.dialogSelectorWrapper}>
                        <Formik
                            initialValues={{ directory: '' }}
                            validate={values => {
                                const errors = {};
                                return errors;
                            }}
                            onSubmit={values => {
                                console.log('@@@', values);
                                handleClose();
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.inputFieldWrapper}>
                                        <SelectField
                                            name={'directory'}
                                            variant={'filled'}
                                            label={'Segment name'}
                                            fullWidth
                                            required
                                            options={options}
                                            values={values.directory}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            helperText={errors.type && touched.type ? errors.type : null}
                                        />
                                    </div>
                                    <div className={classes.dialogButtonWrapper}>
                                        <Button
                                            className={classes.dialogButton}
                                            type={'submit'}
                                            disabled={isSubmitting}
                                        >
                                            Register in Directory
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div className={classes.dialogButtonWrapper}>
                        <Button
                            className={classes.dialogNewButton}
                            onClick={() => window.open('https://forms.gle/GsVZYqPXJMbdkerF8', '_blank')}
                        >
                            Propose a new Directory
                        </Button>
                    </div>
                </div>
            )}
        />
    );
};

const Directories = props => {
    const classes = styles();
    const {
        fetchDirectories,
        isFetching,
        isFetched,
        error,
        directories
    } = props;
    const [parsedDirectories, setDirectories] = useState([]);
    const [isAddDialogOpened, setAddDialogOpened] = useState(false);

    useEffect(() => {
        setDirectories(
            directories.map(dir => getSegmentMeta(dir))
        );
    }, [directories]);

    const toggleDialogOpen = () => setAddDialogOpened(!isAddDialogOpened);

    return (
        <Container>
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                    <Typography variant={'inherit'}>Directories</Typography>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.addButtonWrapper}>
                        <Button
                            className={classes.addButton}
                            onClick={toggleDialogOpen}
                        >
                            <Typography variant={'inherit'}>
                                Add Directory
                            </Typography>
                        </Button>
                        <AddDirectoryDialog
                            isOpened={isAddDialogOpened}
                            directories={parsedDirectories}
                            handleClose={toggleDialogOpen}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        isFetching: isDirectoriesFetching(state),
        isFetched: isDirectoriesFetched(state),
        error: directoriesError(state),
        directories: directoriesList(state)
    }
};

const mapDispatchToProps = {
    fetchDirectories
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
