import './App.css'
import Home from './component/Home'
import { Route,Routes } from 'react-router-dom';
import Admin from './page/admin/Admin';
import Register from './page/SubmitAdmin/Regiter';
import Login from './page/SubmitAdmin/Login';

function App() {

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/product:id'/>
      <Route path="/admin" element={<Admin/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
  )
}

export default App;
