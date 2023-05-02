import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'

const SharedLayout = () => {
  return (
    <main className='w-full h-full min-h-screen flex flex-col bg-dark-blue items-center'>
      <Navbar />
      <SearchBar category="All" />
      <Outlet/>
    </main>
  )
}

export default SharedLayout
