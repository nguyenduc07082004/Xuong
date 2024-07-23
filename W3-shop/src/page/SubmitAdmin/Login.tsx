import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import { User } from "../../type/Interface";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      const response = await axios.post<User>(
        `http://localhost:3000/users/login`,{email,password}
      );

      if (response.status !== 200) {
        alert("Đăng nhập thất bại. Email hoặc mật khẩu không đúng.");
        return;
      }
      const data=response.data.user

      const { _id } = data._id;
      const token = `token-${_id}`;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <>
    <Grid
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            maxWidth: "600px",
            margin: "auto",
            minHeight: "300px",
          }}
        > 
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ marginBottom: 2 }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            >
              Đăng nhập
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default Login;
