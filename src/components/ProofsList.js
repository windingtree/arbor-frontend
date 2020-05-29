import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Button } from "@material-ui/core";
import ProofItem from './ProofItem';
// import LifDepositValue from './LifDepositValue';
import ProofsWizard from './ProofsWizard';
import { fetchOrganizationInfo } from '../ducks/fetchOrganizationInfo';
import {
    removeAssertion
} from '../ducks/wizard';

const proofsTemplate = [
    {
        id: 'd1',
        type: 'domain',
        title: 'Prove your website',
        notes: [
            'Copy your ORG.ID and save this Id to the file or publication somewhere under the domain.',
            'Add a link to this file or publication as proof.',
            'Your ORG.ID: [ORGID]'
        ]
    },
    {
        id: 's1',
        type: 'social',
        subtype: 'facebook',
        title: 'Prove your Facebook',
        notes: [
            'Copy your ORG.ID and create a post in Facebook with it.',
            'Add a direct link to this post as proof.',
            'Your ORG.ID: [ORGID]'
        ]
    },
    {
        id: 's2',
        type: 'social',
        subtype: 'twitter',
        title: 'Prove your Twitter',
        notes: [
            'Copy your ORG.ID and create a tweet in Twitter with it.',
            'Add a direct link to this tweet as proof.',
            'Your ORG.ID: [ORGID]'
        ]
    },
    {
        id: 's3',
        type: 'social',
        subtype: 'instagram',
        title: 'Prove your Instagram',
        notes: [
            'Copy your ORG.ID and create a post in Instagram with it.',
            'Add a direct link to this post as proof.',
            'Your ORG.ID: [ORGID]'
        ]
    },
    {
        id: 's4',
        type: 'social',
        subtype: 'linkedin',
        title: 'Prove your Linkedin',
        notes: [
            'Copy your ORG.ID and create a public post in Linkedin with it.',
            'Add a direct link to this post as proof.',
            'Your ORG.ID: [ORGID]'
        ]
    }
];

const extractAssertion = (type, socialType, assertions = []) => {
    const assertion = assertions.filter(a =>
        (
            a.type === type &&
            (socialType ? a.claim.toLowerCase().includes(socialType) : true
        )
    ));
    return assertion.length > 0 ? assertion[0] : {};
};

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

const ProofsList = props => {
    const { title, orgid, assertions, verifications } = props;
    const [isOpen, toggleModalOpenState] = useState(false);
    const [chosenProof, setProof] = useState();
    const [updatedProofs, setUpdatedProofs] = useState({});

    const resetProofsList = () => {
        setUpdatedProofs({});
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

    if (!orgid) {
        return false;
    }

    return (
        <Container>
            <ProofsWizard
                isOpen={isOpen}
                proof={chosenProof}
                onWizardClose={updatedProof => onWizardClose(updatedProof)}
            />
            <Typography>{title}</Typography>
            {proofsList.map((proof, key) => (
                <ProofItem
                    key={key}
                    {...proof}
                    onRemove={assertToRemove => handleAssertionRemove(assertToRemove, proof)}
                    onClick={() => openWizard(proof)}
                />
            ))}
            {!notDeployedCount &&
                <Button onClick={() => props.fetchOrganizationInfo({ id: orgid })}>
                    Refresh
                </Button>
            }
            {notDeployedCount > 0 &&
                <div>
                    <Button>
                        Save to ORG.JSON
                    </Button>
                    <Typography>You have {notDeployedCount} unsaved change</Typography>
                    <Button onClick={() => {
                        resetProofsList(orgid);
                        props.fetchOrganizationInfo({ id: orgid });
                    }}>
                        Cancel
                    </Button>
                </div>
            }
        </Container>
    );
};

const mapStateToProps = state => {
    return {}
  };
  
const mapDispatchToProps = {
    fetchOrganizationInfo,
    removeAssertion
};

export default connect(mapStateToProps, mapDispatchToProps)(ProofsList);
