import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Items from './Items.jsx';
import styled from 'styled-components';
import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout.jsx';

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #007bff;
  border-radius: 3px;
  border: 0;
  color: white;
  font-size: 1.5em;
`;

const CartContainer = styled.div`
  padding: 1em;
  width: 400px;
  background-color: #fafafa;
  box-shadow: 0 0 2px grey;
  margin-bottom: 1em;

  @media screen and (min-width: 968px) {
    width: 750px;
  }
`;
const Title = styled.h2``;

const CartItem = styled.div`
  border-top: 1px solid #e9e9e9;
  padding-top: 1em;
  display: flex;
  padding-bottom: 1em;
`;

const ContentLeft = styled.img`
  width: 200px;
`;

const ContentRight = styled.div`
  margin-left: 1em;
`;

const RemoveButton = styled.div`
  position: relative;
  top: -90px;
  right: -164px;
  font-size: 1.5em;

  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 968px) {
    right: -515px;
  }
`;

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      cartTotal: null,
      totalPrice: ''
    };
  }
  componentDidMount = async () => {
    let responseBody = await fetch('/cart', { method: 'POST' });
    let responseText = await responseBody.text();
    let parsed = JSON.parse(responseText);
    if (parsed.success) {
      console.log('parsed: ', parsed);
      parsed.cart.forEach(item => {
        let price = item.price * item.quantity;
        this.setState({ cartTotal: this.state.cartTotal + price });
      });
      this.setState({ cart: parsed.cart });
      return;
    }
    this.setState({ cart: [{ item: 'Error' }] });
  };
  comp;

  removeCartItem = async item => {
    let data = new FormData();
    data.append('itemId', item._id);
    let body = await fetch('/remove-cart-item', { method: 'POST', body: data });
    let response = await body.text();
    let parsed = JSON.parse(response);
    if (parsed.success) {
      console.log('parsed: ', parsed);
      alert('Item Removed');
      this.setState({
        cartTotal: this.state.cartTotal - parseFloat(item.price * item.quantity)
      });
      this.setState({ cart: parsed.cart });
      return;
    }
    alert('Error');
  };
  incrementCount = item => {
    let newCart = this.state.cart.map(i => {
      if (i._id === item._id) {
        i.quantity += 1;
        this.setState({
          cartTotal: this.state.cartTotal + parseFloat(i.price)
        });
        let data = new FormData();
        data.append('itemId', item._id);
        data.append('value', +1);
        fetch('/update-cart-quantity', { method: 'POST', body: data });
        return i;
      } else {
        return i;
      }
    });
    this.setState({ cart: newCart });
  };
  pay = total => {};
  decrementCount = item => {
    if (item.quantity > 1) {
      let newCart = this.state.cart.map(i => {
        if (item._id === i._id) {
          i.quantity--;
          this.setState({
            cartTotal: this.state.cartTotal - parseFloat(i.price)
          });
          let data = new FormData();
          data.append('itemId', item._id);
          data.append('value', -1);
          fetch('/update-cart-quantity', { method: 'POST', body: data });
          return i;
        } else return i;
      });
      this.setState({ cart: newCart });
    }
  };
  render = () => {
    console.log('rendering cart page with: ', this.state.cart);
    return (
      <div style={{ backgroundColor: 'whitesmoke', height: '100%' }}>
        <div
          style={{
            padding: '5em 0 0 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <CartContainer>
            <Title>Your Cart</Title>
            {this.state.cart.map((item, index) => {
              return (
                <CartItem>
                  <ContentLeft src={item.imgPaths[0]}></ContentLeft>
                  <ContentRight>
                    <h3 style={{ margin: 0 }}>{item.item}</h3>
                    <h5 style={{ marginTop: '1em' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </h5>
                    <Quantity>
                      <QuantityButton
                        onClick={() => {
                          this.decrementCount(item);
                        }}
                      >
                        &#8722;
                      </QuantityButton>
                      &nbsp; Qty: {item.quantity} &nbsp;
                      <QuantityButton
                        onClick={() => {
                          this.incrementCount(item);
                        }}
                      >
                        &#43;
                      </QuantityButton>
                    </Quantity>
                    <RemoveButton
                      onClick={() => {
                        this.removeCartItem(item);
                      }}
                    >
                      &#10006;
                    </RemoveButton>
                  </ContentRight>
                </CartItem>
              );
            })}
            <h2>
              Total:{' '}
              {this.state.cartTotal ? this.state.cartTotal.toFixed(2) : 'Error'}
            </h2>
          </CartContainer>
        </div>
        <StripeProvider apiKey="pk_test_N55KXUOXeQlzSfDPEmL9vMi000A4Q5Gef7">
          <MyStoreCheckout />
        </StripeProvider>
      </div>
    );
  };
}

export default Cart;
