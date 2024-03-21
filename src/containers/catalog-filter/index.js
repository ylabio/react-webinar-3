import {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useInit from "../../hooks/use-init";
import { addNesting } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    data:state.categories.data
  }));

  useInit(() => {
    store.actions.categories.load();
  }, []);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск категории
    onSearchCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
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
  const categoriesData = {
    sort: useMemo(() => ([
      {value: '', title: 'Все'},
      ...addNesting(select.data).map(el=>({value: el._id, title: el.title,order:el.order}))
    ]), [select.data])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={categoriesData.sort} value={select.category} onChange={callbacks.onSearchCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000} theme={'big'}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
