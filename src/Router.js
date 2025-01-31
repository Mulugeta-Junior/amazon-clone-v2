import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Payment from "./pages/Payment/Payment";
import Order from "./pages/order/Order";
import Cart from "./pages/Cart/Cart";
import Landing from "./pages/Landing/Landing";
import Result from "./pages/Result/Result";
import Productdetail from "./pages/Productdetail/Productdetail";
import Auth from "./pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import ProtectRoute from "./Componenets/ProtectRoute/ProtectRoute";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51QTCM7BaiXUVRFqGvPBX23LBk4oEliuqTEmhBnIc1F7ZPHPKdtfUF4tBjJh8tGWkzixhYJiLB76TgApx1zLAz1aa00TmfegSgY')


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/payments"
        element={
          <ProtectRoute msg={"You must login to pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectRoute>
        }
      />

      <Route
        path="/Order"
        element={
          <ProtectRoute
            msg={"you must log in to see your orders"}
            redirect={"/Order"}
          >
            <Order />
          </ProtectRoute>
        }
      />
      <Route path="/category/:categoryName" element={<Result />} />
      <Route path="/products/:productId" element={<Productdetail />} />
      <Route path="/cart" element={<Cart />} />
      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Routing;
