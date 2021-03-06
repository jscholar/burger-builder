import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary'


/**
 * 
 * @param { React.Component } WrappedComponent 
 */
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({
                    error: error
                });
                return error;
            });
        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    {/*Error Handler Modal*/}
                    <Modal 
                        show={this.state.error}
                        hideModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} error={this.state.error} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
