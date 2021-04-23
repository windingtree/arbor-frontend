import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(180deg, #99D7C5 -25%, #3A9492 103.57%)',
        border: '1px solid #99D7C5',
        boxShadow: '0px 2px 12px rgba(12, 64, 78, 0.1)',
        boxSizing: 'border-box',
        borderRadius: '6px',
        color: 'white',
        width: 'auto',
        height: 40,
        textTransform: 'none',
        padding: '12px 20px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px',
        marginRight: '12px'
    },
    icon: {}
});

export default props => {
    const { onClick, children } = props;
    const classes = useStyles();
    return (
        <Button
            className={classes.root}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
}