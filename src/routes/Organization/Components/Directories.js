import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    startPolling,
    stopPolling,
    lifApprovalSend,
    dirRegisterSend,
    setOrgId,
    setDirectory,
    resetState,
    isIndexFetching,
    isPolling,
    isApprovalTransaction,
    isRegisterTransaction,
    directories,
    lifBalance,
    lifAllowance,
    isOrgRequested,
    selectedDirectory,
    indexError,
    pollingError,
    approvalError,
    registerError
} from '../../../ducks/directories';
import { selectItem as selectOrganizationItem } from '../../../ducks/fetchOrganizationInfo';
import { getSegmentMeta } from '../../../utils/directories';

import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
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
    inButtonProgress: {
        marginLeft: '10px'
    },
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
        marginBottom: '20px',
        textAlign: 'center'
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
    dialogButtonRed: {
        backgroundImage: colors.gradients.orange,
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
    buyLifWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'baseline'
    },
    yourBalanceNote: {
        fontWeight: 500,
        fontSize: '14px',
        color: colors.primary.accent,
        marginRight: '14px'
    },
    inputFieldWrapper: {
        position: 'relative',
        marginBottom: '28px',
        '&:last-child': {
            marginBottom: '0'
        }
    },
    depositNote: {
        textAlign: 'center',
        padding: '18px',
        border: `1px solid ${colors.secondary.green}`,
        borderRadius: '6px',
        marginTop: '28px',
        marginBottom: '28px',
        '&.insufficient': {
            border: `1px solid ${colors.primary.accent}`
        }
    },
    depositNoteSubtitle: {
        fontWeight: 500,
        fontSize: '14px',
        color: colors.primary.green
    },
    depositNoteTitle: {
        fontWeight: 500,
        fontSize: '28px',
        textTransform: 'capitalize',
        color: colors.primary.green
    }
});

const DialogTitle = props => {
    const classes = styles();
    const {
        children
    } = props;

    return (
        <div className={classes.dialogTitleWrapper}>
            <Typography variant={'inherit'}>
                {children}
            </Typography>
        </div>
    );
};

// Extract specific directory from the list
const getDirectory = (address, directories) => directories.filter(d => d.address === address)[0];

