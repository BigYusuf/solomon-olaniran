import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Head from 'next/head'
import TransitionEffect from '../components/TransitionEffect'
import AnimatedText from '../components/AnimatedText'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  
  const router = useRouter()
    const {signin } = useAuth()

  async function submitHandler() {
    if (!email || !password) {
        setError('Please enter email and password')
        return
    }
    try {
        await signin(email, password)
        router.push('/dashboard')
    } catch (err) {
        setError('Incorrect email or password')
    }
    return
  }
useEffect(() => {
        if(error){
            setTimeout(()=>{
                setError("")
            }, 3000)
        }
    }, [error])

  return (
    <>
    <Head>
        <title>Endurance Ogbeide | Login Page</title>
        <meta name="description" content="Only the special can access" />
       
    </Head>
    <TransitionEffect />
    <main className='flex flex-col dark:text-light h-[78vh] flex-1 text-xs sm:text-sm justify-center items-center gap-4 sm:gap-6 xs:mx-6'>
      
      
      <AnimatedText className='mb-16 lg:!text-7xl sm:!text-6xl sm:mb-8 xs:!text-4xl'
        text={"Only the Chosen one!"}/> 
      {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' 
        className='outline-none h-12 duration-300 border-t-[1px] border-l-[1px] border-r-4 border-b-4 border-solid rounded-[1rem] xs:rounded-[0.5rem] border-dark dark:border-white text-slate-900 p-2 w-full max-w-[40ch] dark:focus:border-primary focus:border-primaryDark' />
        
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' 
        className='h-12 outline-none rounded-[1rem] xs:rounded-[0.5rem] border-t-[1px] border-l-[1px] border-r-4 border-dark dark:border-white text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-4 border-solid dark:focus:border-primary focus:border-primaryDark' />
      
        <button 
        onClick={submitHandler}
        className=' max-w-[40ch] flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
        font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
          Login
        </button>

    </main>
    </>
  )
}


export default LoginPage