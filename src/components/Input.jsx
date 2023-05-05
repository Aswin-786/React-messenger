import React from 'react'
import { AuthContext, FirebaseContext } from '../store/Context'
import { ChatContext } from '../store/ChatContext'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { v4 as uuid } from 'uuid'
import Picker from 'emoji-picker-react'

const Input = () => {
  const [text, setText] = React.useState("")
  const [img, setImg] = React.useState(null)
  const [showPicker, setShowPicker] = React.useState(false)
  const { currentUser } = React.useContext(AuthContext)
  const { data } = React.useContext(ChatContext)
  const { firebase } = React.useContext(FirebaseContext)

  // to handle send button click
  const handleSend = () => {

    // if there is text or image to send
    if ((text.length > 0) || img) {
      const res = firebase.firestore().collection('chats').doc(data.chatId)

      // If there is an image to send
      if (img) {
        firebase.storage().ref(`${uuid()}/${img}`)
          .put(img)
          .then(({ ref }) => {
            ref.getDownloadURL()
              .then((url) => {
                res.update({
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Date.now(),
                    img: url
                  }),
                })
              })
          })
      }
      // If there is only text to send
      else {
        res.update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Date.now()
          }),
        })
      }

      // Updating last message and date in userChat collection for both sender and receiver of the message
      firebase.firestore().collection('userChat').doc(currentUser.uid).update({
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
      })
      firebase.firestore().collection('userChat').doc(data.user.uid).update({
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    // Resetting after sending messages
    setText('')
    setImg(null)
  }

  // to handle emoji selection
  const onEmojiClick = (event, emojiObject) => {
    setText(prevInput => prevInput + event.emoji);
    setShowPicker(false);
  };

  return (
    <div
      className='h-[70px]  bg-gray-400 p-3 absolute bottom-0 right-0 left-0 rounded-none'>
      <div className='flex items-center'>
        <button
          onClick={() => setShowPicker(value => !value)}
          className='border-none outline-none hover:scale-105'
          data-tooltip-id="file"
          data-tooltip-content="emoji"
        >
          <i class="fa-regular fa-face-smile text-2xl text-black"></i>
        </button>
        <ReactTooltip style={{ backgroundColor: "lightgray", color: "black" }} id="emoji" />
        {
          showPicker
          &&
          <div className='absolute left-5  bottom-24' >
            <Picker height={400} width={300} theme='dark' onEmojiClick={onEmojiClick} />
          </div>
        }
        <input
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
          value={text}
          className='bg-transparent placeholder:text-black outline-none border-none w-full p-3 md:text-lg text-base'
          type="text"
          placeholder='Type your message...' />
        <div className='flex items-center'>
          <input
            onChange={e => setImg(e.target.files[0])}
            className='hidden'
            type="file" name=""
            id="file" />
          <label htmlFor="file">
            <i
              data-tooltip-id="file"
              data-tooltip-content="upload file"
              className="fa-solid fa-image text-slate-900 p-2 rounded-full cursor-pointer hover:scale-105 hover:bg-gray-500 hover:text-slate-200 hover:transition-all transition-all">
            </i>
            <ReactTooltip style={{ backgroundColor: "lightgray", color: "black" }} id="file" />
          </label>
          <button
            onClick={handleSend}
            className='mx-3 outline-none border-none'>
            <i
              data-tooltip-id="send" data-tooltip-content="send"
              className="fa-solid fa-arrow-up-from-bracket text-xl text-slate-900 p-1 px-2 rounded-full cursor-pointer hover:scale-105 hover:bg-gray-500 hover:text-slate-200 hover:transition-all transition-all"></i>
          </button>
          <ReactTooltip style={{ backgroundColor: "lightgray", color: "black" }} id="send" />
        </div>
      </div>
    </div>
  )
}

export default Input