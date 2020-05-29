import React from 'react';
import { connect } from 'react-redux';
import DialogComponent from './Dialog';
import { Formik } from 'formik';
import {
    Container,
    TextField,
    Button,
    Typography
} from "@material-ui/core";
import {
    addAssertion
} from '../ducks/wizard';

const extractDomainName = uri => new URL(uri).hostname;

const extractSocialClaim = uri => {
    const url = new URL(uri);
    const hostname = url.hostname.split('www.').filter(d => d)[0];
    const account = url.pathname.split('/').splice(1,1)[0];
    return `${hostname}/${account}`;
}

const ProofForm = props => {
    const { proof, addAssertion, onWizardClose } = props;

    return (
        <Container>
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
                    onWizardClose({
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
                            {proof.notes.map((n, i) => (
                                <Typography key={i}>
                                    {n}
                                </Typography>
                            ))}
                        </div>
                        <div>                            
                            <TextField
                                type='input'
                                label='Proof URL'
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
                        <div>
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

const ProofsWizard = props => {
    const { isOpen, onWizardClose, proof } = props;

    if (!proof) {
        return false;
    }

    return (
        <DialogComponent
            handleClose={onWizardClose}
            isOpen={isOpen}
            children={(
                <ProofForm {...props} />
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
