import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Input } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Header from "./Header";
import Footer from "./Footer";
import { Products } from "../type/Interface";

interface CartProduct extends Products {
  quantity: number;
}

const Carts: React.FC = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    
    // Fetch user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    // Update quantity of the item
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: string) => {
    // Remove item from cart
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Header user={user} />
        <Typography variant="h4" component="h1" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header user={user} />
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      <Box my={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img src={item.imageUrl} alt={item.title} width="100" />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton 
                        onClick={() => handleQuantityChange(item._id as string, Math.max(1, item.quantity - 1))} 
                        color="primary"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Input 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id as string, Math.max(1, parseInt(e.target.value)))}
                        type="number"
                        inputProps={{ min: 1 }}
                        sx={{ width: 50, textAlign: 'center' }}
                      />
                      <IconButton 
                        onClick={() => handleQuantityChange(item._id as string, item.quantity + 1)} 
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveItem(item._id as string)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button variant="contained" color="primary" size="large">
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default Carts;
