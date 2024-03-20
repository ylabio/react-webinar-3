import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import TopControls from '../../containers/top-controls';
import UserData from '../../components/user-data';
import AuthProtect from '../../containers/auth-protect';

function Profile() {

  const select = useSelector(state => ({
    user: state.user.data,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthProtect>
        <TopControls logoutLink='/login'/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <UserData user={select.user} t={t}/>
      </AuthProtect>
    </PageLayout>
  );
}

export default memo(Profile);
