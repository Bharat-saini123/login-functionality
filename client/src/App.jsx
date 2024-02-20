import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import styled from 'styled-components';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import PhoneLogin from './Pages/PhoneLogin';
import ForgotByEmail from './Pages/ForgotByEmail';
import ForgotByPhone from './Pages/ForgotByPhone';
import AfterLoginPage from './Pages/AfterLoginPage';
import Newpassword from './Pages/Newpassword';

const App = () => {
  return (
   <BrowserRouter>
   
   <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/after' element={<AfterLoginPage/>}/>
    <Route path='/newpassword' element={<Newpassword/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/phonelogin' element={<PhoneLogin/>}/>
    <Route path='/forgotemail' element={<ForgotByEmail/>}/>
    <Route path='/forgotphone' element={<ForgotByPhone/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App