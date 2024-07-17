import  { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu!');
      return;
    }

    try {
      // Gửi yêu cầu GET để kiểm tra thông tin đăng nhập
      const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`);
      
      if (response.data.length === 0) {
        alert('Đăng nhập thất bại. Tên đăng nhập hoặc mật khẩu không đúng.');
        return;
      }

      const { token, user } = response.data[0];

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Đăng nhập thành công!');
      navigate('/'); 
    } catch (error) {
      alert('Đăng nhập thất bại. Vui lòng thử lại sau.');
      console.error('Đăng nhập thất bại:', error);
    }
  };

  return (
    <Grid justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: '600px', margin: 'auto', minHeight: '300px' }}>
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
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ maxWidth: '500px', marginBottom: 2 }}>
              Đăng nhập
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
