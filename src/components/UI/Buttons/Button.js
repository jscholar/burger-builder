import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clickHandler}>
        {props.children}
    </button>
);

export default button;
