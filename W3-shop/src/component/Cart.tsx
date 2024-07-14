// Product.tsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Products } from '../types/Interface'; // Import interface Products

interface ProductProps {
  product: Products;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography>
          <img src={product.imageUrl} alt={product.name} width="50%" />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
