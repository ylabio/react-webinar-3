import {Routes, Route} from 'react-router-dom';
import useInit from '../hooks/use-init'
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store'
import Login from './login'
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile'

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  useInit(() => {
    store.actions.users.checkAuth()
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/profile'} element={<Profile />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
