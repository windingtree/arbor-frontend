import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ProofItem from './ProofItem';
// import LifDepositValue from './LifDepositValue';
import ProofsWizard from './ProofsWizard';
import ProofsSaver from './ProofsSaver';
import RefreshButton from './buttons/Refresh';
import CancelButton from './buttons/Cancel';
import SaveButton from './buttons/Save';
import {
    fetchOrganizationInfo
} from '../ducks/fetchOrganizationInfo';
import {
    removeAssertion,
    resetTransactionStatus
} from '../ducks/wizard';

const useStyles = makeStyles({
    container : {
        marginBottom: 80
    },
    title: {
        display: 'block',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '28px',
        color: '#42424F',
        marginBottom: '64px',
        marginTop: '20px',
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
    }
});

const proofsTemplate = [
    {
        id: 'd1',
        type: 'domain',
        title: 'Prove your website',
        notes: [
            'Copy your ORG.ID and save this Id to the file or publication somewhere under the domain.',
            'Add a link to this file or publication as proof.',
            '>[ORGID]'
        ],
        icon: 'globe'
    },
    {
        id: 's1',
        type: 'social',
        subtype: 'facebook',
        title: 'Prove your Facebook account',
        notes: [
            'To prove that a Facebook account is yours copy this exactrly as it appears and create a post in your Facebook',
            '>Verifying my ORG.ID identifier: [ORGID]'
        ],
        icon: 'facebook'
    },
    // {
    //     id: 's2',
    //     type: 'social',
    //     subtype: 'twitter',
    //     title: 'Prove your Twitter account',
    //     notes: [
    //         'To prove that a Twitter account is yours copy this exactrly as it appears and create a post in your Twitter',
    //         '>Verifying my ORG.ID identifier: [ORGID]'
    //     ],
    //     icon: 'twitter'
    // },
    {
        id: 's3',
        type: 'social',
        subtype: 'instagram',
        title: 'Prove your Instagram account',
        notes: [
            'To prove that a Instagram account is yours copy this exactrly as it appears and create a post in your Instagram',
            '>Verifying my ORG.ID identifier: [ORGID]'
        ],
        icon: 'instagram'
    },
    {
        id: 's4',
        type: 'social',
        subtype: 'linkedin',
        title: 'Prove your LinkedIn account',
        notes: [
            'To prove that a LinkedIn account is yours copy this exactrly as it appears and create a post in your LinkedIn',
            '>Verifying my ORG.ID identifier: [ORGID]'
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
    updatedProofs
) => proofsListTemplate.map(
    p => {
        let subtype;
        const assertion = extractAssertion(p.type, p.subtype, assertions);

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
const ProofsList = props => {
    const { canManage, title, orgid, assertions, verifications, fetchOrganizationInfo } = props;
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
        updatedProofs
    );

    const notDeployedCount = Object.keys(updatedProofs).length;

    if (!canManage || !orgid) {
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
            <Typography
                className={classes.title}
            >
                {title}
            </Typography>
            <Box className={classes.proofsBlock}>
                {proofsList.map((proof, key) => (
                    <ProofItem
                        key={key}
                        {...proof}
                        isRefreshing={isRefreshing}
                        onRemove={assertToRemove => handleAssertionRemove(assertToRemove, proof)}
                        onClick={() => openWizard(proof)}
                    />
                ))}
            </Box>
            <Box className={classes.actionBlock}>
                {!notDeployedCount &&
                    <RefreshButton
                        onClick={() => props.fetchOrganizationInfo({ id: orgid })}
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
        </Container>
    );
};

const mapStateToProps = state => {
    return {}
  };
  
const mapDispatchToProps = {
    fetchOrganizationInfo,
    resetTransactionStatus,
    removeAssertion
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsList);
