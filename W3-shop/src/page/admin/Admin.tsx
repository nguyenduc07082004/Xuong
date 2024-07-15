import { useState, useEffect } from 'react';
import { Email, Products } from '../../type/Interface';
import { getAllProduct, getAllSubmit, deleteUser } from '../../component/Axios/axios';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  Button,
  Typography,
  TablePagination,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Admin = () => {
  const [users, setUsers] = useState<Email[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [productPage, setProductPage] = useState(0);
  const [productRowsPerPage, setProductRowsPerPage] = useState(5);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const getAllAdmin = async () => {
      try {
        const data = await getAllSubmit();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllAdmin();

    const getProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <CircularProgress />;

  const handleUserChangePage = (event: unknown, newPage: number) => {
    setUserPage(newPage);
  };

  const handleUserChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRowsPerPage(parseInt(event.target.value, 10));
    setUserPage(0);
  };

  const handleProductChangePage = (event: unknown, newPage: number) => {
    setProductPage(newPage);
  };

  const handleProductChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductRowsPerPage(parseInt(event.target.value, 10));
    setProductPage(0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDeleteUser = async (userId: number|string) => {
    const cofim= window.confirm('are you sure??')
    try {
      if(cofim){
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
      } 
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button>
        <ListItemText >
        <a href=""><Link to='/'>Home</Link></a><hr/>
        </ListItemText>
        </ListItem>

        <ListItem button>
        <ListItemText>
          <a href=""><Link to='/'> Add Product</Link></a><hr/>
          </ListItemText>
        </ListItem>

        <ListItem button>
        <ListItemText>
          <a href=""><Link to='/'> Add Product</Link></a><hr/>
          </ListItemText>
        </ListItem>
        
        <ListItem button>
          <ListItemText>
        <a href=""><Link to='/'>Users</Link></a><hr/>
        </ListItemText>
        </ListItem>

        <ListItem button>
        <ListItemText>
        <a href=""><Link to='/'>Settings</Link></a><hr/>
        </ListItemText>
        </ListItem>

      </List>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        {drawer}
      </Drawer>
      <main style={{ flexGrow: 1, padding: '80px 24px 24px 24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>User</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row" align="center">
                        {user.id}
                      </TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                        <Button variant="contained" color="secondary">Update</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={userRowsPerPage}
                page={userPage}
                onPageChange={handleUserChangePage}
                onRowsPerPageChange={handleUserChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Products</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">imager</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.slice(productPage * productRowsPerPage, productPage * productRowsPerPage + productRowsPerPage).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row" align="center">
                        {product.id}
                      </TableCell>
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center"><img src={product.imageUrl} alt={product.name} width="30%"/></TableCell>
                      <TableCell align="center">{product.description}</TableCell>
                      <TableCell align="center">${product.price}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary">Delete</Button>
                        <Button variant="contained" color="secondary">Update</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={productRowsPerPage}
                page={productPage}
                onPageChange={handleProductChangePage}
                onRowsPerPageChange={handleProductChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Admin;
