import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Carts = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      const response = await axios.post("http://localhost:8080/carts", {
        memberId: loginInfo.memberId,
      });
      console.log("물품 등록 Okay : ", loginInfo.memberId);
    } catch (error) {
      console.error("로그인을 해야합니다.", error);
    }
  };

  return (
    <CardActions>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onSubmit={handleSubmit}
        >
          장바구니 담기
        </Button>
      </form>
    </CardActions>
  );
};

export default Carts;
