import React from 'react';
import axios from './../../../axios-orders';

import WithErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import Button from './../../../components/UI/Buttons/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                valid: false,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                valid: false,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                valid: false,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                valid: false,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        if (this.state.formIsValid) { 
            this.setState({ loading: true })
            // dummy order
            const formData = {};
            Object.keys(this.state.orderForm).forEach(type => {
                formData[type] = this.state.orderForm[type].value;
            })
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }


            axios.post('/orders.json', order)
                .then(response => {
                    this.setState({loading: false, purchased: !response.error});
                    this.props.history.push('/');
                }).catch(error => {
                    this.setState({loading: false})
                })
        }
    }

    validateInput(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validateInput(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = Object.keys(this.state.orderForm).map(key => ({
            id: key,
            config: this.state.orderForm[key]
        }))
        let form = this.state.loading ? <Spinner /> :
        (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation && formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >Place Order</Button>
            </form>
        );

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4> 
                {form}
            </div>
        )
    }
}

export default WithErrorHandler(ContactData, axios);
