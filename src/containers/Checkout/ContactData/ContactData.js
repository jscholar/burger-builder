import React from 'react';
import axios from './../../../axios-orders';

import WithErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'
import Button from './../../../components/UI/Buttons/Button';
import Spinner from './../../../components/UI/Spinner/Spinner'

import classes from './ContactData.module.css'

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        // dummy order
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kobe Bryant',
                address: {
                    street: 'Tinsletown',
                    zipCode: '77777',
                    country: 'USA'
                },
                email: 'KB24@gmail.com'
            },
            deliveryMethod: 'chopper'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchased: !response.error});
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading: false})
            })
    }

    render() {
        let form = this.state.loading ? <Spinner /> :
        (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
                <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
                <Button btnType="Success" clickHandler={this.orderHandler}>Place Order</Button>
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
