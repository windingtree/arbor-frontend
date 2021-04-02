import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import IconDelete from './icons/IconDelete';
import IconGlobe from './icons/IconGlobe';
import IconFacebook from './icons/IconFacebook';
import IconTwitter from './icons/IconTwitter';
import IconInstagram from './icons/IconInstagram';
import IconLinkedin from './icons/IconLinkedin';
import {
    selectPendingState
} from '../ducks/wizard';
import { strCenterEllipsis } from '../utils/helpers';
import colors from "../styles/colors";
import ExternalUrlIcon from "../assets/SvgComponents/ExternalUrlIcon";
import {TrustBadgeChecked} from "../assets/SvgComponents/TrustLevelIcon";

const useStyles = makeStyles({
    item: {
        marginBottom: '8px',
        '&:last-child': {
            marginBottom: 0
        }
    },
    alignRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    adaptive: {
        '&> .long': {
            display: 'inherit'
        },
        '&> .short': {
            display: 'none'
        },
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
          '&> .long': {
            display: 'none'
          },
          '&> .short': {
            display: 'inherit'
          }
        }
    },
    label: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: 'black',
        textDecoration: 'underline',
        cursor: 'pointer',
        // marginLeft: '27px',
        '&.removed': {
            color: '#5E666A',
            textDecoration: 'none',
            cursor: 'auto'
        }
    },
    labelPub: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        color: 'black',
        textDecoration: 'none',
        cursor: 'auto',
        // marginLeft: '27px',
        '&.removed': {
            color: '#5E666A',
            textDecoration: 'none',
            cursor: 'auto'
        }
    },
    labelProof: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        textDecoration: 'none',
        color: '#969696',
        cursor: 'pointer',
        marginLeft: '2px',
        marginRight: '2px',
        '& a': {
            color: '#969696',
            textDecoration: 'none',
            '&:hover': {
                color: '#98CCB0',
                textDecoration: 'underline'
            }
        }
    },
    deleteBtn: {
        cursor: 'pointer'
    },
    deleteBtnDisabled: {
        cursor: 'auto',
        opacity: '0.5'
    },
    state: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '28px',
        marginLeft: '52px',
        color: 'black',
        '&.verified': {
            color: '#4E9D96'
        },
        '&.not-verified': {
            color: '#F8997A'
        },
        '&.not-deployed': {
            color: '#4E9D96'
        },
        '&.in-queue': {
            color: '#5E666A'
        }
    },
    progress: {
        marginLeft: '12px',
        marginBottom: '-4px',
        color: '#5E666A'
    },
    actionBlock: {
        display: 'flex',
        ['@media (max-width:767px)']: { // eslint-disable-line no-useless-computed-key
            justifyContent: 'flex-start',
            paddingLeft: '48px'
        }
    },
    proofVerificationStatusIcon: {
        height: '16px',
        color: colors.secondary.brightYellow,
        marginRight: '6px',
        verticalAlign:'middle'
    },
    externalUrlIcon: {
        height: '16px',
        marginRight: '6px',
        verticalAlign:'middle'
    },
});

const State = (props) => {
    const classes = useStyles(props);
    return (
        <Typography
            className={classes.state}
            component='span'
            noWrap
        >
            {props.children}
        </Typography>
    );
};

const ProofIcon = ({ icon }) => {
    const classes = useStyles();
    let iconElem;
    let text;
    switch (icon) {
        case 'globe':
            iconElem=<IconGlobe />;
            text='Website'
            break;
        case 'facebook':
            iconElem = <IconFacebook />;
            text='Facebook'
            break;
        case 'twitter':
            iconElem =<IconTwitter />;
            text='Twitter'
            break;
        case 'instagram':
            iconElem =<IconInstagram />;
            text='Instagram'
            break;
        case 'linkedin':
            iconElem =<IconLinkedin />;
            text='LinkedIn'
            break;
        default:
            iconElem = <div />;
            text=''
    }
    return (<>{iconElem}<Typography className={classes.labelPub} style={{marginLeft: '27px'}}>{text}</Typography></>);
}

