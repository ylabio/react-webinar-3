import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    categories: state.catalog.categories,
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
  }));

  const { t, lang } = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Сортировка по категории
    onCategorySort: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(
      () => store.actions.catalog.resetParams({ lang }),
      [store, lang]
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: t("filter.sort.order") },
        { value: "title.ru", title: t("filter.sort.title") },
        { value: "-price", title: t("filter.sort.price") },
        { value: "edition", title: t("filter.sort.edition") },
      ],
      [lang]
    ),
    categories: useMemo(
      () => [
        { value: "", title: t("filter.category.all") },
        ...select.categories,
      ],
      [select.categories]
    ),
  };

  return (
    <SideLayout padding="medium" spaced>
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategorySort}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t("filter.search")}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
