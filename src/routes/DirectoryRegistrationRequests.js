import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from '../redux/history';

import { Container, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';

import ArrowLeftIcon from '../assets/SvgComponents/ArrowLeftIcon';
import OrgsGridItem from '../components/OrgsGridItem';
import CardsGridList from '../components/CardsGridList';

import {
    getArbDirContract
} from '../ducks/utils/ethereum';
import { api } from '../redux/api';

import {
    selectWeb3
} from '../ducks/signIn';

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
    }
});

const fetchRequests = async (web3, directoryId) => {
    const dir = getArbDirContract(web3, directoryId);
    const total = Number(await dir.methods.getRequestedOrganizationsCount(0, 0).call());
    let organizations = [];
    if (total > 0) {
        organizations = await dir.methods.getRequestedOrganizations(0, 0).call();
    }
    return {
        total,
        organizations
    };
};

const fetchOrganizations = async (organizationsIds) => {
    return Promise.all(organizationsIds.map(orgId => api(`orgids/${orgId}`)));
};

const CardsList = ({ organizations, classes }) => (
    <CardsGridList
        spacing={3}
        justify='flex-start'
        alignItems='flex-start'
    >
        <>
            {organizations.length === 0 &&
                <Typography className={classes.noRequestsNote}>
                    There are no registration requests
                </Typography>
            }
            {organizations.map((item, i) => (
                <Grid item lg={3} sm={4} xs={12} key={i}>
                    <OrgsGridItem organization={item}/>
                </Grid>
            ))}
        </>
    </CardsGridList>
);

const RegistrationRequests = props => {
    const classes = styles();
    const {
        web3
    } = props;
    const { directoryId } = useParams();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [organizationsTotal, setOrganizationsTotal] = useState(0);

    useEffect(() => {
        setError(null);
        const getOrganizations = async () => {
            const requests = await fetchRequests(web3, directoryId);
            const organizations = await fetchOrganizations(requests.organizations);
            console.log(organizations);
            setOrganizationsTotal(requests.total);
            setOrganizations(organizations.map(org => ({
                ...org.data,
                directory: 'ota'
            })));
        };
        try {
            getOrganizations();
        } catch (error) {
            setError(error);
        }
    }, [web3, directoryId]);

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
                            Registration Requests
                        </Typography>
                    </div>
                </div>
            </Container>
            <Container>
                <div className={classes.orgListWrapper}>
                    <CardsList
                        organizations={organizations}
                        classes={classes}
                    />
                </div>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        web3: selectWeb3(state)
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationRequests);
