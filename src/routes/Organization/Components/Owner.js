import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography
  } from '@material-ui/core';
import colors from '../../../styles/colors';
import CopyIdComponent from '../../../components/CopyIdComponent';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const styles = makeStyles({
    agentsTitleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    ownerInfoWrapper: {
        margin: '30px 0'
    },
    ownerInfo: {
        marginTop: '10px'
    },
    keyIcon: {
        fontSize: 'large',
        color: colors.greyScale.common,
        verticalAlign: 'sub',
        opacity: .5,
        marginRight: '14px'
    }
});

const Owner = props => {
    const classes = styles();
    const {
        owner
      } = props;
    return (
        <Container>
            <div className={classes.agentsTitleWrapper}>
                <Typography variant={'inherit'}>Owner</Typography>
            </div>
            <div className={classes.ownerInfoWrapper}>
                <div className={classes.ownerInfo}>
                <CopyIdComponent
                    id={owner || '0xLOADING'}
                    leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                    fontSize={'14px'}
                    color={colors.greyScale.dark}
                />
                </div>
            </div>
        </Container>
    );
};

export default Owner;
