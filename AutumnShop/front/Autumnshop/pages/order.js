import React from "react";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    cartContainer: {
      width: "100%",
      maxWidth: "800px",
      margin: "20px auto",
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
      
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        margin: "0 0 10px 0",
        border: "1px solid #007bff",
        borderRadius: "12px",
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: "bold",
  },
    detailRow: {
        flexDirection: "column",  // 변경: 세로로 나열되도록 수정
        padding: "8px",
        margin: "5px 0",
        border: "1px solid #eee",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    productDetailContainer: {
        display: "flex",
        justifyContent: "space-between",  // 각 요소를 좌우에 고르게 분포
        alignItems: "center",
        marginBottom: "5px",
    },
    productCell: {
        padding: "5px 10px",
        flex: 1, // ensures that each cell can grow equally
    }
  }));

function OrderDetails({}){
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(' ');
    const [orderid, setOrderid] = useState([]);
    const [payment, setPayment] = useState([])

    useEffect(() => {
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        
        async function fetchOrderDetails() {
            const orderresponse = await axios
            .get(`http://localhost:8080/orders`,{
                headers : {
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

    if(loading) return <div>Loading...</div>;

    return (
        <div className={classes.cartContainer}>
        <div className={classes.headerRow}>
          <div>주문번호</div>
          <div>물품</div>
          <div>가격</div>
          <div>평점</div>
          <div>수량</div>
          <div>주문날짜</div>
          <div>이미지</div>
        </div>
        {payment && payment.map((paymentitem, index) => (
          <div key={index} className={classes.detailRow}>
            {paymentitem.map((item, idx) => (
              <div key={idx} className={classes.productDetailContainer}>
                <span className={classes.productCell}>{index + 1}</span>
                <span className={classes.productCell}>{item.productTitle}</span>
                <span className={classes.productCell}>{item.productPrice}</span>
                <span className={classes.productCell}>{item.productRate}</span>
                <span className={classes.productCell}>{item.quantity}</span>
                <span className={classes.productCell}>{item.date}</span>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={`Product ${idx + 1}`}
                    className={classes.productImage}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        </div>
      );
    }

export default OrderDetails;