import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext";

import "./styles.css";

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const totalCost = state.items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page-container">
      <div className="sidebar">
        <h2>Shopping Cart</h2>
        <div className="cart-list">
          {state.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.location}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="price">£{item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <Link to="/">
          <button className="continue-shopping">Continue Booking</button>
        </Link>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-details">
          <div className="summary-item">
            <span>Items</span>
            <span>{state.items.length}</span>
          </div>
          <div className="summary-item">
            <span>Total Cost</span>
            <span>£{totalCost.toFixed(2)}</span>
          </div>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
