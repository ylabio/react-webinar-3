import {Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from '../components/protected-route';
import useSelector from "../hooks/use-selector";
import useInit from '../hooks/use-init';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore()
  const activeModal = useSelector(state => state.modals.name);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useInit(() => {
    store.actions.auth.auth()
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path='/login' element={<Login/>}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Profile/>}/>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
