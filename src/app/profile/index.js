import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import TopMenu from '../../containers/top-menu';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopMenu/>
      <Head title={t('profile')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
