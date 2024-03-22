import {memo, useCallback, useMemo} from "react";
import React from "react";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useCategoriesList from "../../hooks/use-сategories-list";

function CatalogFilter() {
  const categories = useCategoriesList();
  const store = useStore();

  const select = useSelector((state) => ({
    category: state.catalog.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
		onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.actions.catalog.setParams({category: '', page: 1}), [store]),
  };


  const options = useMemo(() => ({
		category: [
			{value: '', title: 'Все'},
			...categories
		],
    sort: [
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]
  }), [categories]);
  const {t} = useTranslate();
  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategory}
        theme="big"
      >
      </Select>
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder="Поиск"
        delay={600}
        theme="big"
      />
      <button onClick={callbacks.onReset}>Сброс</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
