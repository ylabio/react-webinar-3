import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useAuth() {
  const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.key('token') && localStorage.key('user')) {
      setIsAuthorized(true);
      getUser().then(setUser);
    } else {
      setIsAuthorized(false);
    }
  }, [isAuthorized])

  
  const logIn = async (login, password) => {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "login": login,
        "password": password
      })
    })

    if (!response.ok) {
      setError(new Error(response.statusText));
      return;
    }

    const data = (await response.json()).result;

    localStorage.setItem('token', data.token);

    navigate('/', { replace: true });
  }

  
  const logOut = async () => {
    const response = await fetch('/api/v1/users/sign', {
      method: "DELETE",
      headers: {
        "X-Token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) return Promise.reject(new Error(response.statusText));

    localStorage.clear();
    setIsAuthorized(false);

    if (location.pathname === '/profile') navigate('/login', { replace: true })
  }


  const getUser = async () => {
    const response = await fetch('/api/v1/users/self?fields=*', {
      method: "GET",
      headers: {
        "X-Token": localStorage.getItem('token'),
        "Content-Type": "application/json"  
      }
    })

    if (!response.ok) return Promise.reject(new Error(response.statusText));

    const data = (await response.json()).result;

    return data;
  }


  return {isAuthorized, user, error, logIn, logOut, getUser};
}