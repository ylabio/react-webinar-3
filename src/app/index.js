import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import ProtectedComponent from '../containers/protected-component';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.getUser();
    store.actions.categories.getCategories();
  }, [], true);

  const isAuth = useSelector(state => state.profile.isAuth);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<ProtectedComponent isAuth={isAuth} redirectUrl={'/profile'}><Auth /></ProtectedComponent>}/>
        <Route path={'/profile'} element={<ProtectedComponent isAuth={!isAuth} redirectUrl={'/login'}><Profile /></ProtectedComponent>}/>
        <Route path={'*'} element={<Main/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
