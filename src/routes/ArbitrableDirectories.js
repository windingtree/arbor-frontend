import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../redux/history';

import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';
import CardsGridList from '../components/CardsGridList';

import {
    indexRequest,
    statsRequest,
    indexError,
    statsError,
    isIndexFetching,
    isStatsFetching,
    directories,
    stats
} from '../ducks/directories';

const styles = makeStyles({
    content: {
        padding: '64px 0'
    },
    progressWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    cardsLoader: {
        margin: 'auto auto'
    },
    title: {
        fontWeight: 500,
        fontSize: '32px',
        lineHeight: 1.14,
        color: colors.greyScale.darkest,
        marginBottom: '40px'
    },
    error: {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: 1.14,
        color: colors.primary.accent
    },
    actionContainer: {
        position: 'relative',
        borderRadius: '6px',
        backgroundColor: colors.primary.white,
        boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
        marginTop: '10px',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
          boxShadow: 'none'
        }
    },
    actionContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 24px',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
          flexWrap: 'wrap',
          padding: '0'
        }
    },
    actionTitle: {
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: 1.14,
        color: colors.greyScale.darkest,
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            marginTop: '32px',
            marginBottom: '24px'
        }
    },
    actionButton: {
        backgroundImage: colors.gradients.green,
        borderRadius: '6px',
        textTransform: 'none',
        color: colors.primary.white,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '24px',
        padding: '14px 26px'
    },
    actionGrid: {
        ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: 'column'
        }
    },
    item: {
        position: 'relative',
        width: '100%',
        height: '200px',
        borderRadius: '6px',
        boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)',
        transition: 'background-color .3s ease, box-shadow .3s ease'
    },
    cardButton: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    cardContent: {
        height: '100%',
        width: '100%',
        marginTop: '24px'
    },
    directoryContainer: {
        paddingBottom: '24px',
    },
    directoryTitle: {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '26px',
        color: colors.greyScale.dark,
        textTransform: 'none',
        textAlign: 'left',
        ['@media (max-width: 767px)']: { // eslint-disable-line no-useless-computed-key
            marginTop: 0,
            marginLeft: '10px'
        }
    },
    directoryImageWrapper: {
        position: 'relative',
        height: '64px',
        width: '64px',
        overflow: 'hidden',
        margin: '0 auto'
    },
    directoryImage: {
        width: '100%',
        height: '100%'
    },
    directoryInfoLabel: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '26px',
        color: colors.greyScale.dark,
        textTransform: 'none',
        textAlign: 'left',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }
});

const DirectoryCard = props => {
    const classes = styles();
    const {
        title,
        address,
        icon,
        index,
        isStatsFetching,
        stats,
    } = props;

    const [statsData, setStatsData] = useState({});

    useEffect(() => {
        if (stats.length > 0) {
            setStatsData(stats[index]);
        }
    }, [stats, index]);

    const handleDirectoryOptionClick = (e, directoryAddress, type) => {
        e.preventDefault();

        switch (type) {
            case 'entities':
                history.push(`/directories/registered/${directoryAddress}`, {follow: `/directories/registered/${directoryAddress}`});
                break;
            case 'requests':
                history.push(`/directories/requests/${directoryAddress}`, {follow: `/directories/requests/${directoryAddress}`});
                break;
            case 'disputes':
                history.push(`/directories/disputes/${directoryAddress}`, {follow: `/directories/disputes/${directoryAddress}`});
                break;
            default:
        }
    };

    return (
        <Card className={classes.item}>
            <Button
                className={classes.cardButton}
            >
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        direction='row'
                        wrap='nowrap'
                        alignItems='flex-start'
                        alignContent='stretch'
                        justify='space-between'
                        className={classes.directoryContainer}
                        onClick={e => handleDirectoryOptionClick(e, address, 'entities')}
                    >
                        <Grid item>
                            <Typography
                                variant={'subtitle2'}
                                className={classes.directoryTitle}
                            >{title}</Typography>
                        </Grid>
                        <Grid item>
                            {icon &&
                                <div className={classes.directoryImageWrapper}>
                                    <img src={icon} alt={title} className={classes.directoryImage}/>
                                </div>
                            }
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='column'
                        alignItems='flex-start'
                        alignContent='stretch'
                    >
                        {isStatsFetching &&
                            <Grid item>
                                <CircularProgress
                                    size='24px'
                                />
                            </Grid>
                        }
                        {!isStatsFetching &&
                            <>
                                <Grid item>
                                    <Typography
                                        onClick={e => handleDirectoryOptionClick(e, address, 'entities')}
                                        className={classes.directoryInfoLabel}
                                    >
                                        {statsData.entities}&nbsp;
                                        Entities
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        onClick={e => handleDirectoryOptionClick(e, address, 'requests')}
                                        className={classes.directoryInfoLabel}
                                    >
                                        {statsData.numberOfRequests}&nbsp;
                                        Registration Requests
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        onClick={e => handleDirectoryOptionClick(e, address, 'disputes')}
                                        className={classes.directoryInfoLabel}
                                    >
                                        {statsData.numberOfChallenges}&nbsp;
                                        Ongoing Disputes
                                    </Typography>
                                </Grid>
                            </>
                        }
                    </Grid>
                </CardContent>
            </Button>
        </Card>
    );
};

