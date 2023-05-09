import { useState, useRef, useEffect } from 'react'
import LogoMovie from '../assets/logo.svg'
import validateEmail from '../utils/emailValidator'
import axios, { AxiosError } from 'axios'
import { useAppDispatch } from '../store/hooks'
import { addUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

interface ServerErrorResponse {
  msg: string
}


const SignIn = () => {

  const [signInOption, setSignInOption] = useState<"login" | "register">("login")
  const emailRef = useRef<HTMLInputElement>(null)
  const [emailAlert, setEmailAlert] = useState({
    showAlert: false,
    alertMessage: "Can't be empty"
  })
  const passwordRef = useRef<HTMLInputElement>(null)
  const [passwordAlert, setPasswordAlert] = useState({
    showAlert: false,
    alertMessage: "Must be at least 6 characters long"
  })
  const repeatPasswordRef = useRef<HTMLInputElement>(null)
  const [repeatPasswordAlert, setRepeatPasswordAlert] = useState({
    showAlert: false,
    alertMessage: "Can't be empty"
  })
  
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const resetForm = () => {
    emailRef.current!.value = ""
    passwordRef.current!.value = ""
    repeatPasswordRef.current!.value = ""
  }

  const submitHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (emailRef.current!.value.length < 1) {
      emailRef.current!.focus()
      setEmailAlert((prevValue) => {
        return { ...prevValue, showAlert: true }
      })
      return
    }
    if (!validateEmail(emailRef.current!.value)) {
      emailRef.current!.focus()
      setEmailAlert({ alertMessage: 'Please provide a valid email', showAlert: true })
      return
    }
    if (passwordRef.current!.value.length < 6) {
      passwordRef.current!.focus()
      setPasswordAlert((prevValue) => {
        return { ...prevValue, showAlert: true }
      })
      return
    }
    if (signInOption === "register") {
      if (repeatPasswordRef.current!.value.length < 1) {
        repeatPasswordRef.current!.focus()
        setRepeatPasswordAlert((prevValue) => {
          return { ...prevValue, showAlert: true }
        })
        return
      }
      if (repeatPasswordRef.current!.value !== passwordRef.current!.value) {
        repeatPasswordRef.current!.focus()
        setRepeatPasswordAlert({ alertMessage: "Passwords should match", showAlert: true })
        return
      }
    }
    if (signInOption === "login") {
      const urlLogin = "/api/v1/auth/login"
      try {
        const res = await axios.post(urlLogin, { email: emailRef.current!.value, password: passwordRef.current!.value })
        const user = res.data.user
        dispatch(
          addUser({...user})
        )
        navigate('/')
        console.log("user: ", user);   
                
      } catch (error) {
        const err = error as AxiosError
        if (err.response?.status === 401) {
          setPasswordAlert({ alertMessage: 'Invalid credentials', showAlert: true })
        }
      }      
    }
    if (signInOption === "register") {
      const urlRegister = "/api/v1/auth/register"
      try {
        const res = await axios.post(urlRegister, { email: emailRef.current!.value, password: passwordRef.current!.value })
        const user = res.data.user
        dispatch(
          addUser({...user})
        )
        navigate('/')
        console.log("user: ", user); 
      } catch (error) {
        const err = error as AxiosError
        const errMsg = err.response!.data as ServerErrorResponse
        if (errMsg.msg === "Email already in use") {
          setPasswordAlert({alertMessage: "Email already in use", showAlert: true })
        }
      }
    }
  }


  return (
    <main className='w-full h-screen flex flex-col bg-dark-blue items-center'>
      <div className='block w-[32px] h-[26px] mt-12 mb-[59px] md:mt-[80px] md:mb-[72px]' >
        <img src={LogoMovie} alt="logo-movies" className='w-full block' />
      </div>
      <form className='w-[90%] max-w-[327px] bg-semi-dark-blue p-6 rounded-[10px] md:max-w-[400px] md:p-8' onSubmit={submitHandle} >
        <h3 className='text-white text-[32px] mb-10'>{signInOption === "login" ? 'Login' : 'Sign Up'}</h3>
        <div className='flex flex-col relative' >
          <input type="email" name='email' placeholder='Email address' className={`bg-semi-dark-blue border-b-[1px] border-greyish-blue text-white px-4 pb-4 pt-0 focus-visible:outline-none cursor-pointer caret-red ${emailAlert.showAlert ? 'focus-visible:border-red' : 'focus-visible:border-white'} mb-6 focus-visible:bg-semi-dark-blue `} ref={emailRef} onChange={() => {
            if (emailAlert.showAlert) {
              setEmailAlert({
                showAlert: false,
                alertMessage: "Can't be empty"
              })
            }
          }} />
          {emailAlert.showAlert && (<span className='absolute text-[13px] text-red right-0 top-[1px]' >{emailAlert.alertMessage}</span>)}
        </div>
        <div className='flex flex-col relative'>
          <input type="password" name="password" placeholder='Password' className={`bg-semi-dark-blue border-b-[1px] border-greyish-blue text-white px-4 pb-4 pt-0 focus-visible:outline-none cursor-pointer caret-red ${signInOption === "login" ? 'mb-10' : 'mb-6'}  ${passwordAlert.showAlert ? 'focus-visible:border-red' : 'focus-visible:border-white'}`} ref={passwordRef} onChange={() => {
            if (passwordAlert.showAlert) {
              setPasswordAlert({
                showAlert: false,
                alertMessage: "Must be at least 6 characters long"
              })
            }
          }} />
          {passwordAlert.showAlert && (<span className='absolute text-[13px] text-red right-0 top-[1px]' >{passwordAlert.alertMessage}</span>)}
        </div>
        {signInOption === 'register' && (
          <div className='flex flex-col relative'>
            <input type="password" name="password" placeholder='Repeat password' className={`bg-semi-dark-blue border-b-[1px] border-greyish-blue text-white px-4 pb-4 pt-0 focus-visible:outline-none cursor-pointer caret-red ${repeatPasswordAlert.showAlert ? 'focus-visible:border-red' : 'focus-visible:border-white'} mb-6 focus-visible:bg-semi-dark-blue `} ref={repeatPasswordRef} onChange={() => {
              if (repeatPasswordAlert.showAlert) {
                setRepeatPasswordAlert({
                  showAlert: false,
                  alertMessage: "Can't be empty"
                })
              }
            }} />
            {repeatPasswordAlert.showAlert && (<span className='absolute text-[13px] text-red right-0 top-[1px]' >{repeatPasswordAlert.alertMessage}</span>)}
          </div>
        )}
        <button className='w-full py-[14px] text-white rounded-md bg-red cursor-pointer mb-6 lg:hover:bg-white lg:hover:text-dark-blue' type="submit">{signInOption === 'login' ? 'Login to your account' : 'Create an account'}</button>
        <div className='flex gap-[9px] justify-center items-center  mb-2'>
          <p className='text-white ' >{signInOption === 'login' ? "Don't have an account?" : "Already have an account?"}</p>
          <span className='cursor-pointer text-red' onClick={() => setSignInOption((prevValue) => {
            return prevValue === "login" ? "register" : 'login'
          })} >{signInOption === 'login' ? "Sign Up" : "Login"}</span>
        </div>
      </form>
    </main>
  )
}

export default SignIn
