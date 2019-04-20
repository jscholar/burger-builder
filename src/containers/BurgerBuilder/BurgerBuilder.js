import React from 'react';

import { connect } from 'react-redux';
import actionTypes from './../../store/actions';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

import Spinner from './../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxiliary/Auxiliary'

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            purchased: false
        }
    }

    checkPurchasable = (updatedIngredients) => {
        const updatedPurchasable = Object.keys(updatedIngredients).findIndex((ing) => {
            return updatedIngredients[ing] > 0;
        }) !== -1;
        return updatedPurchasable;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    exitPurchasingHandler = () => {
        this.setState({
            purchasing: false,
            purchased: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });

        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString

        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }
        let orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            cancelPurchase={this.exitPurchasingHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={this.props.price} />;
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        } else if (this.state.purchased) {
            orderSummary = 
            <div>
                Thank you for your purchase
                <button onClick={this.exitPurchasingHandler}>Continue shopping</button>
            </div>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing && !this.props.error} hideModal={this.exitPurchasingHandler}>
                    {orderSummary}
                </Modal> 
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    purchasable={this.checkPurchasable(this.props.ings)}
                    purchaseHandler={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredientName 
        }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredientName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
