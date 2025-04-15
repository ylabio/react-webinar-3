import React, { useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const select = useSelector(state => ({
    userData: state.user.userData
  }));
  const navigate = useNavigate();
  const isToken = localStorage.getItem('token') ? true : false;

  useEffect(() => {
    if (!isToken) {
      navigate('/login');
    }
  }, [isToken]);

  if (!select.userData) {
    return <p>Данные не найдены</p>
  }

  return <>{children}</>;
};

export default AuthWrapper;