import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginButton() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;

  const handleLogout = async () => {
    try {
      
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('profile');

      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="LoginHeader">
      <Link to="/profile" className="login-username">{profile && profile.name ? profile.name : ''}</Link>
      {token ? (
        <button className="login-btn" onClick={handleLogout}>
          {t('logout.btn')}
        </button>
      ) : (
        <Link to="/login" className="login-btn">
          {t('login.btn')}
        </Link>
      )}
    </div>
  );
}

export default LoginButton;
