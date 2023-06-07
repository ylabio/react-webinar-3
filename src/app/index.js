import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import ProfileUserPage from './profileUser-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore()

  useEffect(() => {
    store.actions.profile.getUser();
  }, [])

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<ProfileUserPage/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
