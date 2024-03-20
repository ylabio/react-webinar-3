import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useAuth from "../hooks/use-auth";
import Main from "./main";
import Login from "./login";
import Profile from "./profile";
import Basket from "./basket";
import Article from "./article";
import ProtectedRoute from '../containers/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const {isLoggedIn, login, logout, token, userName} = useAuth();
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={
          <Main isLoggedIn={isLoggedIn} onLogout={logout} token={token} userName={userName}/>
        }/>
        <Route path={'/articles/:id'} element={
          <Article isLoggedIn={isLoggedIn} onLogout={logout} token={token} userName={userName}/>
        }/>
        <Route path={'/login'} element={
          <Login isLoggedIn={isLoggedIn} onLogin={login}/>
        }/>
        <Route path={'/profile'}  element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile onLogout={logout} token={token} userName={userName}/>
          </ProtectedRoute>
        }/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
