import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items.jsx';
import OneItem from './OneItem.jsx';
import styled from 'styled-components';

const CartContainer = styled.div`
padding: 1em;
width: 400px;
background-color: #fafafa;
box-shadow: 0 0 2px grey;

@media screen and (min-width: 968px) {
width:750px
}
`
const Title = styled.h2`
`

const CartItem = styled.div`
border-top: 1px solid #e9e9e9;
padding-top: 1em;
display:flex;
padding-bottom: 1em;
`

const ContentLeft = styled.img`
width:200px;
`

const ContentRight = styled.div`
margin-left:1em;
`

const RemoveButton = styled.div`
position: relative;
top: -90px;
right:-164px;
font-size: 1.5em;

    
    &:hover {
        cursor:pointer;
    }
    @media screen and (min-width: 968px) {
    right: -515px;
    }
`

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [],
            cartTotal: '',
            totalPrice: '',
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
    removeCartItem = async itemId => {
        let data = new FormData()
        data.append("itemId", itemId)
        let body = await fetch('/remove-cart-item', {method: 'POST', body: data})
        let response = await body.text()
        let parsed = JSON.parse(response)
        if (parsed.success) {
            console.log("parsed: ", parsed)
            alert("Item Removed")
            this.setState({cart: parsed.cart})
            return
        }
        alert("Error")
    }
    render = () => {
        console.log("rendering cart page with: ",this.state.cart)
        return (
            <div style={{backgroundColor: 'whitesmoke', height: "100vh", overflow: "hidden"}}>
            <div style={{ padding: '5em 0 0 0', display: "flex", justifyContent: "center" }}>
                <CartContainer>
                    <Title>Your Cart</Title>
                {this.state.cart.map((item, index) => {
                    return (<CartItem>
                        <ContentLeft src={item.imgPaths[0]}></ContentLeft>
                        <ContentRight>
                            <h3 style={{margin: 0}}>{item.item}</h3>
                            <h5 style={{marginTop: "1em"}}>{item.price}</h5>
                            <div>Qty: x</div>
                            <RemoveButton onClick={()=> {this.removeCartItem(item._id)}}>&#10006;</RemoveButton>
                        </ContentRight>
                    </CartItem>)
                })}
                </CartContainer>
            </div>
            </div>
        );
  };
}

export default Cart;
