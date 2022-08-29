import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from "../pages/DashBoard";
import Product from "../pages/ProductManage";
import Cart from "../pages/CartManage";
import MiniDrawer from "../components/Drawer"
import {Routes, Route} from "react-router-dom";


function App() {
  return (
      <Routes>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<MiniDrawer />}>
              <Route path='/dashBoard' element={<DashBoard/>}/>
              <Route path='/product' element={<Product/>}/>
              <Route path='/cart' element={<Cart/>}/>
          </Route>
      </Routes>

  );
}

export default App;
