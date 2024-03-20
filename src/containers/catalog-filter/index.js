import {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { buildHierarchy } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.getCategories();
  }, [store]);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Поиск по категории
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const optionsCategories = {
    categories: useMemo(() => {return buildHierarchy(select.categories) }, [select.categories])
  }

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Select
        options={optionsCategories.categories}
        value={select.category}
        onChange={event => {
          console.log(event);
          event === "Все" ? callbacks.onReset() : callbacks.onCategory(event)
        }} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
