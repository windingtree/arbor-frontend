import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import CardsGridList from './CardsGridList';
import OrgsGridItem from './OrgsGridItem';

export default ({ organizations, classes }) => (
    <CardsGridList
        spacing={3}
        justify='flex-start'
        alignItems='flex-start'
    >
        <>
            {organizations.length === 0 &&
                <Typography className={classes.noRequestsNote}>
                    There are no organizations in this list
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
