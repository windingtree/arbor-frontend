import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Blockies from 'react-blockies';
import CopyTextComponent from './CopyTextComponent';
import { strCenterEllipsis } from '../utils/helpers';

const styles = makeStyles({
    identicon: {
        borderRadius: '50%'
    },
    identiconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'flex-start'
    },
    blockieWrapper: {
        marginRight: '8px'
    }
});

export default props => {
    const classes = styles();
    const {
        address,
        className
    } = props;

    return (
        <div className={classes.identiconWrapper + (className ? ` ${className}` : '')}>
            <div className={classes.blockieWrapper}>
                <Blockies
                    seed={address}
                    size={15}
                    scale={2}
                    className={classes.identicon}
                />
            </div>
            <div title='Click to copy the address'>
                <CopyTextComponent
                    title='Address copied to clipboard'
                    text={address}
                    label={strCenterEllipsis(address.toLowerCase().split('x')[1])}
                    fontWeight={500}
                    fontSize={'14px'}
                    {...props}
                />
            </div>
        </div>
    );
};
