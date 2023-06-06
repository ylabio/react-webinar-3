import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import RedirectPrivateRoute from "../containers/redirect-privat-route";
import CheckAuthRoute from "../containers/check-auth-route";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    token: state.authentication.token,
  }));

  useEffect(() => {
    if (select.token) {
      console.log('Пользователь авторизован');
      store.actions.authentication.signInByToken();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route
          path={'/login'}
          element={
            <CheckAuthRoute>
              <Login />
            </CheckAuthRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <RedirectPrivateRoute redirectTo={'/login'}>
              <Profile />
            </RedirectPrivateRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
