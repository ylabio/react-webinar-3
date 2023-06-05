import React, {Fragment} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import {privateRoutes, publicRoutes} from '../routes';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import Article from './article';
import EnterPage from './enter-page';
import Profile from './profile';
import PrivateRotes from './private-rotes';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    token: state.user.token
  }));

  useInit(() => {
    store.actions.user.setUserData();
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<EnterPage />} />
        <Route element={<PrivateRotes />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
