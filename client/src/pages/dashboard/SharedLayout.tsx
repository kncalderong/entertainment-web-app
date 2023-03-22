import React from 'react'
import {Outlet} from 'react-router-dom'
const SharedLayout = () => {
  return (
    <main>
      Shared Layout
      <Outlet/>
    </main>
  )
}

export default SharedLayout
