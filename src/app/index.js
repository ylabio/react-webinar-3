import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useTranslate from "../hooks/use-translate";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from './authorization';
import Profile from './profile';
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import RequireAuth from '../containers/require-auth';
import Spinner from '../components/spinner';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(() => {
    store.actions.authorization.loginByToken()
  }, [], true);

  const activeModal = useSelector(state => state.modals.name);
  const select = useSelector((state) => ({
    isAuth: state.authorization.isAuth,
    isLoading: state.authorization.waiting,
  }));

  if (select.isLoading) return <Spinner active={true}>{t('loading')}...</Spinner>
  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<RequireAuth  to='/profile' auth={!(select.isAuth)}>{<Authorization/>}</RequireAuth>}/>
        <Route path={'/profile'} element={<RequireAuth  to='/login' auth={(select.isAuth)}>{<Profile/>}</RequireAuth>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}

    </>
  );
}

export default App;
