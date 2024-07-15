import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Products } from "../type/Interface";
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h5" component="p">
            Price: ${product.price}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
