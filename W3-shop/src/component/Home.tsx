import React ,{useEffect,useState}from 'react'
import { Products } from '../type/Interface'
import { fetchAxios } from './Axios/axios';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import Product from './Cart';



const Home = () => {
    const [products, getProducts ]= useState<Products[]>([]);
    const [loading , setLoading]= useState(true);
    useEffect (()=>{
        const getAll= async ()=>{
            try{
               const data= await fetchAxios();
               getProducts(data)
            }catch (error){
              console.log(error)
            }finally{
              setLoading(false)
            }
        }
        getAll();
    },([]));
    if (loading) return <CircularProgress />;
  return (
    <Container>
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  </Container>
);
}
export default Home;