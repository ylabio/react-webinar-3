import {Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import useInitProfile from '../hooks/use-init-profile';
import AuthGuard from '../containers/auth-guard';
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  
  useInitProfile()

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<AuthGuard fallback={<Login />}><Navigate to={'/profile'}/></AuthGuard>} />
        <Route path={'/profile'} element={<AuthGuard fallback={<Navigate to={'/login'}/>}><Profile /></AuthGuard>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