const AddDirectoryDialog = props => {
    const classes = styles();
    const {
        isOpened,
        handleClose,
        directories: directoriesRaw,
        resetState,
        startPolling,
        stopPolling,
        lifApprovalSend,
        dirRegisterSend,
        setDirectory,
        isPolling,
        isApprovalTransaction,
        isRegisterTransaction,
        lifBalance,
        lifAllowance,
        isOrgRequested,
        selectedDirectory,
        indexError,
        pollingError,
        approvalError,
        registerError,
        organizationItem
    } = props;
    const [directories, setDirectories] = useState([]);
    const [step, setStep] = useState(0);
    const [isBalanceOk, setBalanceOk] = useState(true);
    const [isAllowanceOk, setAllowanceOk] = useState(true);
    const [approvalLifStarted, setStartedLifApproval] = useState(false);
    const [requestStarted, setRequestStarted] = useState(false);

    useEffect(() => {
        resetState();
    }, [organizationItem]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setDirectories(
            directoriesRaw.map(dir => getSegmentMeta(dir))
        );
    }, [directoriesRaw]);

    useEffect(() => {
        if (isOpened) {
            startPolling(organizationItem.orgid);
        } else {
            stopPolling();
        }

        switch (step) {
            case 0:
                setRequestStarted(false);
                setStartedLifApproval(false);
                break;
            case 1:
                break;
            default:
        }
    }, [isOpened, startPolling, stopPolling, organizationItem, step]);

    useEffect(() => {
        if (selectedDirectory !== '') {
            console.log('@@@', selectedDirectory, directories);
            const deposit = getDirectory(selectedDirectory, directories).requesterDeposit;
            setBalanceOk(Number(lifBalance) >= Number(deposit));
            if (lifAllowance) {
                setAllowanceOk(Number(lifAllowance) >= Number(deposit));
            }
        }
    }, [directories, lifBalance, lifAllowance, selectedDirectory]);

    const onDialogClose = () => {
        stopPolling();
        resetState();
        handleClose();
    };

    if (!isOpened) {
        return null;
    }

    // address => title
    const options = directories.reduce(
        (a, d) => Object.assign(a, { [d.address]: d.title }),
        {}
    );

    const selectedDirectoryDetails = getDirectory(selectedDirectory, directories);

    return (
        <DialogComponent
            isOpen={isOpened}
            handleClose={onDialogClose}
            children={(
                <div className={classes.dialogContent}>
                    {step === 0 &&
                        <>
                            <DialogTitle>
                                Choose a Directory
                            </DialogTitle>
                            <div className={classes.dialogSelectorWrapper}>
                                <Formik
                                    initialValues={{ directory: selectedDirectory }}
                                    validate={values => {
                                        const errors = {};
                                        return errors;
                                    }}
                                    onSubmit={values => {
                                        console.log('@@@', values);
                                        setDirectory({
                                            directory: values.directory
                                        });
                                        setStep(1);
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
                        </>
                    }
                    {(step === 1 && !isOrgRequested) &&
                        <>
                            <DialogTitle>
                                Register {organizationItem.name} in {selectedDirectoryDetails.title} Directory
                            </DialogTitle>
                            <div className={classes.depositNote + (isBalanceOk ? '' : ' insufficient')}>
                                <Typography className={classes.depositNoteSubtitle}>
                                    Required deposit
                                </Typography>
                                <Typography className={classes.depositNoteTitle}>
                                    {selectedDirectoryDetails.requesterDeposit} LÍF
                                </Typography>
                            </div>
                            <div>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                >
                                    <Grid item>
                                        <Button
                                            className={classes.dialogButton}
                                            onClick={() => setStep(0)}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {!isBalanceOk &&
                                            <div className={classes.buyLifWrapper}>
                                                <Typography className={classes.yourBalanceNote}>
                                                    Your balance: {lifBalance} LÍF
                                                </Typography>
                                                <Button
                                                    className={classes.dialogButtonRed}
                                                >
                                                    Buy LÍF
                                                </Button>
                                            </div>
                                        }
                                        {(isBalanceOk && !isAllowanceOk) &&
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={isApprovalTransaction || approvalLifStarted}
                                                onClick={() => {
                                                    setStartedLifApproval(true);
                                                    lifApprovalSend(selectedDirectoryDetails.requesterDeposit);
                                                }}
                                            >
                                                Unlock Lif Tokens
                                                {(isApprovalTransaction || approvalLifStarted) &&
                                                    <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                }
                                            </Button>
                                        }
                                        {(isBalanceOk && isAllowanceOk) &&
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={isRegisterTransaction || requestStarted}
                                                onClick={() => {
                                                    setRequestStarted(true);
                                                    dirRegisterSend();
                                                }}
                                            >
                                                Request to Register
                                                {(isRegisterTransaction || requestStarted) &&
                                                    <CircularProgress className={classes.inButtonProgress} size='26px' color='secondary' />
                                                }
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    }
                    {isOrgRequested &&
                        <>
                            <DialogTitle>
                                Organization Registration Request has been sent successfully
                            </DialogTitle>
                            <div className={classes.dialogButtonWrapper}>
                                <Button
                                    className={classes.dialogButton}
                                    onClick={onDialogClose}
                                >
                                    Close
                                </Button>
                            </div>
                        </>
                    }
                </div>
            )}
        />
    );
};

const Directories = props => {
    const classes = styles();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const toggleDialogOpen = () => setDialogOpen(!isDialogOpen);

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
                            isOpened={isDialogOpen}
                            handleClose={toggleDialogOpen}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        isIndexFetching: isIndexFetching(state),
        isPolling: isPolling(state),
        isApprovalTransaction: isApprovalTransaction(state),
        isRegisterTransaction: isRegisterTransaction(state),
        directories: directories(state),
        lifBalance: lifBalance(state),
        lifAllowance: lifAllowance(state),
        isOrgRequested: isOrgRequested(state),
        selectedDirectory: selectedDirectory(state),
        indexError: indexError(state),
        pollingError: pollingError(state),
        approvalError: approvalError(state),
        registerError: registerError(state),
        organizationItem: selectOrganizationItem(state)
    }
};

const mapDispatchToProps = {
    startPolling,
    stopPolling,
    lifApprovalSend,
    dirRegisterSend,
    setOrgId,
    setDirectory,
    resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
