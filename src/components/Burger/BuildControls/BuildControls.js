import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Lettuce', type: 'lettuce'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Total Price: {props.price.toFixed(2)}</p>
            {controls.map((ctrl) => {
                const disabledControl = props.disabledInfo[ctrl.type];
                return (
                    <BuildControl 
                    key={ctrl.type} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={
                        disabledControl ?
                        null :
                        () => props.ingredientRemoved(ctrl.type)
                    }
                    disabled={disabledControl}
                    />
                )
            })}
            <button 
                className={classes.OrderBtn + (!props.purchasable ? ' ' + classes.Disabled : '')}
                onClick={props.purchasable ? props.purchaseHandler : null}
            >
                Add to Orders
             </button>
        </div>
    )
};

export default buildControls;
