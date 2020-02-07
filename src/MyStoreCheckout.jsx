import React, { Component } from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
class CheckoutForm extends Component {
  removeCartItems = async item => {
    let data = new FormData();
    data.append('itemId', 'all');
    let body = await fetch('/remove-cart-item', { method: 'POST', body: data });
    let response = await body.text();
    let parsed = JSON.parse(response);
    if (parsed.success) {
      console.log('parsed: ', parsed);
      return;
    }
    alert('Error');
  };
  handleSubmit = ev => {
    ev.preventDefault();
    const cardElement = this.props.elements.getElement('card');

    this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name: 'Jenny Rosen' }
      })
      .then(({ paymentMethod }) => {
        alert('Payment received!');
        this.removeCartItems();
      });
  };

  render() {
    return (
      <div className="payment-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Card details</h1>
          <label>
            <CardElement style={{ base: { fontSize: '18px' } }} />
          </label>
          <button>Confirm order</button>
        </form>
      </div>
    );
  }
}
let InjectedCheckoutForm = injectStripe(CheckoutForm);

class MyStoreCheckout extends Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
