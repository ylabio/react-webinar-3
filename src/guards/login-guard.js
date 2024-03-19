import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const LoginGuard = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }));

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  if (!select.token) {
    return children;
  } 
  
  return <Navigate to={from} />;
};

export default LoginGuard;