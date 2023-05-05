import React from 'react'
import '../index.css';
import { FirebaseContext } from '../store/Context';
import { useHistory, Link } from 'react-router-dom'

const Signup = () => {
  // accessing 
  const { firebase } = React.useContext(FirebaseContext)
  const [image, setImage] = React.useState(null)
  const [dp, setDp] = React.useState(false)
  const history = useHistory()
  const [error, setError] = React.useState(false)

  const handleSumbit = (e) => {
    e.preventDefault()
    // get form data
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    if (file == null) {
      setDp(true)
      return
    }
    // create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // update user profile with display name
        result.user.updateProfile({ displayName: displayName })
          .then(() => {
            // upload profile picture to storage
            firebase.storage().ref(`/image/${displayName}/${result.user.uid}`)
              .put(file)
              .then(({ ref }) => {
                ref.getDownloadURL()
                  .then((url) => {
                    // add user details to firestore
                    firebase.firestore().collection('users').doc(result.user.uid)
                      .set({
                        uid: result.user.uid,
                        userName: displayName,
                        email: email,
                        photoURL: url
                      })
                  })
              })
          })
          .then(() => {
            // create a userChat document in firestore
            firebase.firestore().collection('userChat').doc(result.user.uid).set({})
            history.push('/')
          })
      })
      .catch((error) => setError(true))
  }

  return (
    <div className='h-[100vh] w-full bg-screen flex flex-col items-center justify-center font-poppins'>
      <h1 className='text-center text-5xl md:text-6xl font-bold text-white md:py-10 md:-mt-10 py-8'>Chatly</h1>
      <div className='md:w-[400px] w-[90%]  bg-gray-100  rounded-xl p-5'>
        <h1 className='text-center text-2xl font-semibold'>Signup</h1>
        <form
          onSubmit={handleSumbit}
          className=' flex items-center justify-center flex-col mt-8 '>
          <input
            className='xs:w-[250px] w-[300px] mb-8 outline-none p-2  border-b-2 border-b-slate-300 bg-transparent'
            required
            placeholder='User Name'
            type="text" />
          <input
            className='xs:w-[250px] w-[300px] mb-8 outline-none p-2  border-b-2 border-b-slate-300 bg-transparent'
            required
            placeholder='email'
            type="email" />
          <input
            className='xs:w-[250px] w-[300px] mb-8 outline-none p-2  border-b-2 border-b-slate-300 bg-transparent'
            required
            placeholder='password'
            type="password" />
          <div className='flex flex-row items-center justify-between'>
            <div>
              <input
                id='file'
                onChange={(e) => setImage(e.target.files[0])}
                className='hidden xs:w-[250px] w-[300px] mb-8 outline-none cursor-pointer text-gray-400 border-none '
                required
                type="file" />
              <label
                htmlFor="file"
                className='mb-8 text-[12px] cursor-pointer'
              >
                <i className="fa-solid fa-image text-slate-600 text-2xl pr-2"></i>
                add profile picture
              </label>
            </div>
            <div className='w-14 h-14 ml-7'>
              {
                image
                &&
                <img
                  className='rounded-full w-14 h-14 object-cover'
                  alt="Posts"
                  src={image && URL.createObjectURL(image)} />
              }
            </div>
          </div>
          <button className='outline-transparent mt-3 border-transparent w-1/2 py-2 text-white bg-cyan-500 rounded-md hover:opacity-70'>SignUp</button>
          <p className='text-slate-500 mt-4 text-base xs:text-xs'>
            Already registered?
            <span className='text-black  '>
              <Link to='/login'>
                Sign in
              </Link>
            </span>
          </p>
          <p className='text-red-600 mt-4 text-base xs:text-xs'>
            {
              error && 'something went wrong'
            }
            {
              dp && 'upload profile picture'
            }
          </p>
        </form>

      </div>
    </div>

  )
}

export default Signup