import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector((state) => state.user)
  
  if (user.userId === "") {
    return <Navigate to='/sign-in' />
  }
  return children
}

export default ProtectedRoute
