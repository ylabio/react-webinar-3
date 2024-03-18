import {memo, useCallback, useEffect, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginBanner from "../../containers/login-banner";
import ProfileCard from "../../components/profile-card";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.user.auth()
      .then((success) => {
        if (!success) {
          navigate('/')
        }
      })
  }, [])

  const select = useSelector(state => ({
    loggedIn: state.user.loggedIn,
    userInfo: state.user.userInfo,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginBanner/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard userInfo={select.userInfo} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
