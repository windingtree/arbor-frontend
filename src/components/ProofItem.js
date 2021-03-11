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
        alignItems: 'center',
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
        marginLeft: '27px',
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
        marginLeft: '27px',
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
        marginLeft: '27px',
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
    }
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
    switch (icon) {
        case 'globe':
            return <IconGlobe />;
        case 'facebook':
            return <IconFacebook />;
        case 'twitter':
            return <IconTwitter />;
        case 'instagram':
            return <IconInstagram />;
        case 'linkedin':
            return <IconLinkedin />;
        default:
            return <div />;
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
                {!assertion.proof &&
                    <Typography
                        onClick={!removed ? onClick : () => {}}
                        className={canManage ? classes.label : classes.labelPub}
                        classes={{ root: removed ? 'removed' : undefined }}
                    >
                        {title}
                    </Typography>
                }
                {assertion.proof &&
                    <Typography
                        className={classes.labelProof}
                    >
                        <a
                            href={assertion.proof}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={classes.adaptive}
                        >
                            <span className={'long'}>{title}</span>
                            <span className={'short'}>{strCenterEllipsis(title, 10)}</span>
                        </a>
                    </Typography>

                }
            </Grid>
            <Grid item xs={12} sm={5}>
                {(deployed && !verified) &&
                    <State classes={{ state: 'not-verified' }}>Not verified</State>
                }
                {(deployed && verified) &&
                    <State classes={{ state: 'verified' }}>Verified</State>
                }
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