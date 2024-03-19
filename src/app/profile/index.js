import { memo, useEffect, useMemo } from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import ProfileBar from '../../containers/profile-bar';
import LocaleSelect from "../../containers/locale-select";
import "./style.css";

const Profile = () => {

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
  }));

  const userName = useMemo(() => {
    return select.user?.username;
  }, [select.user?.username]);

  const phone = useMemo(() => {
    return select.user?.profile?.phone;
  }, [select.user?.profile?.phone]);

  const email = useMemo(() => {
    return select.user?.email;
  }, [select.user?.email])
  
  const {t} = useTranslate();

  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} >
      <LocaleSelect />
    </Head>
    <Navigation />
    <div className="Profile">
      <h3 className="Profile-heading">Профиль</h3>
      <p className="Profile-entry">Имя: <span className="Profile-entry-bold">{userName}</span></p>
      <p className="Profile-entry">Телефон: <span className="Profile-entry-bold">{phone}</span></p>
      <p className="Profile-entry">email: <span className="Profile-entry-bold">{email}</span></p>
    </div>
  </PageLayout>
  );
}

export default memo(Profile);