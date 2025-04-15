import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import UserProfile from '../../components/user-profile';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../components/user-panel';
import UserButton from '../../containers/user-button';
import Spinner from '../../components/spinner';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.authentication.token,
    user: state.user.user,
    waiting: state.authentication.waiting,
  }));

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner waiting={select.waiting}>
          <UserProfile user={select.user} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
