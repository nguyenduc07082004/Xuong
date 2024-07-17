import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { User } from '../../type/Interface';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Không được để trống bất kỳ trường nào!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Nhập lại mật khẩu không đúng');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email không hợp lệ');
      return;
    }

    const passwordRegex = /(?=.*[A-Z])|(?=.*\d)|(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
      alert('Mật khẩu phải có ít nhất một ký tự viết hoa, số hoặc ký tự đặc biệt');
      return;
    }

    try {
      const newUser: User = {
        id: Math.floor(Math.random() * 1000), // Dummy ID generation for demo purpose
        username,
        email,
        password,
        token: generateToken(),
      };

      // Send POST request to register user
      const response = await axios.post('http://localhost:3000/users', newUser);
      
      if (response.status === 201) {
        alert('Đăng ký thành công!');
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      alert('Lỗi khi đăng ký người dùng');
      console.error('Lỗi khi đăng ký người dùng:', error);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2); // Simple token generation for demonstration
  };

  return (
    <Grid justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: '600px', margin: 'auto', minHeight: '400px' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: 2 }}>
            Đăng ký
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: '500px', marginBottom: 2 }}
              InputProps={{ sx: { fontSize: 'inherit' } }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: '500px', marginBottom: 2 }}
              InputProps={{ sx: { fontSize: 'inherit' } }}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: '500px', marginBottom: 2 }}
              InputProps={{ sx: { fontSize: 'inherit' } }}
            />
            <TextField
              label="Nhập lại mật khẩu"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ maxWidth: '500px', marginBottom: 2 }}
              InputProps={{ sx: { fontSize: 'inherit' } }}
            />
            <Button variant="contained" color="primary" onClick={handleRegister} sx={{ maxWidth: '500px', marginBottom: 2 }}>
              Đăng ký
            </Button>
            {message && <Typography sx={{ color: 'red', fontSize: 'inherit' }}>{message}</Typography>}
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
