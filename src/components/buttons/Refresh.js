import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconRestart from '../icons/IconRestart';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg, #99D7C5 -25%, #3A9492 103.57%)',
        boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
        borderRadius: 6,
        color: 'white',
        // width: 111,
        height: 40,
        textTransform: 'none',
        padding: '12px 20px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px'
    },
    icon: {}
});

export default props => {
    const { onClick, children } = props;
    const classes = useStyles();
    return (
        <Button
            className={classes.root}
            startIcon={(
                <IconRestart
                    className={classes.icon}
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                />
            )}
            onClick={onClick}
            nowrap='true'
            {...props}
        >
            {children}
        </Button>
    );
}