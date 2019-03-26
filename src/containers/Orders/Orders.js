import React from 'react';
import axios from './../../axios-orders';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import Order from './../../components/Order/Order'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('./orders.json')
        .then(res => {
            const fetchedOrders = Object.entries(res.data).map(order => ({
                id: order[0],
                ...order[1]   
            }));
            this.setState({
                orders: fetchedOrders,
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        console.log(this.state.orders);
        return (
            <div>
                {this.state.orders.map(order => 
                    <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
