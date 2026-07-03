import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Product from '../Components/Product'

const Home = () => {
  return (
    <div className="home">
        <Navbar/>
        <Banner/>
        <Product/>
    </div>
  )
}

export default Home