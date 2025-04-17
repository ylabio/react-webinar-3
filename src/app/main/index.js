import { memo } from 'react';
import useServices from '../../hooks/use-services';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import HeadLayout from '../../components/head-layout';

function Main() {
  const store = useStore();
  const { I18n } = useServices();
  const currentLang = I18n.getLang();

  useInit(
    async () => {
      await Promise.all([store.actions.catalog.initParams(), store.actions.categories.load()]);
    },
    [currentLang],
    true,
  );

  const t = useTranslate();

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
