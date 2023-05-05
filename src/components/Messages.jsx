import React from 'react'
import Message from './Message'
import Input from './Input'
import { ChatContext } from '../store/ChatContext'
import { FirebaseContext } from '../store/Context'

const Messages = () => {
  const [messages, setMessages] = React.useState([])
  const { data } = React.useContext(ChatContext)
  const { firebase } = React.useContext(FirebaseContext)

  // to fetch messages data
  React.useEffect(() => {
    const unsub = firebase.firestore().collection('chats').doc(data.chatId).onSnapshot((doc) => {
      doc.exists && setMessages(doc.data().messages)
    })
    return () => {
      unsub()
    }
  }, [data.chatId])

  return (
    <div className='messages'>
      {
        messages.map(m => (
          <Message message={m} key={m.id} />
        ))
      }
      <div className='w-full'>
        <Input />
      </div>
    </div>
  )
}

export default Messages