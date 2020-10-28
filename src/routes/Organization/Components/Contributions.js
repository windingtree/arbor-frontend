import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from "../../../styles/colors";

const styles = makeStyles({
    titleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    dirListIcon: {
        position: 'absolute',
        marginLeft: '-38px'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorMessage: {
        fontSize: '16px',
        color: '#F0806E'
    },
    hLine: {
        width: '100%',
        borderTop: `1px dotted rgb(143, 153, 159)`,
        marginBottom: '20px'
    }
});

export default props => {
    const classes = styles();
    const {
        orgError,
        isIndexFetching,
        isOrgDirectoriesFetching,
        directories,
        orgDirectories,
        web3,
        walletAddress
    } = props;
    const [error, setError] = useState(null);
    const [parsedDirectories, setParsedDirectories] = useState([]);

    const parseDirectories = useCallback(() => {
        return [];
    }, []);

    useEffect(() => {
        setParsedDirectories(parseDirectories());
    }, [parseDirectories]);

    return (
        <>
            <div className={classes.hLine}></div>
            <div className={classes.titleWrapper}>
                <Typography variant={'inherit'}>Fees and Rewards</Typography>
            </div>
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
                            Fees and Rewards list is loading...
                        </Typography>
                    </Grid>
                </Grid>
            }
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.map((directory, dirIndex) => (
                <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    key={dirIndex}
                >
                    <Grid item xs={2}>
                        <img
                            width='16px'
                            height='16px'
                            className={classes.dirListIcon}
                            alt={directory.title}
                            src={directory.icon}
                        />
                        {directory.title}
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            ))}
            {!isIndexFetching &&
            !isOrgDirectoriesFetching &&
            parsedDirectories.length === 0 &&
                <Typography>
                    No fees or rewards are available for withdrawal
                </Typography>
            }
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
