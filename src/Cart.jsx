import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items.jsx';
import OneItem from './OneItem.jsx';
import styled from 'styled-components';

let CartContainer = styled.div`

`

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: []
        }
    }
    componentDidMount = async () => {
        let responseBody = await fetch('/cart', { method: 'POST' });
        let responseText = await responseBody.text();
        let parsed = JSON.parse(responseText)
        if (parsed.success) {
            console.log("parsed: ",parsed)
            this.setState({cart: parsed.cart})
            return
        }
        this.setState({cart: [{item: "Error" }] })
    }
    render = () => {
        console.log("rendering cart page with: ",this.state.cart)
        return (
            <div style={{ margin: '5em 0 0 0' }}>
                <CartContainer>
                {this.state.cart.map((item, index) => {
                    return <div key={index}><OneItem item={item}></OneItem></div>
                })}
                </CartContainer>
            </div>
        );
  };
}

export default Cart;
