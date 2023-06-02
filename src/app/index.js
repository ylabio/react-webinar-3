import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import ProtectedComponent from '../containers/protected-component';
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<ProtectedComponent isAuth={isAuth} redirectUrl={'/profile'}><Auth /></ProtectedComponent>}/>
        <Route path={'/profile'} element={<ProtectedComponent isAuth={!isAuth} redirectUrl={'/login'}><Profile /></ProtectedComponent>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
