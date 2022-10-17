import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Your cart is empty <span>😕</span>
      </h2>
      <p>Please go back to the main page and place an order.</p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
