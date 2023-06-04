import {memo, useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import ButtonEnter from '../../components/button-enter';
import useSelector from '../../hooks/use-selector';

function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    data: state.getAuthorization.getData,
  }));

  const callbacks = {
    exitAuthorization: useCallback(
      () => store.actions.getAuthorization.exitAuthorization(),
      [store]
    ),
  };
  const {t} = useTranslate();

  return (
    <PageLayout>
      <ButtonEnter
        linkLogin={`/login`}
        linkProfile={`/profile`}
        t={t}
        dataAuthorization={select.data}
        onExit={callbacks.exitAuthorization}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
