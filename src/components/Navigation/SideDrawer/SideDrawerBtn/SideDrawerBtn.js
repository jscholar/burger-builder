import React from 'react';

import classes from './SideDrawerBtn.module.css'

const sideDrawerBtn = (props) => (
    <div className={classes.Burger} onClick={props.toggleSideDrawer}>
        <i className="fas fa-bars"></i>
    </div>
);

export default sideDrawerBtn;