import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from './use-session';

const initialUserState = {
  user: null,
  loading: true,
  error: null,
};

const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const { token } = useSession();
  const [user, setUser] = useState(initialUserState.user);
  const [loading, setLoading] = useState(initialUserState.loading);
  const [error, setError] = useState(initialUserState.error);

  const loadUser = async (token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
        credentials: 'include',
      });
      
      if (res.status === 401) { 
        throw new Error('SESSION_EXPIRED');
      }
      
      if (!res.ok) {
        let errMsg = 'Ошибка при загрузке данных пользователя';
        try {
          const errData = await res.json();
          if (errData.error?.data?.issues) {
            errMsg = errData.error.data.issues.map(issue => issue.message).join(', ');
          } else if (errData.error?.message) {
            errMsg = errData.error.message;
          }
        } catch {
          errMsg = await res.text() || errMsg;
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      const userData = data.result;

      if (!userData.profile) {
        userData.profile = {
          name: userData.username || 'Не указан',
          phone: 'Не указан',
        };
      }

      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Ошибка в loadUser:', err);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (login, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        let errMsg = 'Ошибка авторизации';
        try {
          const errData = await response.json();
          if (errData.error?.data?.issues) {
            errMsg = errData.error.data.issues.map(issue => issue.message).join(', ');
          } else if (errData.error?.message) {
            errMsg = errData.error.message;
          }
        } catch {
          const text = await response.text();
          errMsg = text || errMsg;
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (!data.result?.token) {
        throw new Error('Токен не получен');
      }
      
      const token = data.result.token;
      localStorage.setItem('token', token);
      await loadUser(token);
      return token;
    } catch (err) {
      console.error('Ошибка в loginUser:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, loading, error, loadUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);