import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import SectionHeader from '../../components/section-header';
import ProfileLayout from '../../components/profile-layout';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';

/**
 * Страница профиля пользователя
 */
function Profile() {

  const {t} = useTranslate();
  const labelTitle = t('profile.title');

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <PageLayout>
        <Navigation/>
        <Spinner active={select.waiting}>
          <SectionHeader title={labelTitle} padding={true}/>
          <ProfileLayout user={select.user} t={t}/>
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
