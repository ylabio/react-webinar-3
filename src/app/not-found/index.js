import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from "../../components/page-layout";
import LoginHeader from '../../containers/login-header-container';
import Navigation from '../../containers/navigation';


function NotFound() {
  const { t } = useTranslate();
  
  return (
    <>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <div className="not-found">
          <h1>404</h1>
          <p>{t('not.found.title')}</p>
          <Link to="/" className="home-link">{t('not.found.btn')}</Link>
        </div>
      </PageLayout>
    </>

  );
}

export default memo(NotFound);
