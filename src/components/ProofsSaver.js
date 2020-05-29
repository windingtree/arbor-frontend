import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Container
} from "@material-ui/core";
import DialogComponent from '../components/Dialog';
import {
    resetTransactionStatus,
    selectPendingState,
    selectSuccessState,
    selectError
} from '../ducks/wizard';
import {
    wizardConfig
} from '../utils/legalEntity';
import WizardStepHosting from './WizardStepHosting';
import WizardStepMetaMask from './WizardStepMetaMask';

const wizardContent = wizardConfig
    .reduce(
        (a, v) => {
            if (v.type === 'step_hosting' || v.type === 'step_metamask') {
                a[v.type] = v;
            }
            return a;
        },
        {}
    );

const ProofsSaver = props => {
    const {
        isOpen,
        handleClose,
        resetTransactionStatus,
        pendingTransaction,
        successTransaction,
        error
    } = props;
    const [saverStep, setSaverStep] = useState(0);

    useEffect(() => {
        resetTransactionStatus();
        setSaverStep(0);
    }, [isOpen, resetTransactionStatus]);

    const handleNext = () => {
        setSaverStep(step => step + 1);
      };

    const ActiveStep = ({ step = 0 }) => step === 0
        ? (
            <WizardStepHosting
                 data={wizardContent['step_hosting']}
                 action={'edit'}
                 handleNext={handleNext}
                 key={step}
                 index={step}
                 stepTitle={false}
            />
        )
        : (
            <WizardStepMetaMask
                 data={wizardContent['step_metamask']}
                 action={'edit'}
                 handleNext={handleNext}
                 key={step}
                 index={step}
                 stepTitle={false}
            />
        );

    return (
        <DialogComponent
            handleClose={() => handleClose(successTransaction && !!!error)}
            isOpen={isOpen}
            children={(
                <Container>
                    {!!pendingTransaction
                        ? (
                            <div>
                                Save in process
                            </div>
                        )
                        : !successTransaction
                            ? (<ActiveStep step={saverStep} />)
                            : (
                                <div>
                                    Updates successfully saved
                                </div>
                            )
                    }
                </Container>
            )}
        />
    );
};

const mapStateToProps = state => {
    return {
        pendingTransaction: selectPendingState(state),
        successTransaction: selectSuccessState(state),
        error: selectError(state)
    };
  };
  
const mapDispatchToProps = {
    resetTransactionStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsSaver);
