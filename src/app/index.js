import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import {AuthStub} from "../components/auth-stub";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.auth.isAuthCheck();
  }, [])

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    isAuthCheckWaiting: state.auth.isAuthCheckWaiting

  }));

  if (select.isAuthCheckWaiting) {

  }


  return (
    <>
      {select.isAuthCheckWaiting && <AuthStub/>}
      {!select.isAuthCheckWaiting && <>
        <Routes>
          <Route path={''} element={<Main/>}/>
          <Route path={'/articles/:id'} element={<Article/>}/>
          <Route path={'/login'} element={select.isAuth ? <Navigate to={'/profile'}/> : <Login/>}/>
          <Route path={'/profile'} element={select.isAuth ? <Profile/> : <Navigate to={'/login'}/>}/>
        </Routes>
        {activeModal === 'basket' && <Basket/>}</>}

    </>
  );
}

export default App;
