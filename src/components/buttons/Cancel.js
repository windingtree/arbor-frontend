import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        background: 'none',
        border: 'none',
        boxSizing: 'border-box',
        borderRadius: 8,
        color: '#5E666A',
        width: 'auto',
        height: 40,
        textTransform: 'none',
        padding: '12px 20px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px',
        '&:hover': {
            background: 'none'
        }
    },
    icon: {}
});

export default ({ onClick, children }) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.root}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}