import React from 'react';

import classes from './Layout.module.css';

import Toolbar from './../Navigation/Toolbar/Toolbar'
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'
import Aux from './../../hoc/Auxiliary';

class Layout extends React.Component {
    state = {
        displaySideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            displaySideDrawer: false
        })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                displaySideDrawer: !prevState.displaySideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <div>
                    TODO: 
                    Toolbar,
                    SideDrawer,
                    Backdrop
                </div>
                <SideDrawer 
                    display={this.state.displaySideDrawer}
                    toggle={this.toggleSideDrawerHandler}
                />
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;