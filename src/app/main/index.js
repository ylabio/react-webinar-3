import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import HeadLayout from '../../components/head-layout';
import useLocale from '../../hooks/use-locale';


function Main() {
  const store = useStore();

  const { locale, t } = useLocale()

  useInit(
    async () => {
      await Promise.all([store.actions.catalog.initParams(), store.actions.categories.load()]);
    },
    [locale],
    true,
  );

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={t('title')}>
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
