import React from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function OrderDetails({ orderId }) {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    // 백엔드에서 주문 상세 정보를 가져옴
    async function fetchOrderDetails() {
      const orderresponse = await axios
    .get(`http://localhost:8080/orders`, {
      headers: {
        Authorization: `Bearer ${loginInfo.accessToken}`,
      },
    })
    .then((orderresponse) => {
      console.log(orderresponse)
      setOrder(orderresponse.data)
      setLoading(false)
    });
    }

    fetchOrderDetails();
  }, [orderId]);

  console.log(order);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>주문 상세 정보</h2>
      {order ? (
      order.map((item, index) => (
      <div key={index}>
      <p>주문 ID: {item.id}</p>
      <p>주문 날짜: {item.orderDate}</p>
      <p>상태: {item.status}</p>
      <h3>주문 항목:</h3>
      {item.orderItems && (
        <ul>
          {item.orderItems.map((subItem) => (
            <li key={subItem.id}>
              상품 이름: {subItem.productName} - 수량: {subItem.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  ))
) : (
  <p>주문 정보를 찾을 수 없습니다.</p>
)}
    </div>
  );
}

export default OrderDetails;