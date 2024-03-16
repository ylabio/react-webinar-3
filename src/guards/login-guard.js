import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const LoginGuard = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }))
 
  if (!select.token) {
    return children;
  } 
  
  return <Navigate to="/" />;
};

export default LoginGuard;