import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import UserProfile from "./user-profile-page";
import LoginPage from "./login-page";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.user.checkLoginStatus();
  }, []);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={<UserProfile />}/>
        <Route path={'/login'} element={<LoginPage />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
