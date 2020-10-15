import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from '../redux/history';

import { Container, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';

import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import DirectoryCardsList from '../components/DirectoryCardsList';

import {
    getArbDirContract
} from '../ducks/utils/ethereum';
import { api } from '../redux/api';

import {
    selectWeb3
} from '../ducks/signIn';
import {
    directories
} from '../ducks/directories';

const styles = makeStyles({
    pageNavigation: {
        padding: '60px 0 20px 0'
    },
    navButtonWrapper: {
        marginLeft: '-7px'
    },
    navButtonLabel: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1,
        textTransform: 'none',
        color: colors.primary.black
    },
    backButtonIcon: {
        width: '13px',
        height: '12px',
        verticalAlign: 'bottom',
        color: colors.primary.black,
        marginRight: '11px'
    },
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            flexWrap: 'wrap',
        },
    },
    pageTitle: {
        fontSize: '32px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    },
    orgListWrapper: {
        paddingTop: '30px',
        paddingBottom: '60px'
    },
    noRequestsNote: {
        marginLeft: '9px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    }
});

const fetchDisputes = async (web3, directoryId) => {
    const dir = getArbDirContract(web3, directoryId);
    const requestedOrganizations = await dir.methods.getRequestedOrganizations(0, 0).call();
    const registeredOrganizations = await dir.methods.getOrganizations(0, 0).call();
    const organizations = [...registeredOrganizations, ...requestedOrganizations];
    const challenges = await Promise.all(
        organizations
            .map(orgId => dir.methods.getNumberOfChallenges(orgId).call())
    );
    const disputedOrganizations = challenges
        .map((count, index) => ({
            orgId: organizations[index],
            challengesNumber: Number(count)
        }))
        .filter(org => org.challengesNumber > 0)
        .map(org => org.orgId);

    const total = disputedOrganizations.length;
    return {
        total,
        organizations: disputedOrganizations
    };
};

const fetchOrganizations = async (organizationsIds) => {
    return Promise.all(organizationsIds.map(orgId => api(`orgids/${orgId}`)));
};

const DirectoryDisputes = props => {
    const classes = styles();
    const {
        web3,
        directories
    } = props;
    const { directoryId } = useParams();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [directoryDetails, setDirectoryDetails] = useState(null);
    const [organizationsTotal, setOrganizationsTotal] = useState(0);

    useEffect(() => {
        setError(null);
        const getOrganizations = async () => {
            setIsLoading(true);
            const disputed = await fetchDisputes(web3, directoryId);
            const organizations = await fetchOrganizations(disputed.organizations);
            setOrganizationsTotal(disputed.total);
            setDirectoryDetails(directories.filter(d => d.address === directoryId)[0]);
            setOrganizations(organizations.map(org => org.data));
            setIsLoading(false);
        };
        try {
            getOrganizations();
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [web3, directories, directoryId]);

    return (
        <div>
            <Container>
                <div className={classes.pageNavigation}>
                    <div className={classes.navButtonWrapper}>
                        <Button onClick={() => history.push('/directories')}>
                            <Typography variant={'caption'} className={classes.navButtonLabel}>
                                <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                                Back to all directories
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div className={classes.pageHeader}>
                    <div>
                        <Typography variant={'h2'} className={classes.pageTitle}>
                            Disputes {directoryDetails ? `at ${directoryDetails.title}` : ''}
                        </Typography>
                    </div>
                </div>
            </Container>
            <Container>
                <div className={classes.orgListWrapper}>
                {isLoading &&
                    <CircularProgress size="32px" />
                }
                {!isLoading &&
                    <DirectoryCardsList
                        organizations={organizations}
                        classes={classes}
                    />
                }
                </div>
            </Container>
            {error &&
                <Container>
                    <div>
                        <Typography className={classes.errorMessage}>
                            {error.message}
                        </Typography>
                    </div>
                </Container>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        web3: selectWeb3(state),
        directories: directories(state)
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryDisputes);
