import React from 'react'
import { FirebaseContext } from '../store/Context';
import { useHistory, Link } from 'react-router-dom'

const Login = () => {

  const { firebase } = React.useContext(FirebaseContext)
  const history = useHistory()
  const [error, setError] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    // login with email and password
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push('/')
    }).catch((error) => setError(true))
  }

  return (

    <div className='h-[100vh] w-full bg-screen  flex flex-col items-center justify-center font-poppins overflow-y-hidden'>
      <h1 className='text-center md:text-6xl text-5xl font-bold text-white md:py-10 md:-mt-10 py-8'>Chatly</h1>
      <div className='w-[90%] md:w-[400px] md:h-[400px] h-[350px] flex flex-col items-center justify-center bg-gray-100 rounded-xl p-5'>
        <h2 className='text-center text-2xl mb-5 font-semibold'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className=' flex items-center justify-center flex-col mt-8 '>
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
          <button className='outline-transparent border-transparent w-1/2 py-2 text-white bg-cyan-500 rounded-md hover:opacity-70'>SignUp</button>
          {
            error
            &&
            <span className='text-xs text-red-500 my-2'>
              something went wrong..
            </span>
          }
          <p className='text-slate-500 text-xs md:text-base  mt-4 '>
            Don't have an account yet?
            <span className='text-black  '>
              <Link to='/signup'>
                Sign up now!
              </Link>
            </span></p>
        </form>
      </div>
    </div>

  )
}

export default Login