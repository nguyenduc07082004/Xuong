import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Header = ({ user }: { user: { username: string } | null }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            W3-Shop
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton href="/">Trang chủ</StyledButton>
            <StyledButton href="/about">Giới thiệu</StyledButton>
            <StyledButton href="/contact">Liên hệ</StyledButton>
            <StyledButton href="/products">Sản phẩm</StyledButton>
            <StyledButton href="/admin">Admin</StyledButton>
            <StyledButton href="/comments">Bình luận</StyledButton>
          </Box>
          <Search>
            <StyledInputBase placeholder="Tìm kiếm..." inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ marginRight: '8px', display: { xs: 'none', md: 'block' } }}>
                  Xin chào, {user.username}
                </Typography>
                <Button variant="outlined" color="inherit" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <StyledButton href="/login">Đăng nhập</StyledButton>
                <Typography variant="body2" sx={{ marginX: '8px', display: { xs: 'none', md: 'block' } }}>|</Typography>
                <StyledButton href="/register">Đăng ký</StyledButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
