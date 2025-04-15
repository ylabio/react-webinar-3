import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext({
  token: null,
  login: async () => {},
  logout: async () => {},
  silentLogin: async () => {},
});

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);


  const silentLogin = async (storedToken) => {
    try {
      const res = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': storedToken,
        },
        credentials: 'include',
      });

      if (res.ok) {
        setToken(storedToken);
        localStorage.setItem('token', storedToken);
        return true;
      }
      
      // Если токен невалидный
      localStorage.removeItem('token');
      setToken(null);
      return false;

    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      if (!res.ok) throw new Error('Ошибка авторизации');
      
      const data = await res.json();
      const newToken = data.result.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      return newToken;

    } catch (error) {
      console.error('Ошибка при логине:', error);
      throw error;
    }
  };

  const logout = async () => {
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
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <SessionContext.Provider value={{ token, login, logout, silentLogin }}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSession() {
  return useContext(SessionContext);
}