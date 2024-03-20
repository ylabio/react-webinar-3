import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProtectedRoute from "../containers/protected-route";
import Profile from "./profile";
import Login from "./login";
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
  }));

  useMemo(() => {
    if (!select.user) {
      store.actions.user.initUser();
    }    
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path="/profile/:userid" element={
          <ProtectedRoute 
            shouldBeAuthorized={true}            
            redirect="/login"
          >
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path="/login" element={
          <ProtectedRoute
            shouldBeAuthorized={false}
            redirect="/"
          >
            <Login />
          </ProtectedRoute>
        }/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
