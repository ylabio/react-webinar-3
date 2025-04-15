import { memo, useCallback, useMemo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import UserInfo from '../../components/user-info';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../../containers/auth-wrapper';

/**
 * Страница пользователя
 */
function Profile() {

  const select = useSelector(state => ({
    userData: state.user.userData
  }));

  const { t } = useTranslate();

  return (
    <>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
          <AuthWrapper>
            {select.userData && <UserInfo info={select.userData} t={t} />}
          </AuthWrapper>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
