import './App.css'
import Home from './component/Home'
import { Route,Routes } from 'react-router-dom';
import Admin from './page/admin/Admin';
import Register from './page/SubmitAdmin/Regiter';
import Login from './page/SubmitAdmin/Login';
import ProductDetail from './component/ProductDetail';
import AddProduct from './page/admin/Product/AddProduct';
import EditProduct from './page/admin/Product/EditProduct';
import AddCategory from './page/admin/Category/AddCategory';
import EditCategory from './page/admin/Category/EditCategory';
import Carts from './component/Carts';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail/>}/>
      <Route path="/products/add" element={<AddProduct/>}/>
      <Route path="/products/edit/:productId" element={<EditProduct/>}/>
      <Route path="/categories/add" element={<AddCategory/>}/>
      <Route path="/categories/edit/:categoryId" element={<EditCategory/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/cart" element={<Carts />} />
     </Routes>
  )
}

export default App;

