import { memo, useCallback, useMemo } from "react";
import Input from "../../../components/input";
import SideLayout from "../../../components/layouts/side-layout";
import Select from "../../../components/select";
import useSelector from "../../../hooks/use-selector";
import useStore from "../../../hooks/use-store";
import useTranslate from "../../../hooks/use-translate";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Категория
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={select.categories} value={select.category} onChange={callbacks.onCategory} theme='medium'/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} theme='medium'/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000} theme='big'/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);