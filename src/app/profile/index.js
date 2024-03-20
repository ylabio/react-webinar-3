import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileBody from '../../components/profile-body';
import Autorisation from '../../containers/autorisation';
/**
 * Страница профиля
 */
function Profile() {

  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    userName:state.profile.data.userName,
    phone:state.profile.data.phone,
    email:state.profile.data.email,
    isAuth:state.user.isAuth,
  }));

  const {t} = useTranslate();
  
  const profileText={
    title:t('profile.title'),
    name:t('profile.name'),
    phone:t('profile.phone'),
  }

  useInit(() => {
      store.actions.profile.load()
    }
  , []);

  return (
    <PageLayout>
      <Autorisation/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileBody name={select.userName} phone={select.phone} email={select.email} profileText={profileText}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
