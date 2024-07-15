import './App.css'
import Home from './component/Home'
import {useRoutes } from 'react-router-dom';
import Admin from './page/admin/Admin';
import Register from './page/SubmitAdmin/Regiter';
import Login from './page/SubmitAdmin/Login';
import ProductDetail from './component/ProductDetail';

const routeConfig = [
  {
    path: "admin",
    element: <Admin/>,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
];
function App() {
  const router=useRoutes(routeConfig)

  

  return (
     <main>{router}</main>
  )
}

export default App;
