import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/SearchBar'

const SharedLayout = () => {
  return (
    <main className='w-full h-full min-h-screen flex flex-col bg-dark-blue items-center md:p-6 lg:flex-row lg:items-start lg:gap-9 lg:p-8'>
      <Navbar />
      <div className='flex flex-col w-full'>
        <SearchBar />
        <Outlet/>
      </div>      
    </main>
  )
}

export default SharedLayout
