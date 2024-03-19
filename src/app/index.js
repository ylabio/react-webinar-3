import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name,
  }));

  const store = useStore();
  useEffect(() => {
    store.actions.user.loadUser();
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}
        />
      </Routes>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
