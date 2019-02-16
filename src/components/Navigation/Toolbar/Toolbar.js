import React from 'react';

import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
import SideDrawerBtn from './../SideDrawer/SideDrawerBtn/SideDrawerBtn'

import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly}>
            <SideDrawerBtn toggleSideDrawer={props.toggleSideDrawer}></SideDrawerBtn>
        </div>

        <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;