import React from 'react'
import Spinner from './Spinner'

const Loading = () => {
  return (
    <main className='text-white flex flex-col justify-center items-center mt-[calc(100vh/3)]'>
      <Spinner />
    </main>
  )
}

export default Loading
