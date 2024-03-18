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
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
/**
 * Главная страница - первичная загрузка каталога
 */
function Main(props) {
    const navigate = useNavigate(); 
    const store = useStore();
    const { t } = useTranslate();
    const select = useSelector(state => ({
        waiting: state.catalog.waiting,
    }));
    useInit(() => {
        store.actions.catalog.initParams();  
    }, []);

    
  return (
      <PageLayout>{props.isLoggedIn}
      <Head title={t('title')}>   
        <LocaleSelect/>
      </Head>
          <Spinner active={select.waiting}>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
          </Spinner>
    </PageLayout>
  );
}

export default memo(Main);
