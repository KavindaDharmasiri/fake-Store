import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from "../pages/DashBoard";
import Product from "../pages/ProductManage";
import Cart from "../pages/CartManage";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/dashBoard' element={<DashBoard/>}/>
        <Route exact path='/product' element={<Product/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
    </Routes>

  );
}

export default App;
