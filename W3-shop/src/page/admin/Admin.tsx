import {useState,useEffect} from 'react'
import { Email, Products } from '../../type/Interface';
import { getAllProduct, getAllSubmit } from '../../component/Axios/axios';
import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container} from '@mui/material';
import Sidebar from './type/Siber';

const Admin = () => {
    const [users,getUsers] = useState<Email[]>([]);
    const [products,getProduct] =useState<Products[]>([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
      const getAllAdmin= async ()=>{
        try{
            const data =await getAllSubmit();
            getUsers(data)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
      }
      getAllAdmin();
      const getProducts= async ()=>{
        try{
            const data =await getAllProduct();
            getProduct(data)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
      }
      getProducts();
    },([]));
    if (loading) return <CircularProgress />;
  return (

    <Container>
    <h1>User</h1>
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Pass</TableCell>
          <TableCell align="center">UserName</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell component="th" scope="row" align="center">
              {user.id}
            </TableCell>
            <TableCell align="center">{user.username}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.password}</TableCell>
            <TableCell align="center">{user.confirmPassword}</TableCell>
            <TableCell align="center"><button>Delete</button><button>Update</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <hr />
  <h1>Products</h1>
  <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row" align="center">
                {product.id}
              </TableCell>
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="center">{product.description}</TableCell>
              <TableCell align="center">${product.price}</TableCell>
              <TableCell align="center"><button>Delete</button><button>Update</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  )
}
export default Admin;