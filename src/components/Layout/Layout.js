import React from 'react';

import classes from './Layout.module.css';

import Toolbar from './../Navigation/Toolbar/Toolbar'
import Aux from './../../hoc/Auxiliary';

const layout = (props) => (
    <Aux>
        <div>
            TODO: 
            Toolbar,
            SideDrawer,
            Backdrop
        </div>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;