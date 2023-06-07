import {memo} from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LogButton from "../../components/LogButton";
import { removeLocalStorage } from "../../utils";

function Main() {
    const store = useStore();
    const navigate = useNavigate();
    
    useInit(() => {
        store.actions.catalog.initParams();
        store.actions.categories.getCategories();
    }, [], true);

    const select = useSelector(state => ({
        username: state.user.username, 
    }), []);

    const {t} = useTranslate();

    const handleNavigateToLogin = () => {
        navigate("/login");
    };
    const handleExit = () => {
        removeLocalStorage("token");
        removeLocalStorage("name");
        store.actions.user.resetState();
        navigate("/login");
    }

  return (
    <PageLayout>
       {select.username 
        ?
            <LogButton title={t("exit")} info={select.username} onClick={handleExit}/> 
        : 
            <LogButton title={t("entrance")} onClick={handleNavigateToLogin}/> 
        }
        <Head title={t('title')}>
            <LocaleSelect/>
        </Head>
        <Navigation />
        <CatalogFilter/>
        <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
