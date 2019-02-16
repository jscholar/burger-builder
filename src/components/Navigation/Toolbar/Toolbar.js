import React from 'react';

import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'

import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.ToolbarElement}>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={[classes.ToolbarElement, classes.DesktopOnly].join(' ')}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;