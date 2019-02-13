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
            totalPrice: 0
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
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDown = INGREDIENT_PRICES[type];
            const updatedPrice = this.state.totalPrice - priceDown;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            })
            console.log(this.state);
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
