import React from 'react';

import classes from './Order.module.css'

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients:</p>
        {Object.entries(props.ingredients).map(ing => (
                <span
                    key={ing[0]}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #AAA',
                        padding: '3px'
                    }}
                > {ing[0]}: ( {ing[1]} )</span>
        ))}
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);

export default order;
