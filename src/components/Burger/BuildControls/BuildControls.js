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
    console.log(props.ingredientAdded)
    return (
        <div className={classes.BuildControls}>
            {controls.map((ctrl) => {
                return (
                    <BuildControl 
                    key={ctrl.type} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    />
                )
            })}
        </div>
    )
};

export default buildControls;