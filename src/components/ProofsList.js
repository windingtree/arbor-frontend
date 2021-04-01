import React, { useState } from 'react';
import { connect } from 'react-redux';
import history from '../redux/history';
import { Container, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ProofItem from './ProofItem';
import LifDepositValue from './LifDepositValue';
import ProofsWizard from './ProofsWizard';
import ProofsSaver from './ProofsSaver';
import RefreshButton from './buttons/Refresh';
import CancelButton from './buttons/Cancel';
import SaveButton from './buttons/Save';
import {
    fetchOrganizationInfo,
    fetchOrganizationInfoWithRefresh
} from '../ducks/fetchOrganizationInfo';
import {
    removeAssertion,
    resetTransactionStatus
} from '../ducks/wizard';
import iconInfo from '../assets/SvgComponents/info.svg';
import colors from '../styles/colors';

const useStyles = makeStyles({
    container : {
        marginBottom: '40px'
    },
    title: {
        display: 'block',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '28px',
        color: '#42424F',
        textDecoration: 'none',
        cursor: 'auto',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    proofsBlock: {
        boxSizing: 'border-box',
        display: 'grid'
    },
    actionBlock: {
        boxSizing: 'border-box',
        marginTop: 40
    },
    saveNote: {
        fontSize: '14px',
        color: '#969696',
        marginTop: '12px'
    },
    titleLine: {
        display: 'flex',
        alignItems: 'start',
        marginBottom: '20px',
    },
    infoIcon: {
        width: '18px',
        height: '18px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    trustLevelValue: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1,
        color: colors.primary.black
    },
    itemTrustInfoTitle: {
        fontSize: '14px',
        fontWeight: 400,
    },
    iconTrustLevel: {
        width: '13px',
        height: '16px',
        color: colors.secondary.yellow,
        margin: '0 4px 0 14px'
    },
    evidenceTitle: {
        marginBottom: '20px',
        fontSize: '16px',
        fontWeight: 500
    },
    stakeTitle: {
        marginTop: '20px',
        marginBottom: '18px',
        fontSize: '16px',
        fontWeight: 500
    }
});

const proofsTemplate = [
    {
        id: 'd1',
        type: 'domain',
        title: 'Connect company website',
        pubTitle: 'Not connected',
        notes: [
            'Please upload this file to the root directory of your company website.',
            '>[ORGID]'
        ],
        icon: 'globe'
    },
    {
        id: 's1',
        type: 'social',
        subtype: 'facebook',
        title: 'Connect company Facebook account',
        pubTitle: 'Not connected',
        notes: [
            'Connect your company\'s Facebook account by creating a post with the following text',
            '>Winding Tree Marketplace account: [ORGID]',
            'Once you have created the post, paste a link to it below'
        ],
        icon: 'facebook'
    },
    // {
    //     id: 's2',
    //     type: 'social',
    //     subtype: 'twitter',
    //     title: 'Prove your Twitter account',
    //     pubTitle: 'Twitter account proof not submitted yet',
    //     notes: [
    //         'To prove that a Twitter account is yours copy this exactrly as it appears and create a post in your Twitter',
    //         '>Verifying my ORG.ID identifier: [ORGID]'
    //     ],
    //     icon: 'twitter'
    // },
    // {
    //     id: 's3',
    //     type: 'social',
    //     subtype: 'instagram',
    //     title: 'Prove your Instagram account',
    //     pubTitle: 'Proof not submitted yet',
    //     notes: [
    //         'To prove that a Instagram account is yours copy this exactrly as it appears and create a post in your Instagram',
    //         '>Verifying my ORG.ID identifier: [ORGID]'
    //     ],
    //     icon: 'instagram'
    // },
    {
        id: 's4',
        type: 'social',
        subtype: 'linkedin',
        title: 'Connect company LinkedIn account',
        pubTitle: 'Not connected',
        notes: [
            'Connect your company LinkedIn account by creating a post with the following text',
            '>Winding Tree Marketplace account: [ORGID]',
            'Paste the link to the post below'
        ],
        icon: 'linkedin'
    }
];

// Extract specific assertion from the list
const extractAssertion = (type, socialType, assertions = []) => {
    const assertion = assertions.filter(a =>
        (
            a.type === type &&
            (socialType ? a.claim.toLowerCase().includes(socialType) : true
        )
    ));
    return assertion.length > 0 ? assertion[0] : {};
};

// Create base template for displaing of the poofs list
const createTemplate = orgid => orgid
    ? JSON.parse(JSON.stringify(proofsTemplate))
        .map(
            p => {
                p.deployed = false;
                p.verified = false;
                p.assertion = {};
                p.notes = p.notes.map(n => n.replace('[ORGID]', orgid));
                return p;
            }
        )
    : [];

// Extend basic proofs list template with information of actual assertions,
// verifications and local changes
const applyExtensions = (
    proofsListTemplate,
    assertions,
    verifications,
    updatedProofs,
    canManage
) => proofsListTemplate.map(
    p => {
        let subtype;
        const assertion = extractAssertion(p.type, p.subtype, assertions);

        if (!canManage) {
            p.title = p.pubTitle;
        }

        switch (assertion.type) {
            case 'domain':
                p.assertion = assertion;
                p.deployed = !!assertion.type;
                p.title = assertion.claim;
                p.verified = !!verifications.domain;
                p.sslVerified = !!verifications.ssl;
                break;

            case 'social':
                p.assertion = assertion;
                p.deployed = !!assertion.type;
                subtype = assertion.claim.split('.')[0].toLowerCase();
                if (p.subtype === subtype) {
                    p.title = assertion.claim;
                    p.verified = !!verifications.social[subtype];
                }
                break;

            default:
        }

        if (updatedProofs && updatedProofs[p.id]) {
            p = {
                ...p,
                ...updatedProofs[p.id],
                deployed: false
            };
        }

        return p;
    }
);

// ProofsList component
export const ProofsList = props => {
    const { canManage, title, orgid, organization, assertions, verifications, fetchOrganizationInfo } = props;
    // const { proofsQty } = organization;
    const [isOpen, toggleModalOpenState] = useState(false);
    const [chosenProof, setProof] = useState();
    const [updatedProofs, setUpdatedProofs] = useState({});
    const [isSaverOpen, toggleSaverState] = useState(false);
    const [isRefreshing, toggleRefreshingState] = useState(false);
    const classes = useStyles();

    const handleReset = (orgid, doReset = true, delay = 3000) => {
        // Sometimes this action should not has effect
        if (doReset) {
            toggleRefreshingState(true);
            setTimeout(() => {
                setUpdatedProofs({});
                fetchOrganizationInfo({ id: orgid });
                toggleRefreshingState(false);
            }, delay);
        }
    }

    const openSaver = () => toggleSaverState(true);

    const onSaverClose = (orgid, isSuccess) => {
        handleReset(orgid, isSuccess);
        toggleSaverState(false);
    };

    const openWizard = proof => {
        setProof(proof);
        toggleModalOpenState(true);
    };

    const onWizardClose = (updatedProof) => {

        if (updatedProof) {
            setUpdatedProofs(proofs => ({
                ...proofs,
                [updatedProof.id]: updatedProof
            }));
        }
        toggleModalOpenState(false);
    }

    const handleAssertionRemove = (assertion, proof) => {
        props.removeAssertion(assertion);
        setUpdatedProofs(proofs => ({
            ...proofs,
            [proof.id]: {
                ...proof,
                removed: true,
                assertion: {}
            }
        }));
    };

    const proofsListTemplate = createTemplate(orgid);

    const proofsList = applyExtensions(
        proofsListTemplate,
        assertions,
        verifications,
        updatedProofs,
        canManage
    );

    const notDeployedCount = Object.keys(updatedProofs).length;
    console.log('OrgId',orgid)
    if (!orgid) {
        return false;
    }

    return (
        <Container className={classes.container}>
            <ProofsSaver
                isOpen={isSaverOpen}
                handleClose={isSuccess => onSaverClose(orgid, isSuccess)}
            />
            <ProofsWizard
                isOpen={isOpen}
                proof={chosenProof}
                handleClose={updatedProof => onWizardClose(updatedProof)}
            />
            <Box className={classes.titleLine}>
                <Grid container alignItems='center' spacing={2}>
                    <Grid item>
                        <Typography
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img
                            onClick={() => history.push('/trust/general')}
                            className={classes.infoIcon}
                            src={iconInfo}
                            alt={'Info'}
                        />
                    </Grid>
                    {/* <Grid item xs={6} style={{ display: 'flex' }}>
                        {proofsQty
                            ? (
                                <>
                                    <Typography variant={'caption'} className={classes.itemTrustInfoTitle}>Trust </Typography>
                                    <TrustLevelIcon className={classes.iconTrustLevel}/>
                                    <Typography variant={'caption'} className={classes.trustLevelValue}>{!!proofsQty ? proofsQty : '0'}</Typography>
                                </>
                            )
                            : ''
                        }
                    </Grid> */}
                </Grid>
            </Box>
            <Typography className={classes.evidenceTitle}>
                Internet Evidence
            </Typography>
            <Box className={classes.proofsBlock}>
                {proofsList
                .filter(p => p.subtype !== 'facebook')
                .map((proof, key) => (
                    <ProofItem
                        key={key}
                        canManage={canManage}
                        {...proof}
                        isRefreshing={isRefreshing}
                        onRemove={assertToRemove => handleAssertionRemove(assertToRemove, proof)}
                        onClick={canManage ? () => openWizard(proof) : () => {}}
                    />
                ))}
            </Box>
            {canManage &&
                <Box className={classes.actionBlock}>
                    {!notDeployedCount &&
                        <RefreshButton
                            onClick={() => props.fetchOrganizationInfoWithRefresh({ id: orgid })}
                        >
                            Refresh
                        </RefreshButton>
                    }
                    {notDeployedCount > 0 &&
                        <>
                            <Grid container>
                                <Grid item>
                                    <SaveButton onClick={openSaver}>
                                        Save to ORG.JSON
                                    </SaveButton>
                                </Grid>
                                <Grid item>
                                    <CancelButton onClick={() => handleReset(orgid, true, 1000)}>
                                        Cancel
                                    </CancelButton>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid item>
                                    <Typography
                                        className={classes.saveNote}
                                    >
                                        You have {notDeployedCount} unsaved change
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                </Box>
            }
            <Typography className={classes.stakeTitle}>
                Stake
            </Typography>
            <Box className={classes.proofsBlock}>
                <LifDepositValue orgid={orgid} canManage={canManage} />
            </Box>
        </Container>
    );
};

const mapStateToProps = state => {
    return {}
  };

const mapDispatchToProps = {
    fetchOrganizationInfo,
    fetchOrganizationInfoWithRefresh,
    resetTransactionStatus,
    removeAssertion
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsList);
