import { memo, useCallback, useMemo, useState, useEffect } from "react";
import useInit from "../../hooks/use-init";
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
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    itemsCategory: state.catalog.itemsCategory,
  }));

  const callbacks = {
    // Сортировка по категориям
    onCategory: useCallback(
      (category) => store.actions.catalog.setParams({ category }),
      [store]
    ),
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
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = useMemo(
    () => ({
      sort: [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      category: select.itemsCategory,
    }),
    [select.itemsCategory]
  );

  const { t } = useTranslate();

  useInit(() => {
    store.actions.catalog.initCategory();
  }, []);

  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
