import { memo, useCallback, useMemo } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.list,
    waiting: state.category.waiting,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Категория
    onCategory: useCallback((category) => {
      store.actions.catalog.setParams({ category, page: 1 });
    }),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    categories: useMemo(
      () => [{ value: "", title: "Все категории" }, ...select.categories],
      [select]
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
        disabled={select.waiting}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        theme={"big"}
        delay={1000}
      />

      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
