import './App.css'
import Home from './component/Home'
import { Route,Routes } from 'react-router-dom';
import Admin from './page/admin/Admin';
import Register from './page/SubmitAdmin/Regiter';
import Login from './page/SubmitAdmin/Login';
import ProductDetail from './component/ProductDetail';
import AddProduct from './page/admin/Product/AddProduct';
import EditProduct from './page/admin/Product/EditProduct';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/product/add" element={<AddProduct/>}/>
      <Route path="/product/edit/:productId" element={<EditProduct/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
  )
}

export default App;
