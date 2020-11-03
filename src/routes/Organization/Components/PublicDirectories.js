import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../redux/history';

import { selectWeb3, selectSignInAddress } from '../../../ducks/signIn';
import { selectItem as selectOrganizationItem } from '../../../ducks/fetchOrganizationInfo';
import {
    setOrgId,
    isIndexFetching,
    isOrgDirectoriesFetching,
    directories,
    orgDirectories,
    indexError,
    statsError,
    orgError
} from '../../../ducks/directories';
import {
    isExecutionTimeout,
    executionTimeoutTitle
} from '../../../utils/directories';
import {
    getArbDirContract,
    sendMethod
} from '../../../ducks/utils/ethereum';
import { strCenterEllipsis } from '../../../utils/helpers';

import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';

import Contributions from './Contributions';
import EvidenceDialog from  './EvidenceDialog';

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../styles/colors";
import DirRequestedIcon from '../../../assets/SvgComponents/dir-requested-icon.svg';
import DirChallengedIcon from '../../../assets/SvgComponents/dir-challenged-icon.svg';
import DirRegisteredIcon from '../../../assets/SvgComponents/dir-registered-icon.svg';

const styles = makeStyles({
    container: {
        marginBottom: '32px'
    },
    titleWrapper: {
        position: 'relative',
        padding: '20px 0 10px 0',
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    },
    dirListIcon: {
        position: 'absolute',
        marginLeft: '-38px'
    },
    statusLabelWrapper: {
        display: 'flex'
    },
    statusLabel: {
        padding: '3px 6px',
        borderRadius: '6px;',
        fontSize: '14px',
        '&.requested': {
            backgroundColor: '#FCE8B6',
            color: '#5E666A'
        },
        '&.withdrawal-requested': {
            backgroundColor: '#7D63FF',
            color: 'white'
        },
        '&.challenged': {
            backgroundColor: '#FAC8C0',
            color: '#5E666A'
        },
        '&.disputed': {
            backgroundColor: '#FAC8C0',
            color: '#5E666A'
        },
        '&.registered': {
            backgroundColor: '#DDECD5',
            color: '#5E666A'
        }
    },
    challengeLink: {
        fontSize: '14px',
        fontWeight: 500,
        color: colors.secondary.peach,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        },
        '&:visited': {
            color: colors.secondary.peach
        }
    },
    actionIndicator: {
        float: 'right',
        marginLeft: '10px'
    },
    actionsBlock: {
        display: 'inline-flex',
        justifyContent: 'flex-end'
    },
    actionButton: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.3,
        float: 'right',
        color: colors.secondary.peach,
        textTransform: 'none'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    },
    dialogContent: {
        width: '500px',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            width: '100%'
        }
    },
    dialogTitleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px',
        textAlign: 'center',
        '&.noMargin': {
            marginBottom: 0
        }
    },
    dialogButtonWrapper: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
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
    },
    inputFieldWrapper: {
        position: 'relative',
        marginBottom: '28px',
        '&:last-child': {
          marginBottom: '0'
        }
    },
    inputLabel: {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        margin: '0px 12px',
        color: '#42424F'
    },
    inputSubLabel: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        margin: '0px 12px',
        color: '#8F999F'
    },
    dropZone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60px',
        background: '#FFFFFF',
        border: '1px solid #F3F3F6',
        boxShadow: '0px 6px 24px #F3F3F6',
        borderRadius: '6px',
        marginTop: '20px',
        '&:hover': {
            cursor: 'pointer',
            background: '#EFEFEF',
            boxShadow: '0px 4px 20px #F3F3F6'
        }
    },
    inButtonProgress: {
        marginLeft: '10px'
    },
    noRecordsTitle: {
        color: '#5E666A',
        fontWeight: 500,
        fontSize: '14px'
    }
});

