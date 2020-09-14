import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Box,
    Grid,
    CircularProgress,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from '../components/Dialog';
import {
    resetTransactionStatus,
    selectPendingState,
    selectSuccessState,
    selectError,
    selectTransactionHash
} from '../ducks/wizard';
import {
    wizardConfig
} from '../utils/legalEntity';
import WizardStepHosting from './WizardStepHosting';
import WizardStepMetaMask from './WizardStepMetaMask';
import SaveButton from './buttons/Save';

const useStyles = makeStyles({
    root: {

    },
    progress: {
        marginRight: '20px',
    },
    info: {
        fontFamily: 'Inter',
        fontDtyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '28px',
        color: '#8F999F',
        '& span.hash': {
            color: '#5E666A'
        },
        '& span.error': {
            color: '#F79A8B'
        }
    },
    save: {
        marginTop: '40px'
    }
});

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
        error,
        transactionHash
    } = props;
    const [saverStep, setSaverStep] = useState(0);
    const classes = useStyles();

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
                <>
                    {!!pendingTransaction
                        ? (
                            <Box>
                                <Grid container justify='space-between' alignItems='center'>
                                    <Grid item>
                                        <CircularProgress
                                            className={classes.progress}
                                            variant='indeterminate'
                                            size={40}
                                            thickness={4}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            className={classes.info}
                                        >
                                            Transaction <span className='hash'>{transactionHash}</span> is pending...
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                        : !successTransaction
                            ? (<ActiveStep step={saverStep} />)
                            : (
                                <Box>
                                    <Typography
                                        className={classes.info}
                                    >
                                        {!error &&
                                            <>Success! Update has been successfully saved</>
                                        }
                                        {error &&
                                            <span className='error'>{error.message}</span>
                                        }
                                    </Typography>
                                    <div className={classes.save}>
                                        <SaveButton
                                            onClick={() => handleClose(successTransaction && !!!error)}
                                        >
                                            Close
                                        </SaveButton>
                                    </div>
                                </Box>
                            )
                    }
                </>
            )}
        />
    );
};

const mapStateToProps = state => {
    return {
        pendingTransaction: selectPendingState(state),
        successTransaction: selectSuccessState(state),
        error: selectError(state),
        transactionHash: selectTransactionHash(state)
    };
  };

const mapDispatchToProps = {
    resetTransactionStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsSaver);
