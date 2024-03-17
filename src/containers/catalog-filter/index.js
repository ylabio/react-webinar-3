import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {modifyArrForFilter} from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    filterValues: state.catalog.filterValues,
    query: state.catalog.params.query,
    category: state.catalog.params.category
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Фильтрация
    onFilter: useCallback(id => store.actions.catalog.setParams({category: id, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };


  const sortOptions = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const filterData = modifyArrForFilter(select.filterValues)

  const filterOptions = {
    filter: useMemo(() => ([{_id: '', title: 'Все'}, ...filterData]), [filterData])
  };



  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={filterOptions.filter} value={select.category} onChange={callbacks.onFilter}/>
      <Select  options={sortOptions.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
