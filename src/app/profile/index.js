import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    user: state.user.data,
    token: state.user.token,
    waiting: state.user.waiting
  }));

  useInit(async () => {
    if (!select.token) {
      navigate('/login');
    } else if (!select.user) {
      await store.actions.user.load();
      //console.log('Состояние пользователя после загрузки:', store.getState().user);
    }
  });

  if (!select.token) {
    return null;
  }

  return (
    <>
      <Head>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard
            title={t('profile.title')}
            profile={{
            name: select.user?.profile?.name || select.user?.login,
            phone: select.user?.profile?.phone,
            email: select.user?.email
            }}
            t={t}
          />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);