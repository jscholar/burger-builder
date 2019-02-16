import React from 'react';
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'

import Aux from '../../hoc/Auxiliary'

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
            purchasable: false
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

    render() {
        console.log(this.state);
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }
        
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
