import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const AuthChecker = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }))

  if (select.token) {
    return children;
  } 

  return <Navigate to="/login" />;
};

export default AuthChecker;