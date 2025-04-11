import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    profile: state.user.profile
  }));

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <div>
          <h2>{t('profile.title')}</h2>
          {select.profile && (
            <div>
              {select.profile.profile?.name && <p>Имя: {select.profile.profile.name}</p>}
              {select.profile.profile?.phone && <p>Телефон: {select.profile.profile.phone}</p>}
              <p>Email: {select.profile.email}</p>
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default memo(Profile);