const ActionBlock = props => {
    const classes = styles();
    const {
        isError,
        title,
        action,
        onClick
    } = props;

    return (
        <div className={classes.actionContainer}>
            <div className={classes.actionContent}>
                <Grid
                    container
                    direction='row'
                    alignItems='center'
                    alignContent='stretch'
                    justify='space-between'
                    className={classes.actionGrid}
                >
                    <Grid item>
                        <Typography
                            variant={'h3'}
                            className={isError ? classes.error : classes.actionTitle}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.actionButton}
                            onClick={onClick}
                        >
                            {action}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const Directories = props => {
    const classes = styles();
    const {
        indexRequest,
        statsRequest,
        isIndexFetching,
        indexError,
        statsError,
        directories
    } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <div className={classes.content}>
                <div>
                    <Typography
                        onClick={indexRequest}
                        variant={'h1'}
                        className={classes.title}
                    >
                        Directories
                    </Typography>
                </div>
                <div className={classes.cardsContainer}>
                    {isIndexFetching &&
                        <div className={classes.progressWrapper}>
                            <CircularProgress
                                className={classes.cardsLoader}
                                size='60px'
                            />
                        </div>
                    }
                    {!isIndexFetching &&
                        <CardsGridList spacing={2} justify={'space-between'} alignItems={'flex-start'}>
                            {directories.map((item, i) => (
                                <Grid item lg={3} sm={6} xs={12} key={i}>
                                    <DirectoryCard
                                        {...item}
                                        {...props}
                                        index={i}
                                    />
                                </Grid>
                            ))}
                        </CardsGridList>
                    }
                    {indexError &&
                        <ActionBlock
                            isError
                            title={indexError.message}
                            action={'Reload directories'}
                            onClick={indexRequest}
                        />
                    }
                    {statsError &&
                        <ActionBlock
                            isError
                            title={statsError.message}
                            action={'Reload directories statistic'}
                            onClick={statsRequest}
                        />
                    }
                </div>
                <ActionBlock
                    title={'Need more segments?'}
                    action={'Propose a new directory'}
                    onClick={() => window.open('https://forms.gle/GsVZYqPXJMbdkerF8', '_blank')}
                />
                {/* <ActionBlock
                    title={'All registrations requests'}
                    action={'Browse requests'}
                    onClick={() => console.log('Not implemented yet')}
                /> */}
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    isIndexFetching: isIndexFetching(state),
    isStatsFetching: isStatsFetching(state),
    indexError: indexError(state),
    statsError: statsError(state),
    directories: directories(state),
    stats: stats(state)
});

const mapDispatchToProps = {
    indexRequest,
    statsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
