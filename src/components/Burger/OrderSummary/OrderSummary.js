import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from './../../UI/Buttons/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((ingKey) => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
                : {props.ingredients[ingKey]}
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your Order Summary.</h3>
            <p>A delicous burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h3>Total Price: ${props.price.toFixed(2)}</h3>
            <p>Continue to Checkout?</p>
            <Button clickHandler={props.cancelPurchase} btnType={'Danger'}>CANCEL</Button>
            <Button clickHandler={props.continuePurchase} btnType={'Success'}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;