import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='flex-[1] bg-screen relative text-white overflow-x-hidden overflow-y-scroll'>
      <div className=' w-full'>
        <Navbar />
      </div>
      <div className=''>
        <Search />
        <Chats />
      </div>
    </div>
  )
}

export default Sidebar