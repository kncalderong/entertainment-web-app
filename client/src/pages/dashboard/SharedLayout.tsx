import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const SharedLayout = () => {
  return (
    <main className='w-full h-screen flex flex-col bg-dark-blue items-center'>
      <Navbar/>
      <Outlet/>
    </main>
  )
}

export default SharedLayout
