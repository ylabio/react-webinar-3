import React, { useEffect } from 'react';
import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import LoginHeader from '../../components/login-header';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';

function Main() {
  const store = useStore();
  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();

  const { category, categoryLabel } = useSelector(state => state.catalog.params);

  const headTitle =
    category && categoryLabel && categoryLabel !== 'Все категории'
      ? `${t('title')} / ${categoryLabel}`
      : t('title');

  useEffect(() => {
    document.title = headTitle;
  }, [headTitle]);

  return (
    <>
      <LoginHeader />
      <Head title={headTitle}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <CatalogFilter />
        <CatalogList />
      </PageLayout>
    </>
  );
}

export default memo(Main);
