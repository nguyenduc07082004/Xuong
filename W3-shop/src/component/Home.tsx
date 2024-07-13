import {useEffect,useState}from 'react'
import { Products } from '../type/Interface'
import { getAllProduct } from './Axios/axios';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Product from './Cart';
import Header from './Header';
import Footer from './Footer';
import Banner from './Banner';



const Home = () => {
    const [products, getProducts ]= useState<Products[]>([]);
    const [loading , setLoading]= useState(true);
    useEffect (()=>{
        const getAll= async ()=>{
            try{
               const data= await getAllProduct();
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
    <>
    <Header/>
    <Banner/>
       <Grid container spacing={3}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
    <Footer/>
    </>
 
);
}
export default Home;