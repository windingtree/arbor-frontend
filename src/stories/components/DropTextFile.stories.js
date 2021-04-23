import React from 'react';
import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import DropTextFile from '../../components/DropTextFile';

storiesOf('ORG ID/Components/DropTextFile', module)
  .add('Drag-n-Drop Text File', () => {
    return (
        <Container>
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
                    console.log(vc);
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
                            <DropTextFile
                                label='VC content'
                                name='vc'
                                value={values['vc']}
                                helperText={errors['vc'] && touched['vc'] ? errors['vc'] : undefined}
                                error={errors['vc'] && touched['vc']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </Container>
    )
});