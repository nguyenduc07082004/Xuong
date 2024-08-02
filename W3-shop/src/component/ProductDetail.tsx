import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Products } from "../type/Interface";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Header from "./Header";
import Footer from "./Footer";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [product, setProduct] = useState<Products | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Không thể lấy thông tin người dùng từ localStorage:",
          error
        );
      }
    }
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Get existing cart from local storage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if item is already in the cart
      const itemIndex = cart.findIndex((item: Products) => item._id === product._id);
      
      if (itemIndex > -1) {
        // Update quantity of existing item
        cart[itemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        cart.push({ ...product, quantity });
      }
      
      // Save updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      console.log(`Added ${quantity} ${product.title} to cart`);
      navigate("/cart"); // Redirect to the cart page
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Header user={user} />
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={product.imageUrl}
                alt={product.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography
                variant="h5"
                component="p"
                color="text.secondary"
                gutterBottom
              >
                Price: ${product.price}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                Quantity:
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleDecreaseQuantity}
                  sx={{ marginX: 1 }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" component="span">
                  {quantity}
                </Typography>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleIncreaseQuantity}
                  sx={{ marginX: 1 }}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {product.description}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default ProductDetail;
