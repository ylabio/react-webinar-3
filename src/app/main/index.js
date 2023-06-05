import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import HeaderContent from '../../containers/header-content';

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.category.loadCategories();
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeaderContent />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
