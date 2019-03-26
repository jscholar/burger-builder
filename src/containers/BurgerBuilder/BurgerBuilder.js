import React from 'react';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

import Spinner from './../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxiliary/Auxiliary'

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.5,
    meat: 1.0,
    bacon: 0.5
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                lettuce: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 0,
            purchasable: false,
            purchasing: false,
            loading: false,
            purchased: false
        }
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceUp = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceUp;
        const updatedPurchasable = this.checkPurchasable(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
            purchasable: updatedPurchasable
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDown = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceDown;
        const updatedPurchasable = this.checkPurchasable(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
            purchasable: updatedPurchasable
        })
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
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
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
            ...this.state.ingredients
        };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }
        let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancelPurchase={this.exitPurchasingHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={this.state.totalPrice} />;
        
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
