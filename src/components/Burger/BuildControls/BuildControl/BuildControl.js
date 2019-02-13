import React from 'react';
import classes from './BuildControl.module.css';

/**
 * 
 * @param {{key: string, type: string}} props Displays controls for given ingredient.
 */
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <i onClick={props.removed} className="fas fa-minus-circle"></i>
        <i onClick={props.added} className="fas fa-plus-circle"></i>
    </div>
);

export default buildControl;