import {memo, useEffect} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from 'react-router-dom';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileBar from '../../containers/profile-bar';
import Spinner from "../../components/spinner";
import ProfileCard from '../../components/profile-card';

/**
 * Страница профиля
 */
function Profile() {

  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    isChecked: state.profile.isChecked,
    message: state.profile.message
  }));

  useEffect(
    () => {
      if (!select.user && select.isChecked) {
        navigate('/login/');
      }
    },
    [select.user]
  )

  return (
    <PageLayout>
      <ProfileBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
