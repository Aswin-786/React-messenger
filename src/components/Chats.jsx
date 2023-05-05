import React from 'react'
import { AuthContext, FirebaseContext } from '../store/Context'
import { ChatContext } from '../store/ChatContext'
import { useHistory } from 'react-router-dom'

const Chats = () => {

  const { firebase } = React.useContext(FirebaseContext)
  const { currentUser } = React.useContext(AuthContext)
  const { dispatch } = React.useContext(ChatContext)
  const [chats, setChats] = React.useState([])
  const history = useHistory()

  // update state when current user changes
  React.useEffect(() => {
    const getChats = () => {
      const unsub = firebase.firestore().collection('userChat').doc(currentUser._delegate.uid).onSnapshot((doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    // only fetch chats if current user is available
    currentUser._delegate.uid && getChats()
  }, [firebase, currentUser._delegate.uid])

  // selecting a chat user
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  // navigate to the chat page
  const show = () => {
    history.push('/chat')
  }

  return (

    <div>
      {
        Object.entries(chats)?.length > 0 ?
          Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
            <div
              key={chat[0]}
              onClick={() => { handleSelect(chat[1].userInfo); show() }}
              className='mt-2 md:p-4 p-2 flex items-center hover:bg-gray-500 transition-all cursor-pointer'>
              <img
                src={chat[1].userInfo && chat[1].userInfo.photoURL} className={chat[1].userInfo && 'bg-white h-[40px] w-[40px]  rounded-full object-cover object-center '}
                alt="" />
              <div className='pl-4'>
                <span className=' md:text-xl sm:text-lg font-semibold'>{chat[1].userInfo && chat[1].userInfo.displayName}</span>
                <p className='text-sm text-gray-300 md:max-w-[600px] max-w-[250px] break-words'>
                  {(chat[1].lastMessage) && (
                    chat[1].lastMessage.text.length > 100 ?
                      chat[1].lastMessage.text.substring(0, 100) + "..." :
                      chat[1].lastMessage.text
                  )}
                </p>
              </div>
            </div>
          ))
          :
          <div className="text-center text-gray-300 mt-4 md:p-4 p-2">No chats yet. Search for users to start a conversation, or message yourself.
          </div>
      }
    </div>

  )
}

export default Chats