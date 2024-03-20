import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import AuthChecker from '../checker/auth-checker';
import LoginChecker from '../checker/login-checker'
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import UserLogin from "./user-login";
import UserProfile from "./user-profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const store = useStore(); 

  useInit(() => {
    store.actions.auth.checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginChecker> <UserLogin /> </LoginChecker>}/>
        <Route path={'/profile'} element={<AuthChecker> <UserProfile /> </AuthChecker>}/>   
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