//if proof is verified - shows badge with 'checkmark'
const ProofStatusBadge = ({verified=false  }) => {
    const classes = useStyles();
    if(verified){
        return <TrustBadgeChecked className={classes.proofVerificationStatusIcon}/>
    }
    return <></>
}


//icon with link to a proof
const ProofExternalLinkIcon = ({ url }) => {
    const classes = useStyles();
    if(!url)
        return (<></>)
    return (<a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className={classes.adaptive}>
        <ExternalUrlIcon className={classes.externalUrlIcon}/>
    </a>)
}

//proof title (either link or 'not connected')
const ProofTitle = ({  title, proof, removed, canManage, verified, deployed, onClick }) => {
    const classes = useStyles();
    if(!proof){
        return (
            <span style={{marginLeft: '52px'}}>
            <span
                onClick={!removed ? onClick : () => {}}
                className={canManage ? classes.label : classes.labelPub}>
                {title}
            </span></span>)
    }else{
        return (
            <span style={{marginLeft: '52px'}}>
                <ProofStatusBadge deployed={deployed} verified={verified}/>
                <span className={classes.labelProof}>
                <span className={classes.adaptive}>
                    <span className={'long'}>{title}</span>
                    <span className={'short'}>{strCenterEllipsis(title, 10)}</span>
                </span>
            </span>
            </span>)
    }
}

const ProofItem = props => {
    const {
        canManage,
        title,
        verified,
        deployed,
        assertion,
        removed,
        icon,
        onClick,
        onRemove,
        isRefreshing,
        pendingTransaction
    } = props;
    const classes = useStyles();

    return (
        <Grid className={classes.item} container justify='space-between' alignItems='center'>
            <Grid item xs={12} sm={6} className={classes.alignRow}>
                <ProofIcon icon={icon} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <ProofTitle title={title} canManage={canManage} proof={assertion.proof} removed={removed} verified={verified} deployed={deployed} onClick={onClick}/>
                {assertion.proof && <ProofExternalLinkIcon url={assertion.proof}/>}

{/*
                {(deployed && !verified) &&
                    <State classes={{ state: 'not-verified' }}>Not verified</State>
                }
                {(deployed && verified) &&
                    <State classes={{ state: 'verified' }}>Verified</State>
                }
*/}
                {/* {(deployed && assertion.proof && assertion.type === 'domain' && sslVerified) &&
                    <State classes={{ state: 'verified' }}>, SSL verified</State>
                }
                {(deployed && assertion.proof && assertion.type === 'domain' && !sslVerified) &&
                    <State classes={{ state: 'not-verified' }}>, SSL not verified</State>
                } */}
                {removed &&
                    <State classes={{ state: 'not-verified' }}>
                        Removed
                    </State>
                }
                {((!deployed && assertion.type) || removed) &&
                    <State classes={{ state: 'in-queue' }}>
                        {(pendingTransaction || isRefreshing) &&
                            <CircularProgress
                                className={classes.progress}
                                variant='indeterminate'
                                size={18}
                                thickness={4}
                            />
                        }
                        {(!pendingTransaction && !isRefreshing) &&
                            <>{deployed || removed ? ', ': ''}In Queue</>
                        }
                    </State>
                }
            </Grid>
            <Grid item xs={12} sm={1} justify='flex-end' className={classes.actionBlock}>
                {((deployed || removed) && canManage) &&
                    <IconDelete
                        className={
                            !removed
                            ? classes.deleteBtn
                            : classes.deleteBtnDisabled
                        }
                        onClick={
                            !removed
                            ? () => onRemove(assertion)
                            : () => {}
                        }
                    />
                }
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        pendingTransaction: selectPendingState(state)
    };
  };

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProofItem);