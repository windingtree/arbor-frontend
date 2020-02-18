import React from 'react';
import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import history from '../../redux/history';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';
import trustTopIllustation from '../../assets/SvgComponents/trust-g-top.svg';
import cardWebsiteIllustration from '../../assets/SvgComponents/trust-g-website.svg';
import cardTwitterIllustration from '../../assets/SvgComponents/trust-g-twitter.svg';
import cardLockIllustration from '../../assets/SvgComponents/trust-g-lock.svg';
import cardLifIllustration from '../../assets/SvgComponents/trust-g-lif.svg';
import MetamaskIllustration from '../../assets/SvgComponents/trust-metamask-illustration.svg';

import colors from '../../styles/colors';

const styles = makeStyles({
    topDiv: {
        backgroundColor: colors.secondary.yellowLight
    },
    topSectionWrapper: {
        padding: '57px 40px 135px 40px',
    },
    mainTitle: {
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: 1.14,
        color: colors.greyScale.darkest,
        margin: '85px 0 40px 0'
    },
    topText: {
        color: colors.greyScale.dark,
        marginBottom: '19px',
        lineHeight: '28px'
    },
    topIllustrationWrapper: {
        position: 'absolute',
        top: '95px',
        right: '258px'
    },
    line: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '2px',
        width: '36px',
        marginRight: '12px',
        backgroundColor: colors.primary.accent,
    },
    blockTitle: {
        lineHeight: '44px',
        fontSize: '32px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
    },
    partnersSection: {
        padding: '118px 0 106px 0',
    },
    verificationsWrapper: {
        width: '50%',
        height: 'min-content',
        margin: '43px 0 0 0',
    },
    verification: {
        fontSize: '18px',
        lineHeight: '28px',
        fontWeight: 500,
        padding: '5px 25px 5px 10px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '220px',
        height: '130px',
        backgroundColor: colors.primary.white,
        borderRadius: '6px',
        boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
    },
    verificationIcon: {
        margin: '50px 15px 0 15px',
        alignSelf: 'flex-start'
    },
    paragraph: {
        marginTop: '23px',
        lineHeight: '28px',
        color: colors.greyScale.dark,
    },
    partnersTextListDot: {
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
    partnersTextListItem: {
        position: 'relative',
        marginBottom: '16px',
    },
    partnersTextListTexts: {
        marginLeft: '23px',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.greyScale.dark,
    },
    moreVerifiedSectionDiv: {},
    metamaskIllustration: {
        position: 'absolute',
        top: '-36px',
        right: '38px'
    },
    metamaskIllustrationWrapper: {
        width: '55%',
        position: 'relative'
    },
});

function TrustGeneral(props) {
    const classes = styles();


    return (

        <div>
            <div className={classes.topDiv}>
                <Container className={classes.topSectionWrapper}>
                    <Grid item style={{width: '50%'}}>
                        <div><Typography className={classes.mainTitle} variant={'h1'}>How can I prove that my company is
                            <b style={{color: colors.secondary.peach}}> trustworthy</b>
                        </Typography>
                            <Typography className={classes.topText}>Why are you here? Probably, you own a business or
                                work at a company that wants to participate in the global economy and find reliable
                                partners to scale and prosper.</Typography>
                            <div className={classes.line}/>
                        </div>
                    </Grid>
                    <Grid>
                        <div className={classes.topIllustrationWrapper}>
                            <img src={trustTopIllustation} alt={'illustration'}/>
                        </div>
                    </Grid>
                </Container>
            </div>
            <Container className={classes.partnersSection}>
                <div>
                    <Grid container justify={'space-between'}>
                        <Grid item container spacing={2} className={classes.verificationsWrapper}>
                            <Grid item>
                                <Card className={classes.verification}>
                                    <img className={classes.verificationIcon} src={cardWebsiteIllustration}
                                         alt={'img'}/>
                                    <Typography>Website ownership</Typography>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.verification}>
                                    <img className={classes.verificationIcon} src={cardTwitterIllustration}
                                         alt={'img'}/>
                                    <Typography>Social media verification</Typography>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.verification}>
                                    <img className={classes.verificationIcon} src={cardLockIllustration} alt={'img'}/>
                                    <Typography>Legal entity verification</Typography>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card className={classes.verification}>
                                    <img className={classes.verificationIcon} src={cardLifIllustration} alt={'img'}/>
                                    <Typography>Líf deposit submission</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item style={{width: '45%'}}>
                            <Typography className={classes.paragraph}>In a literally borderless digital world where
                                companies emerge and vanish as we speak, how can you be confident in your business
                                partners?
                            </Typography>
                            <Typography className={classes.paragraph}>
                                In most cases, you need to perform a lengthy KYB check to confirm that a company is
                                registered in a certain country or region, is engaged in a certain type of legitimate
                                business and is represented by a real affiliated employee.
                            </Typography>
                            <Typography className={classes.paragraph}>Doing KYB checks on your own is slow and expensive
                                Less so, when you work with intermediaries, but it exposes yourself to the risk of yours
                                and your partner’s business information being leaked or misused.</Typography>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <div className={classes.moreVerifiedSectionDiv}>
                <Container>
                    <Grid container wrap={'nowrap'}>
                        <Grid item className={classes.metamaskIllustrationWrapper}>
                            <img src={MetamaskIllustration} alt={'illustration'}
                                 className={classes.metamaskIllustration}/>
                        </Grid>
                        <Grid item style={{width: '50%'}}>
                            <Typography variant={'h3'} className={classes.blockTitle}>
                                More verification methods are on their way!
                            </Typography>
                            <Typography className={classes.paragraph}>
                                We will soon introduce a few more verification methods. Next on our list are verifiable
                                credentials from countries that have developed encryption laws and policies, as well as
                                credentials from certification authorities in different industries.
                            </Typography>
                            <Typography className={classes.paragraph}>
                                If you represent one of those certification authorities, you can offer Arbor community
                                an option to use your credentials on the platform. To do so, create your organization
                                profile on Arbor and start signing credentials you issue.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default TrustGeneral;
