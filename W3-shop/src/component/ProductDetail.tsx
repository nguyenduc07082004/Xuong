import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Products } from '../type/Interface'; // Thay đổi path tới types



interface ProductDetailProps {
  products: Products[]; // Thay đổi kiểu dữ liệu nếu cần
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>(); // Lấy productId từ URL

  // Tìm sản phẩm trong danh sách theo productId
  const product = products.find((prod) => prod.id === productId);

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
