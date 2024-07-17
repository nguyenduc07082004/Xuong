import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async () => {
    // Kiểm tra không để ô trống
    if (!username || !password) {
      setMessage('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu');
      return;
    }

    try {
      // Gọi API để lấy danh sách users từ db.json
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;

      // Tìm user có username và password tương ứng
      const foundUser = users.find((user: any) => user.username === username && user.password === password);

      if (foundUser) {
        if (foundUser.token) {
          // Nếu user đã có token, chuyển hướng đến trang Home
          navigate('/');
        } else {
          // Nếu user chưa có token, tạo mới và lưu vào db.json
          const updatedUser = { ...foundUser, token: generateToken() };
          await axios.put(`http://localhost:3000/users/${foundUser.id}`, updatedUser);
          // Lưu token vào localStorage (nếu cần)
          localStorage.setItem('token', updatedUser.token);
          // Chuyển hướng đến trang Home
          navigate('/');
        }
      } else {
        // Hiển thị thông báo lỗi khi tên đăng nhập không tồn tại hoặc mật khẩu không đúng
        setMessage('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi đăng nhập');
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2); // Đoạn mã đơn giản để sinh token
  };

  return (
    <Container>
      <Grid >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
              Đăng nhập
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }} // Đặt chiều rộng 100% cho TextField
                InputProps={{ sx: { fontSize: 'inherit' } }} // Sử dụng font size mặc định
              />
              <TextField
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ width: '100%' }} // Đặt chiều rộng 100% cho TextField
                InputProps={{ sx: { fontSize: 'inherit' } }} // Sử dụng font size mặc định
              />
              <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: '100%' }}>
                Đăng nhập
              </Button>
              {message && <Typography color="error">{message}</Typography>}
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
