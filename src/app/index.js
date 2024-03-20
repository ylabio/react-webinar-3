import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from "./loginPage";
import ProfilePage from "./pofilePage";
import useInit from "./../hooks/use-init";
import useStore from "./../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  useInit(() => {
    store.actions.login.initParams();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<ProfilePage/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
