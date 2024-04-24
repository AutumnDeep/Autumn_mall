import React from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    width: "800px",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f8f8f8",
  },

  cartTable: {
    width: "800px",
  },
  cartItem: {
    width: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 그림자 효과를 변경
    transition: "transform 0.3s ease-in-out", // 호버 효과를 위한 transition 추가
    "&:hover": {
      transform: "scale(1.05)", // 호버 시 약간 확대됨
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // 호버 시 그림자 효과 증가
    },
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  productImage: {
    width: "100px",
    alignSelf: "center",
  },
}));

function OrderDetails({ orderId }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderid, setOrderid] = useState([]);
  const [payment, setPayment] = useState([]);

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
      setLoading(false)
      setOrderid(orderresponse.data.map(order => order.id));
    });
    }
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    function fetchOrderFollow() {
      Promise.all(
        orderid.map(orderids =>
          axios.get("http://localhost:8080/payment/order", {
            params: { orderId: orderids }
          }).then(response => response.data)
        )
      ).then(payments => {
        setPayment(payments);
        console.log(payments);
      }).catch(error => {
        console.error('Error fetching payments:', error);
      });
    }
  
    fetchOrderFollow();
  },[orderid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {payment ? (
        payment.map((paymentitem, index) => (
          <div key={index}>
            <p>주문 ID: {index+1}</p>
            {paymentitem ? (
              paymentitem.map((item, index) => (
                <table key = {index}>
                  <thead></thead>
                  <tbody>
                  <tr>
                  <td>{item.productTitle}</td>
                  <td>{item.productPrice}</td>
                  <td>{item.productRate}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={`Product ${index + 1}`}
                        className={classes.productImage}
                      />
                    )}
                  </td>
                  <td>{item.date}</td>
                  </tr>
                  </tbody>
                </table>
              ))
            ): (<p></p>)}
          </div>

        ))
      ):(<p></p>)}
    </div>
  );
}

export default OrderDetails;