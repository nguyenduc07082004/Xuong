import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Products } from "../type/Interface";
import { Container, Typography, Card, CardMedia, Box, Grid, Button} from '@mui/material';
import Header from './Header';
import Footer from "./Footer";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // State for quantity, default 1

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log(`Added ${quantity} ${product?.name} to cart`);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Header />
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={product.imageUrl}
                alt={product.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Quantity:
              <Button variant="outlined" size="small" onClick={handleDecreaseQuantity}>
                -
              </Button>
              <Typography variant="body1" component="span" style={{ margin: '0 8px' }}>
                {quantity}
              </Typography>
              <Button variant="outlined" size="small" onClick={handleIncreaseQuantity}>
                +
              </Button>
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default ProductDetail;
