import React from "react";
import {Card, Badge, Grid, Button} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';


const styles = makeStyles({
    orgIdGrid: {
        padding: '28px'
    },
    avatar: {
        width: '48px',
        height: '48px',
        background: 'blue'
    },
    badge: {
        background: 'red',
        borderRadius: '5px',
    },
    subOrgDropdown: {
        display: 'flex',
        justifyContent: 'space-between'

    }
});

const SubOrganizationCard = (props) => {
    const {isSub, segment} = props;
    console.log(isSub);
    const classes = styles(); //TODO research is it needed to be called on each render
    return <Card>
        {isSub ?
            <div>
                <Badge className={classes.badge}>SUBORD</Badge>
                {segment ?
                    <div>{segment}</div>
                    :
                    null
                }
            </div>
            :
            <div>
                Legal entity{typeof subs === "number" ?
                <span>include Sub-Ord</span>
                :
                null}
            </div>
        }</Card>
};


const OrgIdGridItem = (props) => {
    const {name, address, isSub, subs, segment, trustLevel} = props;
    const classes = styles();
    console.log("isSub:" + isSub);
    const firstFourSubs = subs.slice(0, 4);
    return (
        <Card className={classes.orgIdGrid}>
            <Grid justify="space-between" container>
                <Grid>
                    <div className={classes.avatar}>AVA</div>
                    <Grid>
                        <div>{name}</div>
                        <div>{address}</div>
                    </Grid>
                </Grid>
                <div>

                    <div>Trust level: {trustLevel}</div>
                    <Button>Add organization</Button>
                </div>
            </Grid>
            <Grid>
                {subs.length > 0 ?
                    <div>
                        <div className={classes.subOrgDropdown}>
                            <h2>Suborganization{subs.length > 1 ? `s (${subs.length})` : ""}</h2>
                            <div>Arrow down</div>
                        </div>
                        {subs.map(sub => <SubOrganizationCard isSub={sub.isSub}/>)}
                    </div> :
                    <div><Button>Add suborganization</Button></div>
                }
            </Grid>
        </Card>
    )
};

export default OrgIdGridItem;
