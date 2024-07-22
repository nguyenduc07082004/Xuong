import { useState, useEffect } from "react";
import { Products, Category } from "../../type/Interface";
import { getAllProduct, deleteProduct, getAllCategories, deleteCategory } from "../../component/Axios/axios";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  CssBaseline,
  Box,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Admin = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productPage, setProductPage] = useState(0);
  const [productRowsPerPage, setProductRowsPerPage] = useState(5);
  const [categoryPage, setCategoryPage] = useState(0);
  const [categoryRowsPerPage, setCategoryRowsPerPage] = useState(5);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
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

    const getCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
    getCategories();
  }, []);

  if (loading) return <CircularProgress />;

  const handleProductChangePage = (event: unknown, newPage: number) => {
    setProductPage(newPage);
  };

  const handleProductChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductRowsPerPage(parseInt(event.target.value, 10));
    setProductPage(0);
  };

  const handleCategoryChangePage = (event: unknown, newPage: number) => {
    setCategoryPage(newPage);
  };

  const handleCategoryChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryRowsPerPage(parseInt(event.target.value, 10));
    setCategoryPage(0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDeleteProduct = async (productId: number | string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    try {
      if (confirm) {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: number | string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    try {
      if (confirm) {
        await deleteCategory(categoryId);
        setCategories(categories.filter((category) => category._id !== categoryId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          to="/products/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
        </Link>
        <Link
          to="/categories/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link
          to="/settings"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const getCategoryNameById = (categoryId: string|undefined) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name:"iphon"
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
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
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ marginTop: 4, overflowX: "auto" }}
            >
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(
                      productPage * productRowsPerPage,
                      productPage * productRowsPerPage + productRowsPerPage
                    )
                    .map((product) => (
                      <TableRow key={product._id}>
                        <TableCell component="th" scope="row" align="center">
                          {product._id}
                        </TableCell>
                        <TableCell align="center">{product.title}</TableCell>
                        <TableCell align="center">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            width="100"
                            height="100"
                          />
                        </TableCell>
                        <TableCell align="center">${product.price}</TableCell>
                        <TableCell align="center">{getCategoryNameById(product.category)}</TableCell>
                        <TableCell align="center">
                          {product.description}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteProduct(product._id!)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginLeft: 1 }}
                          >
                            <Link
                              to={`/products/edit/${product._id}`}
                              style={{ color: "#FFF", textDecoration: "none" }}
                            >
                              <EditIcon />
                            </Link>
                          </Button>
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
        <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Categories
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ marginTop: 4, overflowX: "auto" }}
            >
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .slice(
                      categoryPage * categoryRowsPerPage,
                      categoryPage * categoryRowsPerPage + categoryRowsPerPage
                    )
                    .map((category) => (
                      <TableRow key={category._id}>
                        <TableCell component="th" scope="row" align="center">
                          {category._id}
                        </TableCell>
                        <TableCell align="center">{category.name}</TableCell>
                        <TableCell align="center">{category.description}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteCategory(category._id!)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginLeft: 1 }}
                          >
                            <Link
                              to={`/categories/edit/${category._id}`}
                              style={{ color: "#FFF", textDecoration: "none" }}
                            >
                              <EditIcon />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={categoryRowsPerPage}
                page={categoryPage}
                onPageChange={handleCategoryChangePage}
                onRowsPerPageChange={handleCategoryChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
