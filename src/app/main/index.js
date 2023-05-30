import { memo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import useLang from "../../i18n/use-lang";
import Menu from "../../components/menu";
import WithLoader from '../../components/with-loader';

function Main() {
  const store = useStore();
  const { t, lang } = useLang();
  const [params] = useSearchParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    page: state.catalog.page,
    pagesCount: state.catalog.pagesCount,
    loading: state.catalog.loading,
  }));
  const paramsPage = params.get("page") || 1;
  const page =
    paramsPage > select.pagesCount ? select.page : paramsPage || select.page;

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} translate={t} />;
      },
      [callbacks.addToBasket, lang]
    ),
  };

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  return (
    <PageLayout footer={select.list.length > 0 && !select.loading && (
      <Pagination currentPage={select.page} pagesCount={select.pagesCount} />
    )}>
      <Head title={t("store") ?? "Магазин"} />
      <Menu />
      <WithLoader isLoading={select.loading}>
        <List list={select.list} renderItem={renders.item} />
      </WithLoader>
    </PageLayout>
  );
}

export default memo(Main);
