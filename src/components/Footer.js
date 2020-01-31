/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from '../assets/SvgComponents/Logo';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
    footer: {
        background: 'white',
        border: 0,
        color: 'black',
        padding: '36px 56px',
        marginTop: '20px',
        '& span': {
            marginBottom: '15px',
            marginRight: '5px'
        }
    },
    logo: {
        width: '89px',
        height: '32px'
    },
    iconRow: {
        flexDirection: 'row',
        display: 'flex'
    },
    socialIcon: {
        margin: '0 10px'
    }
});

const SocialIcon = (props) => {
    const classes = styles();
    return <div className={classes.socialIcon}>{props.children}</div>;

};


export default function Footer(props) {
    const classes = styles();
    return (
        <div id="app-footer" className={classes.footer}>
            <Grid container direction="row">
                <Grid item xs={2}>
                    <Logo viewBox={'0 0 90 32'} className={classes.logo}/>
                </Grid>
                <Grid container item xs={10}>
                    <Grid container>
                        <Grid container direction="column" item xs={3}>
                            <h3>Solutions</h3>
                            <span>Hotels</span>
                            <span>Avia</span>
                            <span>OTA</span>
                            <span>Insurance company</span>
                        </Grid>
                        <Grid container direction="column" item xs={3}>
                            <h3>Foundation</h3>
                            <span>About</span>
                            <span>Team</span>
                            <span>Events</span>
                            <span>Services</span>
                            <span>Roadmap</span>
                            <span>White paper</span>
                        </Grid>
                        <Grid container direction="column" item xs={3}>
                            <h3>Community</h3>
                            <span>Official page</span>
                            <span>Blog</span>
                            <span>Developer portal</span>
                            <span>Github</span>
                        </Grid>
                        <Grid container direction="column" item xs={3}>
                            <h3>Contacts</h3>
                            <span>Gubelstrasse 11, 6300 Zug, Switzerland</span>
                            <span>info@windingtree.com</span>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <span style={{marginRight: '50px'}}>Therms of use</span>
                            <span>Privacy Policy</span>
                        </Grid>
                        <Grid className={classes.iconRow}>
                            <SocialIcon>Icon1</SocialIcon>
                            <SocialIcon>Icon2</SocialIcon>
                            <SocialIcon>Icon3</SocialIcon>
                            <SocialIcon>Icon4</SocialIcon>
                            <SocialIcon>Icon5</SocialIcon>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};