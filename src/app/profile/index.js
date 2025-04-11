import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserProfile from '../../components/user-profile';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../components/user-panel';
import UserButton from '../../containers/user-button';
import Spinner from '../../components/spinner';
import usePageTitle from '../../hooks/use-pageTitle';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const pageTitle = usePageTitle({ defaultTitle: 'title' });

  const select = useSelector(state => ({
    token: state.user.token,
    result: state.user.result,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    if (!select.token) {
      navigate('/login');
    } else {
      store.actions.user.fetchUserProfile();
    }
  }, [select.token, navigate]);

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={pageTitle}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner waiting={select.waiting}>
          <UserProfile user={select.result} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
