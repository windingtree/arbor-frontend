import React, {useState} from "react";
import history from '../../redux/history';

import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';


import {makeStyles} from '@material-ui/core/styles';

import verifyWebsiteSvg from '../../assets/SvgComponents/verify-your-website.svg';
import globeIconSvg from '../../assets/SvgComponents/globe-icon.svg';
import listPlaceholderSvg from '../../assets/SvgComponents/list-placeholder.svg';

import colors from '../../styles/colors';

const styles = makeStyles({
    topDiv: {
        backgroundColor: colors.greyScale.moreLighter
    },
    topSectionWrapper: {
        padding: '30px 40px 65px 40px',
    },
    screenHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonWrapper: {
        marginLeft: '-8px'
    },
    buttonLabel: {
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
    mainTitle: {
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: 1.14,
        color: colors.greyScale.darkest,
        margin: '46px 0 15px 0'
    },
    websiteAddressCard: {
        padding: '20px',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '35px',
        width: 'min-content',
    },
    websiteAddressGlobe: {
        marginRight: "15px"
    },
    link: {
        color: colors.secondary.peach,
        fontWeight: 500
    },
    topSectionText: {
        color: colors.greyScale.dark,
        marginBottom: '19px',
        lineHeight: '28px'
    },
    illustrationWrapper: {
        position: 'absolute',
        top: '93px',
        right: '276px'
    },
    line: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '2px',
        width: '36px',
        marginRight: '12px',
        backgroundColor: colors.primary.accent,
    },
    cardTitle: {
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
    },
    howSectionTitle: {
        lineHeight: '44px',
        fontSize: '32px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
    },
    paragraph: {
        marginTop: '23px',
        lineHeight: '28px',
        color: colors.greyScale.dark,
    },
    howSection: {
        padding: '125px 0 106px 0',
        alignItems: 'center'
    },
    howWorksCardsWrapper: {
        display: 'flex',
        marginTop: '30px',
        justifyContent: 'space-around'
    },
    howWorksCards: {
        padding: '35px 60px',
        backgroundColor: colors.primary.white,
        borderRadius: '6px',
        boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
    },
    howListDot: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        content: '""',
        backgroundColor: colors.secondary.peach,
        fontWeight: 'bold',
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '12px',
        border: '12px',
    },
    howTextListItem: {
        position: 'relative',
        //marginBottom: '16px',
    },
    howListTexts: {
        marginLeft: '23px',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '28px',
        color: colors.greyScale.dark,
    },
    howListPlaceholder: {
        height: '15px',
        marginLeft: '3px'
    },
    downloadButton: {
        display: 'block',
        margin: '50px auto 0 auto',

        backgroundImage: colors.gradients.orange,
        boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
        border: `1px solid ${colors.primary.accent}`,
        borderRadius: '8px'
    },
    downloadButtonTitle: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
        color: colors.primary.white,
        textTransform: 'none',
        padding: '4px 14px'
    }
});


function TrustWebsite(props) {

    const classes = styles();

    return (
        <div>
            <div className={classes.topDiv}>
                <Container className={classes.topSectionWrapper}
                           style={{backgroundColor: colors.greyScale.moreLighter}}>
                    <Box className={classes.screenHeader}>
                        <div className={classes.buttonWrapper}>
                            <Button onClick={history.goBack}>
                                <Typography className={classes.buttonLabel}>
                                    <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                                    Back to all organizations
                                </Typography>
                            </Button>
                        </div>
                    </Box>
                    <Grid item style={{width: '50%'}}>
                        <div><Typography className={classes.mainTitle} variant={'h1'}>Verify your website </Typography>
                            <Card className={classes.websiteAddressCard}>
                                <img className={classes.websiteAddressGlobe} src={globeIconSvg}/>
                                <Typography className={classes.link}>
                                    http://userwebsitexample.com/</Typography></Card>
                            <Typography className={classes.topSectionText}>Most users get acquainted with companies via
                                their
                                websites. Prove that you are a proud owner of your corporate website in a few
                                steps.</Typography>
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.illustrationWrapper}>
                            <img src={verifyWebsiteSvg} alt={'illustration'}/>
                        </div>
                    </Grid>
                </Container>
            </div>
            <Container className={classes.howSection}>
                <Container>
                    <Typography className={classes.howSectionTitle}>
                        How it works
                    </Typography>
                    <Typography className={classes.paragraph}>Choose one of these ways to verify your ownership:
                    </Typography>
                    <Container className={classes.howWorksCardsWrapper}>
                        <Card className={classes.howWorksCards}>
                            <Typography className={classes.cardTitle}>
                                Host a TXT file
                            </Typography>
                            <ul style={{marginTop: '42px'}}>
                                <li className={classes.howTextListItem}>
                                    <span className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Click on the button and
                                        download a
                                        TXT file</Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>


                                <li className={classes.howTextListItem}><span
                                    className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Upload it to your
                                        server</Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>


                                <li className={classes.howTextListItem}><span
                                    className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Make sure it's accessible from
                                        the
                                        root directory</Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>


                                <li className={classes.howTextListItem}>
                                    <spa className={classes.howListDot}/>
                                    <Typography
                                        className={classes.howListTexts}><a className={classes.link} href="#">http(s)://example.com/org.id</a></Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>


                                <li className={classes.howTextListItem}>
                                    <spa className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Congratulations, your website
                                        is
                                        verified!</Typography>
                                </li>
                            </ul>
                        </Card>
                        <Card className={classes.howWorksCards}>
                            <Typography className={classes.cardTitle}>
                                Set a DNS record
                            </Typography>
                            <ul style={{marginTop: '42px'}}>
                                <li className={classes.howTextListItem}>
                                    <span className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Click on the button and
                                        download a
                                        TXT file</Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>


                                <li className={classes.howTextListItem}><span
                                    className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Paste info to DNS zone exactly as it
                                        appears</Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>

                                <li className={classes.howTextListItem}><span
                                    className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}><a className={classes.link} href="#">http(s)://example.com/org.id</a></Typography>
                                </li>

                                <li><img className={classes.howListPlaceholder} src={listPlaceholderSvg}/></li>

                                <li className={classes.howTextListItem}>
                                    <spa className={classes.howListDot}/>
                                    <Typography className={classes.howListTexts}>Congratulations, your website
                                        is
                                        verified!</Typography>
                                </li>
                            </ul>
                        </Card>
                    </Container>
                </Container>
                <Box>
                    <Button
                        className={classes.downloadButton}>
                        <Typography variant={'subtitle2'} noWrap className={classes.downloadButtonTitle}>
                            Download file
                        </Typography>
                    </Button>
                </Box>
            </Container>
        </div>
    )
}


export default TrustWebsite;