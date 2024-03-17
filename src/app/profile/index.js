import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import TopControls from '../../containers/top-controls';
import UserData from '../../components/user-data';

function Profile() {

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopControls />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserData user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
