import React from 'react'
import Home from './Pages/Home'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './Components/Product'
import Product1 from './Pages/Products'
import Cart from './Pages/Cart'
import Auth from './Pages/Auth'
import Orders from './Pages/Orders'
import ProductDetails from './Pages/ProductDetails'
import OrderConfirmPage from './Pages/OrderConfirmPage'
import Search from './Pages/Search'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product1' element={<Product1 />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route
          path="/order-confirm"
          element={<OrderConfirmPage />}
        />
        <Route

          path="/search/:keyword"

          element={<Search />}

        />
      </Routes>
    </BrowserRouter>
  )
}

export default App