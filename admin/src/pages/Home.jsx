import React from 'react'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className="home flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1"></div>
    </div>
  )
}

export default Home