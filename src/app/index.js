import { Route, Routes, useLocation } from 'react-router-dom';
import AuthControl from '../components/auth-control';
import useSelector from "../hooks/use-selector";
import Article from "./article";
import Basket from "./basket";
import Login from './login';
import Main from "./main";
import Profile from './profile';
import PageLayout from '../components/page-layout';
import Head from '../components/head';
import LocaleSelect from '../containers/locale-select';
import useTranslate from '../hooks/use-translate';
import { useCallback, useState } from 'react';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const {t} = useTranslate();

  const select = useSelector(state => ({
    name: state.auth.profileInfo.result?.profile?.name,
    _id: state.auth.profileInfo.result?._id,
    token: state.auth.profileInfo.token
  }));

  const callbacks = {
    // Авторизация
    exit: useCallback(() => store.actions.auth.exit()),
    getProfile: useCallback(() => store.actions.auth.getProfile())
  };

  callbacks.getProfile()

  return (
    <>
      <PageLayout>
      <AuthControl name={select.name} exit={callbacks.exit} t={t} profile={'/profile'} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile />}/>
      </Routes>
      </PageLayout>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
