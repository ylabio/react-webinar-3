import { memo } from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import Spinner from '../../components/spinner'
import UserInfo from '../../components/user-info'
import HeadAuthContainer from '../../containers/head-auth-container';


function Profile(){
  const select = useSelector(state => ({
    userData: state.profile.userData,
    waiting: state.profile.waiting
  }));

  const {t} = useTranslate();

  return (
  <PageLayout>
    <HeadAuthContainer />
    <Head title={t('title')}>
      <LocaleSelect/>
    </Head>
    <Navigation />
    <Spinner active={select.waiting}>
      {!select.waiting && <UserInfo user={select.userData} t={t}/>}
    </Spinner>
  </PageLayout>)
}

export default memo(Profile)