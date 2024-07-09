import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Products } from '../type/Interface';

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
            <img src={product.imageUrl} alt={product.name} width="50%"/>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginTop: 1 }}>
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Product;
