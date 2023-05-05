import React, { useEffect } from 'react'
import { AuthContext, FirebaseContext } from '../store/Context'
import { useHistory } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Navbar = () => {
  const { firebase } = React.useContext(FirebaseContext)
  const history = useHistory()
  const { currentUser, setImg, img } = React.useContext(AuthContext)
 // Get the user ID from the currentUser object
 let userID = currentUser._delegate.uid

// user's profile image from Firestore
  useEffect(() => {
    firebase.firestore().collection('users')
      .where('uid', '==', userID)
      .get().then((res) => {
        res.forEach((docs) => {
          setImg(docs.data().photoURL)
        })
      })
  }, [])

  // user signout
  const signOut = () => {
    firebase.auth().signOut()
    history.push('/login')
  }

  return (

    <div className='h-[70px] bg-navBar flex items-center justify-between p-3 '>
      <span className='font-extrabold md:text-4xl text-xl tracking-widest'>Chatly</span>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center text-[11px]'>
          <img className='bg-white h-[50px] w-[50px] rounded-full object-cover object-center ' src={img} alt="" />
          <span className=' p-2 uppercase md:text-base text-xs'>{currentUser.displayName}</span>
        </div>
        <button
         onClick={signOut} 
         data-tooltip-id="logout" data-tooltip-content="logout"
         className='p-2 outline-none border-none cursor-pointer ml-2 bg-gray-700 rounded-full text-[11px] hover:opacity-70'>
          Logout
          </button>
          <ReactTooltip style={{ backgroundColor: "lightgray", color: "black" }} id="logout" />
      </div>
    </div>
  )
}

export default Navbar