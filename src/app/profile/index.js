import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import { Navigate } from 'react-router-dom';
import LoginPanel from '../../containers/login-panel';
import Spinner from '../../components/spinner';

function Profile() {

  const select = useSelector(state => ({
    data: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard t={t} data={select.data} />
      </Spinner>

    </PageLayout>
  );
}

export default memo(Profile);
