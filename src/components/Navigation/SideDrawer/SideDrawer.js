import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    const sideDrawerClasses = [classes.SideDrawer, (props.display ? classes.Open : classes.Close)].join(' ');
    return (
        <Aux>
            <div className={classes.Backdrop}>
                <Backdrop show={props.display} clickHandler={props.toggle}/>
            </div>
            <div className={sideDrawerClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;