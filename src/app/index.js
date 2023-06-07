import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import AuthPage from './auth-page';
import ProfilePage from './profile-page';
import AuthCheck from '../containers/auth-check';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const select = useSelector(state => ({   
    userName:  state.user.userData.name,
    isAuth: state.user.isAuth, 
    error: state.user.error,
    waiting: state.user.waiting 
  }));

  useEffect(() => {
    if (!select.isAuth) {         
      store.actions.user.authorizationСheck();  
    }
  }, []);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>        
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<AuthPage/>}/>        
        <Route path={'/profile'} element={<AuthCheck />}/>          
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
