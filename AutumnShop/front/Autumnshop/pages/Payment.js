import axios from "axios";
import React from "react";
import { useEffect } from "react";

const Payment = ({ cartId }) => {
  const paymentSubmit = async () => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    try {
      const paymentResponse = await axios.post(
        "http://localhost:8080/payment",
        {
          cartId: cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${loginInfo.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button type="submit" onClick={paymentSubmit}>
        구매
      </button>
    </div>
  );
};

export default Payment;
