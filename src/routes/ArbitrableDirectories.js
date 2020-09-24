import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';
import CardsGridList from '../components/CardsGridList';

import {
    fetchDirectories,
    isIndexFetching,
    isIndexFetched,
    indexError,
    directories
} from '../ducks/directories';
import { getSegmentMeta } from '../utils/directories';

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
    directoryTitle: {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '26px',
        color: colors.greyScale.dark,
        textTransform: 'none',
        textAlign: 'left',
        paddingTop: '10px',
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
    directoryInfoWrapper: {
        marginTop: '24px'
    },
    directoryInfoLabel: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '26px',
        color: colors.greyScale.dark,
        textTransform: 'none',
        textAlign: 'left',
    }
});

const DirectoryCard = props => {
    const classes = styles();
    const {
        title,
        address,
        icon,
        entities,
        numberOfChallenges
    } = props;

    return (
        <Card className={classes.item}>
            <Button
                className={classes.cardButton}
                onClick={() => console.log(address)}
            >
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        direction='row'
                        wrap='nowrap'
                        alignItems='flex-start'
                        alignContent='stretch'
                        justify='space-between'
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
                        className={classes.directoryInfoWrapper}
                    >
                        <Grid item>
                            <Typography className={classes.directoryInfoLabel}>
                                {entities}&nbsp;
                                Entities
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.directoryInfoLabel}>
                                {numberOfChallenges}&nbsp;
                                Ongoing Disputes
                            </Typography>
                        </Grid>
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
        fetchDirectories,
        isFetching,
        isFetched,
        error,
        directories
    } = props;
    const [parsedDirectories, setDirectories] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        setDirectories(
            directories.map(dir => getSegmentMeta(dir))
        );
    }, [directories]);

    return (
        <Container>
            <div className={classes.content}>
                <div>
                    <Typography variant={'h1'} className={classes.title}>
                        Directories
                    </Typography>
                </div>
                <div className={classes.cardsContainer}>
                    {isFetching &&
                        <div className={classes.progressWrapper}>
                            <CircularProgress
                                className={classes.cardsLoader}
                                size='60px'
                            />
                        </div>
                    }
                    {isFetched &&
                        <CardsGridList spacing={2} justify={'space-between'} alignItems={'flex-start'}>
                            {parsedDirectories.map((item, i) => (
                                <Grid item lg={3} sm={6} xs={12} key={i}>
                                    <DirectoryCard {...item} />
                                </Grid>
                            ))}
                        </CardsGridList>
                    }
                    {error &&
                        <ActionBlock
                            isError
                            title={error.message}
                            action={'Reload directories'}
                            onClick={fetchDirectories}
                        />
                    }
                </div>
                <ActionBlock
                    title={'Need more segments?'}
                    action={'Propose a new directory'}
                    onClick={() => window.open('https://forms.gle/GsVZYqPXJMbdkerF8', '_blank')}
                />
                <ActionBlock
                    title={'All registrations requests'}
                    action={'Browse requests'}
                    onClick={() => console.log('Not implemented yet')}
                />
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        isFetching: isIndexFetching(state),
        isFetched: isIndexFetched(state),
        error: indexError(state),
        directories: directories(state)
    }
};

const mapDispatchToProps = {
    fetchDirectories
};

export default connect(mapStateToProps, mapDispatchToProps)(Directories);
