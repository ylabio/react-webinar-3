import { memo, useEffect, useMemo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileBar from '../../containers/profile-bar';

const Profile = () => {

  useEffect(() => {
    console.log('profile page');
  })

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
  }));

  const phone = useMemo(() => {
    console.log(select.user?.profile?.phone);
    return select.user?.profile?.phone;
  }, [select.user?.profile?.phone])

  const email = useMemo(() => {
    console.log(select.user?.email);
    return select.user?.email;
  }, [select.user?.email])
  
  const {t} = useTranslate();

  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} />
    <div>
      <h3>Профиль</h3>
      <p>Телефон: {phone}</p>
      <p>email: {email}</p>
    </div>
  </PageLayout>
  );
}

export default memo(Profile);