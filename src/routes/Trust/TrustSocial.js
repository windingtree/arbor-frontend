import React, {useState} from "react";
import history from '../../redux/history';

import {Container, Typography, Grid, Card, Box, Button} from '@material-ui/core';
import ArrowLeftIcon from '../../assets/SvgComponents/ArrowLeftIcon';


import {makeStyles} from '@material-ui/core/styles';

import verifySocialMediaSvg from '../../assets/SvgComponents/verify-social-media.svg';
import facebookIconSvg from '../../assets/SvgComponents/facebook-icon.svg';
import instagramIconSvg from '../../assets/SvgComponents/instagram-icon.svg';
import twitterIconSvg from '../../assets/SvgComponents/twitter-icon.svg';
import listPlaceholderSvg from '../../assets/SvgComponents/list-placeholder.svg';
import twitterBig from '../../assets/SvgComponents/twitter-big.svg';

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
    topWithCards: {
        position: 'relative',
        zIndex: 1
    },
    backButtonWrapper: {
        marginLeft: '-8px'
    },
    backButtonLabel: {
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
    socialAddressCard: {
        padding: '20px',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 10px 10px 0',
    },
    socialCardIcon: {
        marginRight: "15px"
    },
    link: {
        color: colors.secondary.peach,
        fontWeight: 500
    },
    topSectionText: {
        color: colors.greyScale.dark,
        margin: '25px 0 20px 0',
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
    paragraph: {
        marginTop: '23px',
        lineHeight: '28px',
        color: colors.greyScale.dark,
    },
    howSection: {
        padding: '125px 0 106px 0',
        alignItems: 'center'
    },
    stepsCardsWrapper: {
        width: '50%',
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
    useCasesControllers: {
        marginTop: '36px'
    },
    controllerItem: {
        position: 'relative',
        left: '-12px',
    },
    activeController: {
        '& button': {
            color: colors.primary.accent
        },
        '& > span': {
            width: '36px'
        }
    },
    controllerButton: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 1.1,
        backgroundColor: 'transparent',
        letterSpacing: '.009em',
        outline: 'none',
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: colors.greyScale.common,
        transition: 'color .3s ease'
    },
    controllerLine: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '2px',
        width: '0',
        marginRight: '12px',
        backgroundColor: colors.primary.accent,
        transition: 'width .3s ease'
    },

    buttonVerify: {
        display: 'block',
        margin: '50px auto 0 auto',
        backgroundImage: colors.gradients.orange,
        boxShadow: '0 2px 12px rgba(12, 64, 78, 0.1)',
        border: `1px solid ${colors.primary.accent}`,
        borderRadius: '8px'
    },
    buttonVerifyTitle: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
        color: colors.primary.white,
        textTransform: 'none',
        padding: '4px 14px'
    }
});


