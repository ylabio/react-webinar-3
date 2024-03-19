import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const AuthGuard = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }))  

  const location = useLocation();
  const { pathname } = location;

  if (select.token) {
    return children;
  }   
  
  return <Navigate to="/login" state={{ from: pathname }} />;
};

export default AuthGuard;