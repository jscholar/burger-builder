import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from './../Backdrop/Backdrop'

import classes from './Modal.module.css'

class modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.show)
    }

    render() {
        return (<Aux>
            <Backdrop 
                show={this.props.show}
                clickHandler={this.props.hideModal}
            />
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0',
                    zIndex: this.props.show ? '500' : '-100',
                }}
            >
                {this.props.children}
            </div>
        </Aux>
        )
    }
};

export default modal;
