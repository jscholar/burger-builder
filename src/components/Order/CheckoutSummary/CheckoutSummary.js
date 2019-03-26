import React from 'react';
import Burger from './../../Burger/Burger'
import Button from '../../UI/Buttons/Button'
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your Burger</h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType="Danger"
                    clickHandler={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success"
                    clickHandler={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;
