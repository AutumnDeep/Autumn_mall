import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

async function getCartItem(loginInfo) {
  let cartId = 0;

  const cartIdresponse = await axios
    .get(`http://localhost:8080/carts/${loginInfo.memberId}`, {
      headers: {
        Authorization: `Bearer ${loginInfo.accessToken}`,
      },
    })
    .then((cartIdresponse) => {
      cartId = cartIdresponse.id;
    });

  const response = await axios
    .get("http://localhost:8080/cartItems", {
      params: { cartId: cartId },
      headers: {
        Authorization: `Bearer ${loginInfo.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response.data); // 응답 데이터 처리
    });
}

async function getCartId(loginInfo) {}

const cartItems = () => {
  useEffect(() => {
    try {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      getCartId(loginInfo);
      getCartItem(loginInfo);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1> </h1>
    </div>
  );
};

export default cartItems;
