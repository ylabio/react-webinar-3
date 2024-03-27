import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';
import {useSelector as useSelectorRedux} from 'react-redux';

// import config from '../config';
// import useServices from '../hooks/use-services';
// import I18NService from '../i18n';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  // const services = useServices()
  // const i18n = new I18NService(services, config)


  const store = useStore();
  useInit(async () => {
    await store.actions.session.remind();
  })

  const activeModal = useSelectorRedux(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Protected redirect='/login'><Profile/></Protected>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
