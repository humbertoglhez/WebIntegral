import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';

import "bootswatch/dist/lux/bootstrap.min.css"

const stripePromise = loadStripe("pk_test_51LHPwRHmrIZ7aRdiNawQY6ZgUQ9o8fR7QkqWuVXwHHow05IU1L9GjZ7JuoMzqWOUWenJHVZleXIhsaWDjaC2y7VK00ARwHSPND")

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  });

  // si no existe error, muestra por consola el payment method.

  if(!error) {
    const { id } = paymentMethod;

    const {data} = await axios.post('http://localhost:3001/api/checkout', {
      id,
      amount: 10000
    })

    console.log(data)
    }
  };

  return <form onSubmit={handleSubmit} className="card card-body">
    
    <img 
    src="https://static.grainger.com/rp/s/is/image/Grainger/55NM42_AW01?hei=536&wid=536&$adapimg$=" 
    alt="product"
    className='img-fluid'/>

    <h3 className='text-center'>Precio: $100</h3>

    <div className='form-group'>
    <CardElement className='form-control'/>
    </div>
    <button className='btn btn-success'>
      Comprar
    </button>
  </form>
}

function Payments() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
      <CheckoutForm/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payments;