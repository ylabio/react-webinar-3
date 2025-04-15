import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import { UserProvider } from '../hooks/use-user';
import { SessionProvider, useSession } from '../hooks/use-session';
import Main from './main';
import Basket from './basket';
import Article from './article';
import NotFound from "../app/not-found";
import LoginPage from './login-page';
import UserProfile from './user-profile';


function SessionInitializer() {
  const { token, login } = useSession();

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !token) {
        try {
          await login({ token: storedToken });
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    };
    
    restoreSession();
  }, []);

  return null;
}

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <SessionProvider>
      <UserProvider>
        <SessionInitializer />
        <Routes>
          <Route path={''} element={<Main />} />
          <Route path={'/articles/:id'} element={<Article />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </UserProvider>

      {activeModal === 'basket' && <Basket />}
    </SessionProvider>
  );
}

export default App;