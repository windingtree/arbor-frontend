import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../styles/colors';
import {
    CardElement,
    useStripe,
    useElements,
    Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
    STRIPE_PUB_KEY
} from '../utils/constants';
import {
    createPaymentIntent
} from '../ducks/utils/stripe';

const styles = makeStyles({
    wrapper: {
        marginTop: '10px'
    },
    errorWrapper: {
        marginTop: '10px'
    },
    errorText: {
        fontSize: '14px',
        color: colors.primary.accent
    },
    cardDetailLabel: {
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    },
    cardDetailSubtitle: {
        marginBottom: '20px',
        fontSize: '16px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    },
    payButtonWrapper: {
        marginTop: '20px'
    },
    payButton: {
        border: `1px solid ${colors.primary.white}`,
        borderRadius: '8px',
        backgroundImage: colors.gradients.green,
        '&:disabled': {
          opacity: '0.5',
          cursor: 'none'
        }
    },
    payButtonLabel: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1.24,
        color: colors.primary.white,
        padding: '4px 12px'
    },
    payProcessingNote: {
        fontSize: '16px',
        fontWeight: 500,
        color: colors.greyScale.darkest
    }
});

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const checkoutStyles = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#7161D6',
            color: '#495057',
            fontWeight: 400,
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {color: '#E8F0FE'},
            '::placeholder': {color: '#6c757d'},
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: 'red'
        }
    }
};

const CheckoutForm = props => {
    const {
        options,
        onPaymentSuccess,
        onPaymentFailure
    } = props;
    const {
        estimationId
    } = options;
    const classes = styles();
    const [initializing, setInitializing] = useState(false);
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        setError(null);
        setInitializing(true);
        createPaymentIntent(estimationId)
            .then(paymentIntent => {
                console.log('@@@', paymentIntent);
                setClientSecret(paymentIntent.client_secret);
                setAmount(paymentIntent.amount / 100);
                setInitializing(false);
            })
            .catch(err => {
                setError(err.message || 'Unknown error');
                setInitializing(false);
            });
    }, [estimationId]);

    const handlePayWithCard = async ev => {
        ev.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setError(null);
        try {
            setProcessing(true);

            const payload = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }
            );

            if (payload.error) {
                setError(payload.error.message);
                setProcessing(false);
                onPaymentFailure(payload);
            } else {
                setError(null);
                setProcessing(false);
                onPaymentSuccess(payload);
            }
        } catch (error) {
            setError(error.message || 'Unknown error');
            setProcessing(false);
        }
    };

    return (
        <div className={classes.wrapper}>
            <Grid container direction="column">
                {initializing &&
                    <Grid item>
                        <Typography className={classes.cardDetailLabel}>Preparing Checkout</Typography>
                        <CircularProgress width="40" />
                    </Grid>
                }
                {!initializing &&
                    <>
                        <Grid item>
                            <Typography className={classes.cardDetailLabel}>Card details</Typography>
                            <Typography className={classes.cardDetailSubtitle}>
                            We are partnering with Simard and Stripe to securely encrypt and process your card details. You will be asked to authenticate with your bank if your bank requires strong authentication. Your payment is made in US Dollars (US$) to Simard OÜ, and is non-refundable.
                            </Typography>
                            <CardElement className="sr-input" options={checkoutStyles}/>
                        </Grid>
                        <Grid item>
                            <div className={classes.payButtonWrapper}>
                                {!processing &&
                                    <Button
                                        className={classes.payButton}
                                        disabled={processing || !clientSecret || !stripe}
                                        onClick={handlePayWithCard}
                                    >
                                        <Typography
                                            className={classes.payButtonLabel}
                                            variant="caption"
                                        >
                                            {`Pay US$ ${amount}`}
                                        </Typography>
                                    </Button>
                                }
                                {processing &&
                                    <Typography className={classes.payProcessingNote}>
                                        Please wait while we process your payment card
                                    </Typography>
                                }
                            </div>
                        </Grid>
                    </>
                }
                {error &&
                    <div className={classes.errorWrapper}>
                        <Typography className={classes.errorText}>{error}</Typography>
                    </div>
                }
            </Grid>
        </div>
    );
};

export default props => (
    <Elements stripe={stripePromise}>
        <CheckoutForm {...props}/>
    </Elements>
);
