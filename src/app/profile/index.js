import React, {useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import UserPanel from "../../containers/user-panel";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";

const Profile = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const store = useStore()

  const select = useSelector(state => ({
    token: state.session.data.token,
    profile: state.profile.data
  }))

  const callbacks = {
    getUserProfile: useCallback((id, token) => store.actions.profile.getUserProfile(id, token), [store])
  }

  useEffect(() => {
    if (!select.token) {
      navigate('/login')
    } else {
      callbacks.getUserProfile(id, select.token)
    }
  }, [select.token])


  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo user={select.profile} t={t} />
    </PageLayout>
  );
};

export default React.memo(Profile);
