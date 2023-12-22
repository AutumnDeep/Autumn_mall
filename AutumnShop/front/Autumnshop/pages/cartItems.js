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
async function getCartItem(loginInfo, setCartItem) {
  let cartId = 0;

  // 1. 현재 로그인한 아이디에 따라 맞는 카트 가져옴
  const cartIdresponse = await axios
    .get(`http://localhost:8080/carts/${loginInfo.memberId}`, {
      headers: {
        Authorization: `Bearer ${loginInfo.accessToken}`,
      },
    })
    .then((cartIdresponse) => {
      cartId = cartIdresponse.id;
    });

  // 2. 카트 Id에 맞는 카트 아이템 목록들을 가져옴
  const cartItemsResponse = await axios.get("http://localhost:8080/cartItems", {
    params: { cartId: cartId },
    headers: {
      Authorization: `Bearer ${loginInfo.accessToken}`,
    },
  });

  setCartItem(cartItemsResponse.data);
}

// imageUrl 불러오는 함수
async function getImageUrl(productId, setImages, index) {
  const cartImageResponse = await axios.get(
    `http://localhost:8080/products/image/${productId}`
  );
  setImages((prevImages) => {
    const updatedImages = [...prevImages];
    updatedImages[index] = cartImageResponse.data.imageUrl;
    return updatedImages;
  });
}

const CartItems = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    getCartItem(loginInfo, setCartItems);
  }, []);

  //cartItem 불러오고 난 후 이미지Url을 순서대로 불러오게 하기 위함
  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        getImageUrl(item.productId, setImages, index);
      });
    }
  }, [cartItems]);

  return (
    <div className={classes.cartContainer}>
      <h1>장바구니 목록</h1>
      <table className={classes.cartTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품 이름</th>
            <th>상품 가격</th>
            <th>상품 설명</th>
            <th>수량</th>
            <th>이미지</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className={classes.cartItem}>
              <td>{index + 1}</td>
              <td>{item.productTitle}</td>
              <td>{item.productPrice}</td>
              <td>{item.productDescription}</td>
              <td>{item.quantity}</td>
              <td>
                {images[index] && (
                  <img
                    src={images[index]}
                    alt={`Product ${index + 1}`}
                    className={classes.productImage}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;
