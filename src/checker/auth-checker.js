import React from 'react';
import { Navigate , useLocation} from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const AuthChecker = ({ children }) => {
  const select = useSelector(state => ({    
    token: state.auth.token    
  }))  

  const location = useLocation();
  const { pathname } = location;

  if (select.token) {
    return children;
  }   

console.log(pathname)

  return <Navigate to="/login" state={{ from: pathname }} />;
};

export default AuthChecker;