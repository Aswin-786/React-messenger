import React from 'react'
import { AuthContext, FirebaseContext } from '../store/Context'

const Search = () => {

  const { firebase } = React.useContext(FirebaseContext)
  const { currentUser, img } = React.useContext(AuthContext)

  // Setting the searchUser and presentUser
  const [searchUser, setSearchUser] = React.useState('')
  const [presentUser, setPresentUser] = React.useState(null)

  // error state for handling errors
  const [error, setError] = React.useState(false)

  // Enter key press event for searching users
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  //  user search event
  const handleSearch = () => {
    firebase.firestore().collection('users')
      .where('userName', '==', searchUser).get()
      .then((res) => {
        try {
          res.forEach((docs) => {
            setPresentUser(docs.data());
            setError(false);
          })
        }
        catch (err) {
          // if no user is found
          setError(true);
        }
      })
      .catch((err) => {
        // if problem with the Firebase query
        setError(true);
      });
  }

  // creating a chat with the presentUser
  const handleClick = () => {

    // Combining the uids
    const combinedId =
      currentUser.uid > presentUser.uid ? currentUser.uid + presentUser.uid : presentUser.uid + currentUser.uid
    try {
      const res = firebase.firestore().collection('chats').doc(combinedId)
      res.get().then((res) => {
        if (!res.exists) {

          // create a chat in chats collection
          firebase.firestore().collection('chats').doc(combinedId).set({ messages: [] })

          // create user chats
          firebase.firestore().collection('userChat').doc(currentUser.uid).update({
            [combinedId + ".userInfo"]: {
              uid: presentUser.id,
              displayName: presentUser.userName,
              photoURL: presentUser.photoURL
            },
            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
          })

          // Updating the user chats for the presentUser
          firebase.firestore().collection('userChat').doc(presentUser.id).update({
            [combinedId + ".userInfo"]: {
              uid: currentUser._delegate.uid,
              displayName: currentUser._delegate.displayName,
              photoURL: img
            },
            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
          })

        } else {

          // Updating the user chats if the chat already exists
          firebase.firestore().collection('userChat').doc(currentUser.uid).update({
            [combinedId + ".userInfo"]: {
              uid: presentUser.uid,
              displayName: presentUser.userName,
              photoURL: presentUser.photoURL
            },
            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
          })

          firebase.firestore().collection('userChat').doc(presentUser.uid).update({
            [combinedId + ".userInfo"]: {
              uid: currentUser._delegate.uid,
              displayName: currentUser._delegate.displayName,
              photoURL: img
            },
            [combinedId + ".date"]: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      })

    } catch (error) {
      setError(true);
    }
    setSearchUser('')
    setPresentUser(null)
  }

  return (

    <div className='flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <i
          className="fa-solid fa-magnifying-glass text-2xl  cursor-pointer mx-2 mt-6 hover:text-gray-300 transition-all"
          onClick={handleSearch}
        />
        <input
          onChange={e => setSearchUser(e.target.value)}
          value={searchUser} onKeyDown={handleKey}
          className=' mt-6 outline-transparent border-transparent bg-transparent p-3 border-b-slate-600 w-full '
          placeholder='search..'
          type="text" />
      </div>
      {error && <span className='text-red-500 text-xs md:text-sm text-center'>** No user found with the specified name **</span>}
      {
        presentUser
        &&
        <div
          onClick={handleClick}
          className=' mt-2 md:p-4 p-2 flex items-center hover:bg-gray-500 transition-all cursor-pointer border-b-[1px] border-b-slate-400'>
          <img
            className='bg-white h-[40px] w-[40px] rounded-full object-cover object-center '
            src={presentUser.photoURL} alt="" />
          <span className='px-4 md:text-xl text-lg font-semibold'>
            {presentUser.userName}
          </span>
        </div>
      }
    </div>
  )
}

export default Search