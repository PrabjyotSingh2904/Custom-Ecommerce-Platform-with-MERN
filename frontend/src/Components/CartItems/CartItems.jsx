import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const CartItems = () => {
  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate(); // Initialize navigation

  const handleCheckout = () => {
    navigate("/payment"); // Navigate to the Payment page
  };

  const handlePromoCode = () => {
    if (promoCode === "FREE50") {
      setDiscount(0.5);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const getDiscountedTotal = () => {
    const totalAmount = getTotalCartAmount();
    return totalAmount - totalAmount * discount;
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img className="cartitems-product-icon" src={backend_url + e.image} alt="" />
                <p className="cartitems-product-title">{e.name}</p>
                <p>{currency}{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>{currency}{e.new_price * cartItems[e.id]}</p>
                <img
                  onClick={() => removeFromCart(e.id)}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Promo Code Discount</p>
              <p>-{currency}{getTotalCartAmount() * discount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getDiscountedTotal()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Promo code ( FREE50 )"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoCode}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
