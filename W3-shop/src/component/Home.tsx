import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Products } from '../type/Interface';
import { getAllProduct } from './Axios/axios';
import Banner from './Banner';
import Product from './Cart';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const getAll = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    getAll();

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Không thể lấy thông tin người dùng từ localStorage:', error);
      }
    }
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Header user={user} />
      <Banner />
      <p>Sản phẩm</p>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
