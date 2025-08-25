import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screen/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './screen/Login';
import Register from './screen/Register';
import { CartProvider } from './component/Contextreducer';
import MyOrder from './screen/MyOrder';

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> 
            <Route path='/register' element={<Register />} />
            <Route path='/myOrder' element={<MyOrder />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
