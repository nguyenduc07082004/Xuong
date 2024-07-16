import { Link} from 'react-router-dom';
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
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[200], 1),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
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

const Header = () => {
  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              W3-Shop
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <StyledButton href="/">Trang chủ</StyledButton>
            <StyledButton href="/about">Giới thiệu</StyledButton>
            <StyledButton href="/contact">Liên hệ</StyledButton>
            <StyledButton href="/products">Sản phẩm</StyledButton>
            <StyledButton href="/reviews">Đánh giá</StyledButton>
            <StyledButton href="/comments">Bình luận</StyledButton>
          </Box>
          <Search>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            <StyledButton>Đăng nhập</StyledButton>
            <Typography variant="body2" sx={{ marginX: '8px' }}>|</Typography>
            <StyledButton><Link to = "/register">Đăng ký </Link></StyledButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;


