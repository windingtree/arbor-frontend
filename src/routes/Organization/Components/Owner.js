import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography
  } from '@material-ui/core';
import colors from '../../../styles/colors';
// import CopyIdComponent from '../../../components/CopyIdComponent';
import { strCenterEllipsis } from '../../../utils/helpers';
import CopyTextComponent from "../../../components/CopyTextComponent";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const styles = makeStyles({
    content: {
        position: 'relative',
        fontWeight: 400,
        fontSize: '14px',
        color: colors.greyScale.dark,
        marginBottom: '40px'
    },
    agentsTitleWrapper: {
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest,
        marginBottom: '20px'
    },
    ownerInfoWrapper: {
        margin: '20px 0 10px 0'
    },
    ownerInfo: {
        marginTop: '10px',
        paddingBottom: '10px'
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
        <Container className={classes.content}>
            <div className={classes.agentsTitleWrapper}>
                <Typography variant={'inherit'}>Owner</Typography>
            </div>
            <div className={classes.ownerInfoWrapper}>
                <div className={classes.ownerInfo}>
                    {/* <CopyIdComponent
                        id={owner || '0x...'}
                        leftElement={(<VpnKeyIcon className={classes.keyIcon}/>)}
                        fontSize={'14px'}
                        color={colors.greyScale.dark}
                    /> */}
                    <VpnKeyIcon className={classes.keyIcon}/>
                    <CopyTextComponent
                        title='Owner address is copied to clipboard'
                        text={owner}
                        label={strCenterEllipsis(owner, 10)}
                        color='rgb(94, 102, 106)'
                        fontWeight='500'
                        fontSize='14px'
                    />
                </div>
            </div>
        </Container>
    );
};

export default Owner;
