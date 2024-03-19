import {memo} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";

/**
 * Личный кабинет пользователя
 */
function Profile() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    result: state.user.result,
    waiting: state.user.waiting,
    isLogged: state.user.isLogged,
  }));

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.isLogged &&
        <Spinner active={select.waiting}>
          <UserInfo data={select.result} t={t}/>
        </Spinner>
      }
    </PageLayout>
  );
}

export default memo(Profile);
