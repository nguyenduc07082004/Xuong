import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { Products } from '../type/Interface';

interface ProductProps {
  product: Products;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleAddToCart = () => {
    if (!user) {
      // If no user is logged in, redirect to login page
      navigate("/login");
      return;
    }

    // Redirect to the product detail page or handle add to cart logic here
    navigate(`/cart`);
  };

  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography>
          <img src={product.imageUrl} alt={product.title} width="50%" />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
