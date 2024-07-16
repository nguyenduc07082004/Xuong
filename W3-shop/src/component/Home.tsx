import {useEffect,useState}from 'react'
import { Products } from '../type/Interface'
import { getAllProduct } from './Axios/axios';
import { Grid, CircularProgress} from '@mui/material';
import Product from './Cart';
import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';



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
    <p>Sản phẩm</p>
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