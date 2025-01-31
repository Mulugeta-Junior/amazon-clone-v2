import React, { useContext } from "react";
import Layout from "../../Componenets/Layout/Layout";
import ProductCard from "../../Componenets/Product/ProductCard";
import { DataContext } from "../../Componenets/Dataprovider/DataProvider";
import classes from "./cart.module.css";
import CurrencyFormat from "../../Componenets/currencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/actiontype";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) =>{
  return item.price * item.amount + amount}, 0); // Assuming each item has a price property
  
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };


  return (
    <Layout>
      <section className="classes.container">
        <div className="classes.cart_container">
          <h2>Hello</h2>
          <h3>Your shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops !! No item in your cart</p>
          ) : (
            basket.map((item, i) => (
              <section className="classes.cart_product">
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className="classes.btn_container">
                  <button className="classes.btn" onClick={() => increment(item)}>
                    <IoIosArrowDropupCircle size={30}/>
                  </button>
                  <span>{item.amount}</span>
                  <button className="classes.btn" onClick={() => decrement(item.id)}>
                    <IoIosArrowDown size={30} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat
                amount={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;

 <Link to="/Order">
   <p>Returns</p>
   <span>& Orders</span>
 </Link>;