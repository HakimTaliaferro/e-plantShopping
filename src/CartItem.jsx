import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // Removes $ and converts to number
      total += quantity * cost;
    });
    return total.toFixed(2);
  };

  // ✅ Handle incrementing quantity
  const handleIncrement = (item) => {
    // Dispatch the updateQuantity action to increment the quantity of the item
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    // Optionally, dispatch the addItem action if the item is added to cart from an external source
    dispatch(addItem(item));
  };

  // ✅ Handle decrementing quantity (min 1)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Dispatch the updateQuantity action to decrement the quantity of the item
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Dispatch the removeItem action to remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Handle removing item
  const handleRemove = (item) => {
    // Dispatch the removeItem action to remove the item from the cart
    dispatch(removeItem(item.name));
  };

  // ✅ Calculate individual item total
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // ✅ Continue shopping handler (if passed from parent)
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // ✅ Placeholder for checkout
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
