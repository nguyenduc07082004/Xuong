import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import { User } from "../../type/Interface";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post<User>("http://localhost:3000/users", {
        username,
        email,
        password,
      });
      const { _id } = response.data;

      const token = `token-${_id}`;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      alert("Đăng ký thất bại. Vui lòng thử lại sau.");
      console.error("Đăng ký thất bại:", error);
    }
  };

  return (
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
            Đăng ký
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            />
            <TextField
              label="Email"
              type="email"
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
            <TextField
              label="Xác nhận mật khẩu"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{ maxWidth: "500px", marginBottom: 2 }}
            >
              Đăng ký
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
