import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Spinner from '../../components/spinner';
import Navigation from '../../containers/navigation';
import './style.css';
import LoginButton from '../../components/login-button';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.login.user,
    token: state.login.token,
    profileWaiting: state.login.profileWaiting,
    profileLoaded: state.login.profileLoaded,
  }));

  useEffect(() => {
    if (!select.token && !select.profileWaiting) {
      navigate('/login');
    } else if (select.token && !select.profileLoaded && !select.profileWaiting) {
      store.actions.login.loadProfile();
    }
  }, [select.token, select.profileLoaded, select.profileWaiting, navigate, store.actions.login]);

  return (
    <>
      <LoginButton />
      <Head title={t('profile.title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.profileWaiting || (!select.profileLoaded && !!select.token)}>
          {' '}
          {select.user ? (
            <div className="Profile">
              <h2>{t('profile.title')}</h2>
              <div className="Profile-info">
                <div className="Profile-field">
                  <div className="Profile-label">{t('profile.userName')}</div>
                  <div className="Profile-value">
                    <strong>{select.user.profile.name}</strong>
                  </div>
                </div>
                <div className="Profile-field">
                  <div className="Profile-label">{t('profile.phoneLabel')}</div>
                  <div className="Profile-value">
                    <strong>{select.user.profile.phone}</strong>
                  </div>
                </div>
                <div className="Profile-field">
                  <div className="Profile-label">{t('profile.emailLabel')}</div>
                  <div className="Profile-value">
                    <strong>{select.user.email}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !select.profileWaiting && <p>{t('profile.notAuthorized')}</p>
          )}
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
