import React, {memo} from 'react'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import TopMenu from "../../containers/top-menu";
import ProfileLayout from "../../components/profile-layout";



const Profile = () => {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  useInit(() => {
    store.actions.user.getUserInfo();
  }, [], true);

  const select = useSelector(state => ({
    user: state.user.user,
    token:  state.user.token,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  const redirectLogin = () => {
    if (!select.token) {
      return navigate("/login");
    }
    return null;
  };

  useInit(() => {
    redirectLogin()
  }, [select.token], true)

  return (
    <PageLayout>
      <TopMenu />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileLayout user={select.user ? select?.user : null} />
    </PageLayout>
  )
}
export default memo(Profile);
