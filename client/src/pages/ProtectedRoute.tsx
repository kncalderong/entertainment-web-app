import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addUser } from '../features/user/userSlice';



const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector((state) => state.user)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const getCurrentUser = async () => {
    const urlGetUser = "/api/v1/auth/getCurrentUser"
    try {
      const res = await axios.get(urlGetUser)
      const user = res.data.user
      dispatch(
        addUser({ ...user })
      )
      setIsUserLoading(false)
    } catch (error) {
      setIsUserLoading(false)
      navigate('/sign-in')
      return
    }
  }
  useEffect(() => {
    if (user.userId === "") {
      getCurrentUser()
    }
    setIsUserLoading(false)
  }, [])
  
  if (isUserLoading) {
    return (
      <div>Loading</div>
    )
  }
  
  return children
}

export default ProtectedRoute
