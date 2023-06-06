import {memo, useCallback, useMemo, useEffect, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../layouts/side-layout";
import {arrayRecurseFilter} from "../../utils";

function CatalogFilter() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
    categories: state.categories.categories,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Выбор категории
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const loadedCategories = select.categories.map(category => ({value: category._id, title: category.title, parent: category.parent}));

  const options = {
    sort: useMemo(
      () => [
        {value: "order", title: "По порядку"},
        {value: "title.ru", title: "По именованию"},
        {value: "-price", title: "Сначала дорогие"},
        {value: "edition", title: "Древние"},
      ],
      []
    ),
    categories: [{value: "", title: t("all")}, ...arrayRecurseFilter(loadedCategories)],
  };

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t("search")} delay={1000} />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
