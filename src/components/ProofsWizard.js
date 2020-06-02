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
                    proofUri: ''
                }}
                enableReinitialize={true}
                validate={values => {
                    const errors = {};

                    if (!/\w+:(\/?\/?)[^\s]+/.test(values.proofUri)) {
                        errors.proofUri = 'Wrong proof URI';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const assertion = {
                        type: proof.type,
                        claim: proof.type === 'domain'
                            ? extractDomainName(values.proofUri)
                            : extractSocialClaim(values.proofUri),
                        proof: values.proofUri
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
                                            className={classes.textarea}
                                            value={n.replace(/^>/, '')}
                                        />
                                    ); 
                                }

                                return (
                                    <Typography className={classes.info} key={i}>
                                        {n}
                                    </Typography>
                                );
                            })}
                        </div>
                        <div>                            
                            <TextField
                                type='input'
                                label='Enter proof URL: https://...'
                                name='proofUri'
                                value={values['proofUri']}
                                helperText={errors['proofUri'] && touched['proofUri'] ? errors['proofUri'] : undefined}
                                required={true}
                                error={errors['proofUri'] && touched['proofUri']}
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

const ProofsWizard = props => {
    const { isOpen, handleClose, proof } = props;
    const classes = useStyles();

    if (!proof) {
        return false;
    }

    return (
        <DialogComponent
            className={classes.root}
            maxWidth='xs'
            handleClose={handleClose}
            isOpen={isOpen}
            children={(
                <ProofForm classes={classes} {...props} />
            )}
        />
    );
};

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = {
    addAssertion
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsWizard);
