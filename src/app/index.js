import {useCallback, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import WithAuthRedirect from '../components/withAuthRedirect';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    isAuth:state.user.isAuth,
  }));

  useInit(() => {
    if(window.localStorage.getItem('access_token')){
      store.actions.profile.load().then((res)=>{
        store.actions.user.setStatus(res.userName)
      })
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={
          <WithAuthRedirect isAuth={select.isAuth}>
            <Profile/>
          </WithAuthRedirect>
        }/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
