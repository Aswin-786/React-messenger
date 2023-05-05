import React from 'react'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='h-screen bg-bg flex items-center justify-center font-jost '>
      <div className='md:w-[65%] w-full md:h-[80%] h-full overflow-hidden md:rounded-2xl flex'>
        <Sidebar />
      </div>
    </div>
  )
}

export default Home