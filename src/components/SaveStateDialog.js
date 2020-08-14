import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';

import {
    saveActiveStatus,
    getIsFetching,
    getTransactionPending,
    getIsSuccessTransaction,
    getError,
    resetActiveStatusTransaction
} from '../ducks/orgActiveStatus';

import Dialog from './Dialog';
import colors from '../styles/colors';

const styles = makeStyles({
    stepTitle: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
    },
    subtitleWrapper: {
        margin: '12px 0'
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.45,
        color: colors.greyScale.common
    },
    error: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.45,
        color: 'red'
    },
    success: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.45,
        color: '#2E2E31'
    },
    buttonWrapper: {
        display: 'table',
        margin: '40px auto 0 auto'
    },
    button: {
        border: `1px solid ${colors.primary.accent}`,
        borderRadius: '8px',
        backgroundImage: colors.gradients.orange,
        textTransform: 'capitalize',
        '&:disabled': {
            opacity: '0.5',
            cursor: 'none'
        }
    },
    buttonLabel: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1.24,
        color: colors.primary.white,
        padding: '4px 12px'
    },
    dialogContent: {
        width: '440px'
    }
});

const SaveStateDialog = props => {
    const {
        isModalOpen,
        handleCloseModal,
        saveActiveStatus,
        isFetching,
        isTransactionPending,
        isTransactionSuccess,
        resetActiveStatusTransaction,
        error
    } = props;
    const classes = styles();

    const handleSendTransaction = () => {
        saveActiveStatus();
    };

    const handleClose = () => {
        resetActiveStatusTransaction();
        handleCloseModal();
    };

    return (
        <Dialog
            handleClose={() => handleClose()}
            isOpen={isModalOpen}
            children={(
                <div className={classes.dialogContent}>
                    <Typography variant={'h3'} className={classes.stepTitle}>
                        Submit transaction
                    </Typography>
                    {!isTransactionSuccess &&
                        <div className={classes.subtitleWrapper}>
                            <Typography variant={'subtitle1'} className={classes.subtitle}>
                                You need to submit an Ethereum transaction to pay the miners’ fee for every profile update or verification.
                            </Typography>
                            <Typography  className={classes.subtitle}>
                                You can adjust the fee using gas fee's "edit" feature, which is available in your wallet popup window.
                            </Typography>
                            <div className={classes.buttonWrapper}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Button
                                            onClick={() => handleSendTransaction()}
                                            disabled={isFetching || isTransactionPending}
                                            className={classes.button}
                                        >
                                            <Typography variant={'caption'} className={classes.buttonLabel}>Send</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>&nbsp;&nbsp;
                                    {(isFetching || isTransactionPending) &&
                                        <CircularProgress
                                            variant='indeterminate'
                                            size={30}
                                            thickness={4}
                                        />
                                    }
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    }
                    {isTransactionSuccess &&
                        <div className={classes.subtitleWrapper}>
                            <Typography className={classes.success}>
                                Organization status has been successfully updated
                            </Typography>
                            <div className={classes.buttonWrapper}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Button
                                            onClick={() => handleClose()}
                                            disabled={isFetching || isTransactionPending}
                                            className={classes.button}
                                        >
                                            <Typography variant={'caption'} className={classes.buttonLabel}>Close</Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    }
                    {error &&
                        <div className={classes.subtitleWrapper}>
                            <Typography  className={classes.error}>
                                {error && error.message
                                    ? error.message
                                    : 'Umknown error occurred'}
                            </Typography>
                        </div>
                    }
                </div>
            )}
        />
    );
};

const mapStateToProps = state => {
    return {
        isFetching: getIsFetching(state),
        isTransactionPending: getTransactionPending(state),
        isTransactionSuccess: getIsSuccessTransaction(state),
        error: getError(state)
    }
};

const mapDispatchToProps = {
    saveActiveStatus,
    resetActiveStatusTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveStateDialog);
