import {memo, useCallback, useMemo, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {  setOptionCategory } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
const [categories, setCategories]=useState([]);
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoriesSort: state.categories.categoriesSort,
    categoriesProducts: state.categories.categoriesProducts,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort, page:1}), [store]),
    onSortCategory: useCallback(category => store.actions.catalog.setParams({category,page:1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onGetCategories: useCallback(() => store.actions.catalog.getCategories(), [store]),
  };
useMemo(()=>{
store.actions.categories.getCatalogProducts()
},[store])


  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
       <Select options={select.categoriesProducts} value={select.category} onChange={callbacks.onSortCategory}/>
      <Select options={select.categoriesSort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
