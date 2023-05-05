import React from 'react'
import Messages from './Messages'
import { ChatContext } from '../store/ChatContext'
import { useHistory } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Chat = () => {
  const { data } = React.useContext(ChatContext)
  const history = useHistory()

  // back to home
  const handleHome = () => {
    history.push('/')
  }

  return (
    <div className='flex-[2] relative h-full'>
      <div className='h-[70px] bg-navBar flex items-center justify-between p-3'>
        <div className='flex items-center justify-center'>
          <i
            onClick={handleHome}
            className="fa-solid fa-arrow-left text-slate-300 cursor-pointer text-2xl"></i>
          <img
            className='bg-white h-[40px] w-[40px] md:h-[50px] md:w-[50px] rounded-full object-cover object-center ml-2 '
            src={data.user?.photoURL}
            alt="" />
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={`${data.user?.displayName}`}
            className='text-yellow-50 text-xl md:text-3xl px-3 font-semibold'>
            {
              data.user?.displayName
            }
          </span>
        </div>
        <ReactTooltip
          place='right'
          style={{ backgroundColor: "lightgray", color: "black" }}
          id="my-tooltip" />
        <div className=' flex text-slate-300 cursor-pointer'>
          <i
            className="fa-solid fa-video mr-5"
            data-tooltip-id="video"
            data-tooltip-content="video"
          >
          </i>
          <ReactTooltip
            style={{ backgroundColor: "lightgray", color: "black" }}
            id="video" />
          <i
            className="fa-solid fa-user mr-5"
            data-tooltip-id="account"
            data-tooltip-content="account"
          >
          </i>
          <ReactTooltip
            style={{ backgroundColor: "lightgray", color: "black" }}
            id="account" />
          <i
            className="fa-solid fa-ellipsis"
            data-tooltip-id="more" data-tooltip-content="more"
          >
          </i>
          <ReactTooltip
            style={{ backgroundColor: "lightgray", color: "black" }}
            id="more" />
        </div>
      </div>
      <Messages />
    </div>
  )
}

export default Chat