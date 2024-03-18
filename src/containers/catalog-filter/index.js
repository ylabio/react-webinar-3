import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate.js";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import Select from "../../components/select/index.js";
import Input from "../../components/input/index.js";
import SideLayout from "../../components/side-layout/index.js";
import SelectCategory from "../../components/select-category/index.js";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoriesList: state.catalog.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams(sort), [store]),
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
      <SelectCategory options={select.categoriesList} value={select.category} onChange={callbacks.onSort}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
