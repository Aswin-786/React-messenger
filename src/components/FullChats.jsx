import React from 'react'
import Chat from './Chat'

const FullChats = () => {
  return (
    <div className='h-screen bg-bg flex items-center justify-center font-jost '>
      <div className='md:w-[65%] w-full md:h-[80%] h-full overflow-hidden md:rounded-2xl flex'>
        <Chat />
      </div>
    </div>
  )
}

export default FullChats