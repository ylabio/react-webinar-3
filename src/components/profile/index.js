import useTranslate from '../../hooks/use-translate';
import Head from '../head';
import PageLayout from '../page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import './style.css';

function ProfilePage({ user }) {
  const { t } = useTranslate();
  const { profile } = user;

  return (
    <div>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <h2 className="ProfileTitle">{t('profile.title')}</h2>
        <div className="ProfileLayout">
          <div className="ProfileLayout-prop">
            <div className="ProfileLayout-label">{t('profile.name')}:</div>
            <div className="ProfileLayout-value">{profile.name}</div>
          </div>
          <div className="ProfileLayout-prop">
            <div className="ProfileLayout-label">{t('profile.phone')}:</div>
            <div className="ProfileLayout-value">{profile.phone}</div>
          </div>
          <div className="ProfileLayout-prop">
            <div className="ProfileLayout-label">{t('profile.email')}:</div>
            <div className="ProfileLayout-value">{user.email}</div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default ProfilePage;
