import React from 'react';
import { connect } from 'react-redux';
import DialogComponent from './Dialog';
import { Formik } from 'formik';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
    addAssertion
} from '../ducks/wizard';
import DropTextFile from '../components/DropTextFile';
import SaveButton from './buttons/Save';
import CopyIdComponent from '../components/CopyIdComponent';

const useStyles = makeStyles({
    root: {},
    formTitle: {
        fontSize: '20px',
        lineHeight: '20px',
        color: '#3E9693',
        marginBottom: '40px'
    },
    noteTitleNum: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '18px',
        color: '#42424F',
        marginBottom: '20px',
        margin: '10px 0 0 0'
    },
    noteTitle: {
        fontWeight: 600,
        fontSize: '16px',
        color: '#42424F',
        margin: '20px 0 0 0'
    },
    noteLine: {
        fontWeight: 400,
        fontSize: '18px',
        color: '#5e666a',
        marginBottom: '10px'
    },
    idClass: {
        display: 'inline-block',
        fontSize: '16px',
        color: '#42424F !important',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: '6px',
        margin: '20px 0 20px 0'
    },
    textarea: {
        width: '100%',
        backgroundColor: '#FAFAFA',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        color: '#5E666A',
        resize: 'none',
        '&:focus': {
            outline: 'none !important',
            border: '1px solid #5e666a'
        }
    },
    save: {
        marginTop: '40px'
    },
    vcContentField: {
        margin: '20px 0 0 0',
        display: 'block',
        overflow: 'hidden'
    },
    dropTextWrapper: {
        marginTop: '26px'
    }
});

const ProofForm = props => {
    const { proof, addAssertion, handleClose, classes } = props;

    return (
        <>
            <Formik
                initialValues={{
                    vc: ''
                }}
                enableReinitialize={true}
                validate={values => {
                    const errors = {};

                    try {
                        if (!values.vc || values.vc.trim() === '') {
                            throw new Error('content is empty');
                        }
                        const vc = JSON.parse(values.vc);
                        if (!vc.proof ||
                            !vc.proof.verificationMethod) {
                            throw new Error('proof not defined');
                        }
                        if (!vc.credentialSubject ||
                            !vc.credentialSubject.claim) {
                            throw new Error('credential subject not defined');
                        }
                    } catch (error) {
                        errors.vc = `Incorrect VC: ${error.message}`;
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const vc = JSON.parse(values.vc);
                    const assertion = {
                        type: proof.type,
                        claim: vc.credentialSubject.claim,
                        proof: vc
                    };
                    addAssertion(assertion);
                    setSubmitting(false);
                    handleClose({
                        ...proof,
                        assertion,
                        title: assertion.claim,
                        verified: false,
                        deployed: false
                    });
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
                        <div>
                            <Typography className={classes.formTitle}>
                                {proof.title}
                            </Typography>
                        </div>
                        <div>
                            {proof.notes.map((n, i) => {

                                if (n.match(/^>/)) {
                                    return (
                                        <CopyIdComponent
                                            key={i}
                                            title='ORGiD copied to clipboard'
                                            id={n.replace(/^>/, '')}
                                            idClass={classes.idClass}
                                            noEllipsis
                                        />
                                    );
                                }

                                if (n.match(/^\d/)) {
                                    return (
                                        <Typography
                                            key={i}
                                            className={classes.noteTitleNum}
                                        >
                                            {n}
                                        </Typography>
                                    );
                                }

                                if (n.match(/^!/)) {
                                    return (
                                        <Typography
                                            key={i}
                                            className={classes.noteTitle}
                                        >
                                            {n.replace('!', '')}
                                        </Typography>
                                    );
                                }

                                return (
                                    <Typography
                                        key={i}
                                        className={classes.noteLine}
                                    >
                                        {n}
                                    </Typography>
                                );
                            })}
                        </div>
                        <div className={classes.dropTextWrapper}>
                            <DropTextFile
                                label='Verifiable Credential content'
                                name='vc'
                                value={values['vc']}
                                helperText={errors['vc'] && touched['vc'] ? errors['vc'] : values['vc'] === '' ? 'Put your credential content here' : undefined}
                                error={errors['vc'] && touched['vc']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={classes.save}>
                            <SaveButton
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Done
                            </SaveButton>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

const VcProofsWizard = props => {
    const { isOpen, handleClose, proof } = props;
    const classes = useStyles();

    if (!proof) {
        return false;
    }

    return (
        <DialogComponent
            className={classes.root}
            maxWidth='xs'
            handleClose={() => handleClose(null)}
            isOpen={isOpen}
            children={(
                <ProofForm classes={classes} {...props} />
            )}
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    addAssertion
};

export default connect(mapStateToProps, mapDispatchToProps)(VcProofsWizard);
