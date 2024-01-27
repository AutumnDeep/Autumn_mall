import React from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { lighten } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  linkButton: {
    "&:hover": {
      backgroundColor: "transparent", // 마우스 오버 시 배경색을 투명으로 설정
      color: lighten(theme.palette.primary.main, 0.2),
    },
    "&:active":{
      backgroundColor: "transparent",
    //  color: "red",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/members/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const loginInfo = response.data;
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        router.push("/");

        // 로그인 상태 변경 이벤트 발생
        const event = new Event("loginStatusChanged");
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("이메일이나 암호가 틀렸습니다.");
    }
  };
  

  return (
    <Container maxWidth="sm" className={classes.container} component="main">
      {/* 변경된 코드 */}
      <Typography variant="h4" component="h1" gutterBottom>
        로그인
      </Typography>
      <Box component="form" className={classes.form} onSubmit={handleLogin}>
        <TextField
          label="이메일"
          type="email"
          variant="outlined"
          margin="normal"
          style={{ marginBottom: '0.5px' }}  // 원하는 여백 크기를 직접 지정
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          margin="dense"
          style={{ marginBottom: '0.5px' }}  // 원하는 여백 크기를 직접 지정
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <Typography variant="body1" color="error" paragraph>
            {errorMessage}
          </Typography>
        )}
        
        <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>  {/* 수동으로 간격 조절 */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            로그인
          </Button>
        </div>

        <Box display="flex" justifyContent="flex-end">
          <Link href="/findpassword" passHref>
            <Button className={classes.linkButton} color="inherit">비밀번호 찾기</Button>
          </Link>
          <Typography variant="body2" color="textSecondary" style={{ margin: '7px' }}>
            |
          </Typography>
          <Link href="/joinform" passHref>
            <Button className={classes.linkButton} color="inherit">회원가입</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;