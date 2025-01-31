import React, {useContext, useState} from 'react';
import Layout from '../../Componenets/Layout/Layout';
import classes from './payment.module.css'
import { DataContext } from '../../Componenets/Dataprovider/DataProvider';
import ProductCard from '../../Componenets/Product/ProductCard';
import { CardElement} from '@stripe/react-stripe-js';
import { useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Componenets/currencyFormat/CurrencyFormat';
import {axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/fireBase';
import {useNavigate} from 'react-router-dom';
import Type  from '../../Utility/actiontype';
import Order from '../order/Order';


function Payment() {

  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0) || 0;

 const total = basket?.reduce((amount, item) => {
   return item.price * item.amount + amount;
 }, 0) || 0;

 const [cardError, setCardError] = useState(null);
 const [processing, setProcessing] = useState(false);

   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();

   const  handleChange = (e)=> {
    
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
   }


      const handlePayment = async (e) => {
       e.preventDefault();
        setProcessing(true);

        try {
          // Make the payment request
          const response = await axiosInstance({
            method: "POST",
            url: `/payment/create?total=${total * 100}`,
          });
           console.log(response.data);

          const clientSecret = response.data?.clientSecret;

          // 2. Client-side confirmation
          const { paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            }
          );

          console.log(paymentIntent);

          // 3. after the confirmation --> order firestore database save, clear basket
           await db
             .collection("users")
             .doc(user.uid)
             .collection("orders")
             .doc(paymentIntent.id)
             .set({
               basket,
               amount: paymentIntent.amount,
               created: paymentIntent.created,
             });

           
           console.log("Order has been saved successfully.");
           
        } catch (error) {
       console.log(error.message);
      } finally {
       setProcessing(false);
      }
   };


       
    

     return (
       <Layout>
         {/* header */}
         <div className={classes.payment__header}>
           Checkout ({totalItem}) items
         </div>
         <section className={classes.payment}>
           {/* address */}
           <div className={classes.flex}>
             <h3>Delivery Address</h3>
             <div>
               <div>{user?.email}</div>
               <div>123 React Lane</div>
               <div>Chicago, IL</div>
             </div>
           </div>
           <hr />

           {/* product */}
           <div className={classes.flex}>
             <h3>Review items and delivery</h3>
             <div>
               {basket?.map((item, i) => (
                 <ProductCard key={i} product={item} flex={true} />
               ))}
             </div>
           </div>
           <hr />

           <div className={classes.flex}>
             <h3>payment method</h3>
             <div className={classes.payment__card__container}>
               <div className={classes.payment__details}>
                 <form onSubmit={handlePayment}>
                   {cardError && (
                     <small style={{ color: "red" }}>{cardError}</small>
                   )}

                   {/* {cardElement} */}
                   <CardElement onChange={handleChange} />

                   {/* {price} */}
                   <div className={classes.payment__price}>
                     <div>
                       <span style={{ display: "flex", gap: "10px" }}>
                         <p>Total Order |</p> <CurrencyFormat amount={total} />
                       </span>
                     </div>
                     <button type="submit">
                       {processing ? (
                         <div className={classes.loading}>
                           <ClipLoader color="gray" size={12} />
                           <p>Please Wait ...</p>
                         </div>
                       ) : (
                         " Pay Now"
                       )}
                     </button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </section>
       </Layout>
     );
   };


  export default Payment;