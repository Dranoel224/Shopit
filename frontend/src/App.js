// import logo from './logo.svg';
// import './App.css';
import { useEffect, Fragment, useState } from 'react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/ConfirmOrder';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';
import axios from 'axios';
import { Element } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

function App() {

  const [ stripeApiKey, setStripeApiKey ] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
getStripeApiKey()

  }, [])

  return (
    // <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <div className='container container-fluid'>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/search/:keyword' element={<Home/>} />
            <Route exact path='/product/:id' element={<ProductDetails/>} />

            <Route path='/cart' element={<Cart/>} />
            <Route path='/shipping' element={<Shipping/>} />
            <Route path='/order/confirm' celement={<ConfirmOrder/>} />
            {stripeApiKey && 
            <Element stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' element={<Payment/>} />
            </Element>
            }

            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/password/forgot' element={<ForgotPassword/>} />
            <Route path='/password/reset/:token' element={<NewPassword/>} />
            <Route path='/me' element={<Profile/>} />
            <Route path='/me/update' element={<UpdateProfile/>} />
            <Route path='/password/update' element={<UpdatePassword/>} />
        </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    // </BrowserRouter>
  );
}

export default App;
