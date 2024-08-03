import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Products } from '../type/Interface';

interface ProductProps {
  product: Products;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Thêm sản phẩm vào giỏ hàng trong localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex((item: any) => item._id === product._id);

    if (productIndex > -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
      cart[productIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng với số lượng 1
      const productWithQuantity = { ...product, quantity: 1 };
      cart.push(productWithQuantity);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate(`/cart`);
  };

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card variant="outlined" sx={{ margin: 2, maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {product.title}
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
          <img src={product.imageUrl} alt={product.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.description}
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginTop: 1, textAlign: 'center' }}>
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button size="small" onClick={handleViewDetails}>
          Xem chi tiết sản phẩm
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
