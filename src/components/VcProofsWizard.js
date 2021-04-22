import React from 'react';
import { connect } from 'react-redux';
import DialogComponent from './Dialog';
import { Formik } from 'formik';
import {
    TextareaAutosize,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
    addAssertion
} from '../ducks/wizard';
import SaveButton from './buttons/Save';

const useStyles = makeStyles({
    root: {
        maxWidth: '700px'
    },
    info: {
        fontFamily: 'Inter',
        fontDtyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '28px',
        color: '#8F999F',
        marginBottom: '20px'
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
            border: '1px solid #8F999F'
        }
    },
    save: {
        marginTop: '40px'
    }
});

const extractDomainName = uri => new URL(uri).hostname;

const extractSocialClaim = uri => {
    const url = new URL(uri);
    const hostname = url.hostname.split('www.').filter(d => d)[0];
    const account = url.pathname.split('/').splice(1,1)[0];
    return `${hostname}/${account}`;
}

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
                            {proof.notes.map((n, i) => {

                                if (n.match(/^>/)) {
                                    return (
                                        <TextareaAutosize
                                            key={i}
                                            className={classes.textarea}
                                            value={n.replace(/^>/, '')}
                                        />
                                    );
                                }

                                return (
                                    <Typography
                                        key={i}
                                        className={classes.info}
                                    >
                                        {n}
                                    </Typography>
                                );
                            })}
                        </div>
                        <div>
                            <TextField
                                label='VC content'
                                name='vc'
                                multiline
                                rows={5}
                                value={values['vc']}
                                helperText={errors['vc'] && touched['vc'] ? errors['vc'] : undefined}
                                required={true}
                                error={errors['vc'] && touched['vc']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                        </div>
                        <div className={classes.save}>
                            <SaveButton
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Save
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
