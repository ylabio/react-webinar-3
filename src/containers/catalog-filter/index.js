import {memo, useCallback, useMemo, useEffect} from "react";
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

  const select = useSelector(state => ({
    filter: state.catalog.params.filter,
    categories: state.catalog.categories,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Получить категории из API
    getCategories: useCallback(() => store.actions.catalog.getCategories(), [store]),
    // Фильтр
    onFilter: useCallback(filter => store.actions.catalog.setParams({filter}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
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
    ]), []),
    // filter: useMemo(() => ([
    //   {value: 'all', title: 'Все'},
    //   {value: 'electronics', title: 'Электроника'},
    // ]), [])
    // filter: useMemo(() => {
    //   setIsLoading(true);
    //   const categories = callbacks.getCategories();
    //   setIsLoading(false);
    //   console.log('options filter', categories);
    //   return categories;
    // },[])
    filter: select.categories
  };

  const {t} = useTranslate();

  useEffect(()=>{
    callbacks.getCategories();
  },[callbacks.getCategories]);

  return (
    <SideLayout padding='medium'>
      <Select options={options.filter} value={select.filter} onChange={callbacks.onFilter}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