const DirectoriesList = props => {
    const classes = styles();
    const {
        orgError,
        isIndexFetching,
        isOrgDirectoriesFetching,
        directories: directoriesDetails,
        orgDirectories,
        web3,
        walletAddress,
        organizationItem,
        setOrgId
    } = props;

    const [error, setError] = useState(null);
    const [challengeStarting, setChallengeStarting] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now());

    // const [challengeDetailsOpen, setChallengeDetailsOpen] = useState(false);
    // const [selectedChallengeID, setSelectedChallengeID] = useState(null);
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [executeTimeoutSending, setExecuteTimeoutSending] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [parsedDirectories, setParsedDirectories] = useState([]);

    useEffect(() => {
        const timeInterval = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(timeInterval);
    }, []);

    const challengeTheRegistration = useCallback(directory => {
        console.log('Selected directory:', directory);
        setSelectedDirectory(directory);
        setDialogOpen(true);
    }, []);

    const executeTimeoutAction = useCallback((directory, action) => {
        setError(null);
        action.actionIndicatorCallback(true);
        sendMethod(
            web3,
            walletAddress,
            directory.address,
            getArbDirContract,
            'executeTimeout',
            [
                organizationItem.orgid
            ]
        )
            .then(() => {
                action.actionIndicatorCallback(false);
                setOrgId(organizationItem.orgid);
            })
            .catch(error => {
                setError(error);
                action.actionIndicatorCallback(false);
            });
    }, [web3, walletAddress, organizationItem, setOrgId]);

    const toggleChallengeDialog = () => {
        setDialogOpen(false);
        setSelectedDirectory(null);
    }

    // const handleCloseChallengeDetails = () => {
    //     setChallengeDetailsOpen(false);
    //     setSelectedChallengeID(null);
    //     setSelectedDirectory(null);
    // };

    const parseDirectories = useCallback(() => orgDirectories
        .map((d, index) => {
            const config = [
                // The organization is not registered and doesn't have an open request.
                {
                    status: 'Not Registered',
                    statusClass: '',
                    icon: '',
                    actions: []
                },
                // The organization has an open request.
                {
                    status: 'Registration Requested',
                    statusClass: 'requested',
                    icon: DirRequestedIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                },
                // The organization made a withdrawal request.
                {
                    status: 'Withdrawal Requested',
                    statusClass: 'withdrawal-requested',
                    icon: DirChallengedIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                },
                // The organization has been challenged.
                {
                    status: 'Challenged',
                    statusClass: 'challenged',
                    icon: DirChallengedIcon,
                    actions: [
                        {
                            action: 'Close challenge',
                            actionIndicator: executeTimeoutSending,
                            actionIndicatorCallback: setExecuteTimeoutSending,
                            actionCallback: executeTimeoutAction,
                            timeoutCallback: () => isExecutionTimeout(directoriesDetails[index], d),
                            timeoutTitle: () => executionTimeoutTitle(directoriesDetails[index], d)
                        }
                    ]
                },
                // The challenge has been disputed.
                {
                    status: 'Disputed',
                    statusClass: 'disputed',
                    icon: DirChallengedIcon,
                    actions: []
                },
                {
                    status: 'Registered',
                    statusClass: 'registered',
                    icon: DirRegisteredIcon,
                    actions: [
                        {
                            action: 'Challenge the Registration',
                            actionIndicator: challengeStarting,
                            actionIndicatorCallback: setChallengeStarting,
                            actionCallback: challengeTheRegistration
                        }
                    ]
                }
            ];

            if (d.status === '0') {
                return null;
            }

            const details = directoriesDetails[index];
            const statusNum = Number(d.status);

            return {
                ...details,
                status: statusNum,
                organization: d,
                config: config[statusNum]
            };
        })
        .filter(d => d !== null), [
            directoriesDetails,
            orgDirectories,
            executeTimeoutAction,
            executeTimeoutSending,
            challengeStarting,
            challengeTheRegistration
        ]);

    useEffect(() => {
        setParsedDirectories(parseDirectories());
    }, [parseDirectories]);

    const showChallengeDialog = (directory, challengeID) => {
        // setSelectedDirectory(directory);
        // setSelectedChallengeID(challengeID);
        // setChallengeDetailsOpen(true);
        history.push(`/challenge/${directory.organization.ID}/${directory.address}/${challengeID}`);
    };

    return (
        <>
            {/* <ChallengeDetailsDialog
                isOpened={challengeDetailsOpen}
                directory={selectedDirectory}
                challengeID={selectedChallengeID}
                handleClose={handleCloseChallengeDetails}
                {...props}
            /> */}
            <EvidenceDialog
                {...props}
                dialogTitle='Challenge the Registration'
                actionMethod='challengeOrganization'
                isOpened={isDialogOpen}
                handleClose={toggleChallengeDialog}
                directory={selectedDirectory}
                organization={organizationItem}
            />
            {(isIndexFetching || isOrgDirectoriesFetching) &&
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    alignContent='space-between'
                >
                    <Grid item style={{ marginRight: '10px'}}>
                        <CircularProgress size='18px' />
                    </Grid>
                    <Grid item>
                        <Typography>
                            Directories list is loading...
                        </Typography>
                    </Grid>
                </Grid>
            }
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.length === 0 &&
                <Typography className={classes.noRecordsTitle}>
                    Organization not registered in directories
                </Typography>
            }
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.map((directory, i) => (
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    key={i}
                >
                    <Grid item xs={3}>
                        <img
                            width='16px'
                            height='16px'
                            className={classes.dirListIcon}
                            alt={directory.title}
                            src={directory.icon}
                        />
                        {directory.title}
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.statusLabelWrapper}>
                            <Typography className={classes.statusLabel + ' ' + directory.config.statusClass}>
                                <img
                                    alt={directory.config.status}
                                    src={directory.config.icon}
                                />&nbsp;
                                {directory.config.status}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        {[3, 4].includes(directory.status) &&
                            directory.organization.challenges.map((ch, i) => (
                                <table key={i}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button
                                                    className={classes.actionButton}
                                                    onClick={() => showChallengeDialog(directory, i)}
                                                >
                                                    Challenge from {strCenterEllipsis(ch.challenger.split('x')[1])} ({ch.resolved ? 'resolved' : 'not resolved'})
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                        }
                    </Grid>
                    <Grid item xs={3} className={classes.actionsBlock}>
                        {walletAddress &&
                            <Grid container direction='column'>
                                {directory.config.actions.map((action, i) => (
                                    <div  key={i}>
                                        <Grid item>
                                            <Button
                                                disabled={currentTime && (action.timeoutCallback() || action.actionIndicator)}
                                                className={classes.actionButton}
                                                onClick={() => action.actionCallback(directory, action)}
                                            >
                                                {action.action}
                                                {action.actionIndicator &&
                                                    <div className={classes.actionIndicator}>
                                                        <CircularProgress size='16px' />
                                                    </div>
                                                }
                                            </Button>
                                        </Grid>
                                    </div>
                                ))}
                            </Grid>
                        }
                        {!walletAddress &&
                            <Button
                                className={classes.actionButton}
                                onClick={() => history.push('/authorization/signin', { follow: history.location.pathname })}
                            >
                                Sign Up to see available actions
                            </Button>
                        }
                    </Grid>
                </Grid>
            ))}
            {error &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {error.message}
                    </Typography>
                </div>
            }
            {orgError &&
                <div className={classes.errorWrapper}>
                    <Typography className={classes.errorMessage}>
                        {orgError.message}
                    </Typography>
                </div>
            }
        </>
    );
};

const PublicDirectories = props => {
    const classes = styles();
    const {
        indexError,
        statsError
    } = props;

    return (
        <Container>
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                    <Typography variant={'inherit'}>Directories</Typography>
                </div>
                <dir >
                    <DirectoriesList {...props}/>
                    <Contributions {...props}/>
                </dir>
                {indexError &&
                    <div className={classes.errorWrapper}>
                        <Typography className={classes.errorMessage}>
                            {indexError.message}
                        </Typography>
                    </div>
                }
                {statsError &&
                    <div className={classes.errorWrapper}>
                        <Typography className={classes.errorMessage}>
                            {statsError.message}
                        </Typography>
                    </div>
                }
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        isIndexFetching: isIndexFetching(state),
        isOrgDirectoriesFetching: isOrgDirectoriesFetching(state),
        directories: directories(state),
        orgDirectories: orgDirectories(state),
        indexError: indexError(state),
        statsError: statsError(state),
        orgError: orgError(state),
        organizationItem: selectOrganizationItem(state),
        web3: selectWeb3(state),
        walletAddress: selectSignInAddress(state)
    }
};

const mapDispatchToProps = {
    setOrgId
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicDirectories);
