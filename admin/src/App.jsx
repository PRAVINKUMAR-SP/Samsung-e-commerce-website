import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Users from './components/Users'
import Orders from './components/Orders'
import Dashbord from './components/Dashbord'
import AddProduct from './components/AddProduct'
import Products from './components/Products'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/add-products' element={<AddProduct/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/dashboard' element={<Dashbord/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App