function TrustSocial(props) {

    const classes = styles();
    const [activeSocial, setActiveSocial] = useState(0);

    const socialsControllers = [
        'Twitter',
        'Facebook',
        'Instagram',
    ];


    const renderSocialsControllers = () => {
        const controllers = socialsControllers.map((item, index) => {
            return (

                <li className={index === activeSocial ? classes.activeController : classes.controllerItem}
                    key={index.toString()} style={{margin: '8px 0'}}>
                    <span className={classes.controllerLine}/>
                    <button
                        className={classes.controllerButton}
                        onClick={handleChangeActiveSocial}
                    >
                        {item}
                    </button>
                </li>
            )
        });

        return (
            <ul className={classes.socialsControllers}>{controllers}</ul>
        )
    };

    const renderStepsList = (steps) => {
        let listItems = [...steps.map((text) => <li className={classes.howTextListItem}>
                <span className={classes.howListDot}/>
                <Typography className={classes.howListTexts}>{text}</Typography>
            </li>
        )];

        let listItemsWithPlaceholders = [];

        for (let i = 0; i < listItems.length; i++) {
            listItemsWithPlaceholders.push(listItems[i]);
            if (i !== listItems.length - 1) {
                listItemsWithPlaceholders.push(<div><img className={classes.howListPlaceholder}
                                                         src={listPlaceholderSvg}  alt={"|"}/>
                </div>)
            }
        }

        return listItemsWithPlaceholders;
    };

    const handleChangeActiveSocial = (e) => {
        const item = e.target.innerHTML;
        const itemIndex = socialsControllers.indexOf(item);

        if (activeSocial === itemIndex) return;
        setActiveSocial(itemIndex);
    };

    return (
        <div>
            <div className={classes.topDiv}>
                <Container className={classes.topSectionWrapper}
                           style={{backgroundColor: colors.greyScale.moreLighter}}>
                    <Box className={classes.screenHeader}>
                        <div className={classes.backButtonWrapper}>
                            <Button onClick={history.goBack}>
                                <Typography className={classes.backButtonLabel}>
                                    <ArrowLeftIcon viewBox={'0 0 13 12'} className={classes.backButtonIcon}/>
                                    Back to all organizations
                                </Typography>
                            </Button>
                        </div>
                    </Box>
                    <Grid item style={{width: '65%'}}>
                        <div className={classes.topWithCards}>
                            <Typography className={classes.mainTitle} variant={'h1'}>Verify your social
                                media</Typography>
                            <Box>
                                <Card className={classes.socialAddressCard}>
                                    <img className={classes.socialCardIcon} src={facebookIconSvg} alt={"fb"}/>
                                    <Typography>
                                        /legal entity profile</Typography></Card>
                                <Card className={classes.socialAddressCard}>
                                    <img className={classes.socialCardIcon} src={twitterIconSvg} alt={"tw"}/>
                                    <Typography>
                                        /legal entity profile</Typography></Card>
                                <Card className={classes.socialAddressCard}>
                                    <img className={classes.socialCardIcon} src={instagramIconSvg} alt={"ig"}/>
                                    <Typography>
                                        /legal entity profile</Typography></Card>
                            </Box>
                            <Typography className={classes.topSectionText}>Your social media accounts are the main
                                source of corporate news and announcements. Increase your trust level with every
                                verified account.</Typography>
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.illustrationWrapper}>
                            <img src={verifySocialMediaSvg} alt={'illustration'}/>
                        </div>
                    </Grid>
                </Container>
            </div>
            <Container className={classes.howSection}>
                <div>
                    <Grid container justify={'space-between'}>
                        <Grid className={classes.stepsCardsWrapper}>
                            <Typography className={classes.paragraph}>Copy specific messages for Twitter, Instagram and
                                Facebook and post them on behalf of your corporate profiles. Follow specific
                                instructions for each network.
                            </Typography>
                            {renderSocialsControllers()}
                        </Grid>
                        <Grid style={{width: '45%'}}>
                            <Box justify='space-between'>
                                <Typography>
                                    {props.socials[activeSocial].title}
                                </Typography> <img src={props.socials[activeSocial].logo} alt={"logo"}/>
                            </Box>
                            <ul style={{marginTop: '42px'}}>
                                {renderStepsList(props.socials[activeSocial].steps)}
                            </ul>
                            <Button className={classes.buttonVerify}>
                                <Typography variant={'subtitle2'} noWrap className={classes.buttonVerifyTitle}>
                                    Verify Twitter
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

TrustSocial.defaultProps = {
    socials: [
        {
            logo: twitterBig,
            title: "Verify your Twitter account",
            steps: [
                "Click on Verify Twitter button",
                "Your Twitter account will pop up with a draft message",
                "Post this message to your feed",
                "Congratulations, your account is verified!"
            ],
            button: "Verify Twitter"
        },
        {
            logo: twitterBig,
            title: "Verify your Facebook account",
            steps: [
                "Click on Verify Facebook button",
                "Your Facebook account will pop up with a draft message",
                "Post this message to your feed",
                "Congratulations, your account is verified!"
            ],
            button: "Verify Facebook"
        },
        {
            logo: twitterBig,
            title: "Verify your Instagram account",
            steps: [
                "Click on Verify Instagram button",
                "Your Instagram account will pop up with a draft message",
                "Post this message to your feed",
                "Congratulations, your account is verified!"
            ],
            button: "Verify Instagram"
        }
    ]
};

export default TrustSocial;