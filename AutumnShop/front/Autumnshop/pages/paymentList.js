import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";

// CSS 모음
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

// DB 접근 함수
async function getCartItem(loginInfo, setPaymentItems) {
  // 1. 현재 로그인한 아이디에 따라 맞는 카트 가져옴
  const paymentResponse = await axios
    .get(`http://localhost:8080/payment/${loginInfo.memberId}`, {
      headers: {
        Authorization: `Bearer ${loginInfo.accessToken}`,
      },
    })
    .then((paymentResponse) => {
      setPaymentItems(paymentResponse.data);
    });
}

const paymentList = () => {
  const classes = useStyles();
  const [paymentItems, setPaymentItems] = useState([]);
  let totalPrice = 0;

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    getCartItem(loginInfo, setPaymentItems);
  }, []);

  // 카트에 저장된 아이템들의 총 가격
  paymentItems.forEach((item) => {
    totalPrice += item.productPrice;
  });

  return (
    <div className={classes.cartContainer}>
      <h1>장바구니 목록</h1>
      <table className={classes.cartTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품 이름</th>
            <th>상품 가격</th>
            <th>평점</th>
            <th>수량</th>
            <th>이미지</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody className="css">
          {paymentItems.map((item, index) => (
            <tr key={item.id} className={classes.cartItem}>
              <td>{index + 1}</td>
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
          ))}
          <tr>
            <td>총 가격 : {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default paymentList;
