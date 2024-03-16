import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const AuthGuard = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }))
 
  if (select.token) {
    return children;
  } 
  
  return <Navigate to="/login" />;
};

export default AuthGuard;