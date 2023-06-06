import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import User from './user';
import Login from './login';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import ProfileRoute from '../containers/profile-route';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.user.getUser();
  },[])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route 
        path={'/profile'} 
        element= {
          <ProfileRoute>
            <User/>
          </ProfileRoute>
        }/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
