import {memo, useCallback, useMemo, useState, useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useDebounce from "../../hooks/use-debounce";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {sortCategories} from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: sortCategories(state.categories.list),
  }));

  const [debouncedSearch, clearDebouncedSearch] = useDebounce(query => store.actions.catalog.setParams({query, page: 1}), 600);

  const [searchValue, setSearchValue] = useState(select.query);

  useEffect(() => setSearchValue(select.query), [select.query]);
  useEffect(() => clearDebouncedSearch, []);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback((value) => {
      setSearchValue(value);
      debouncedSearch(value);
    }, [store]),
    // Выбор категории
    onSelectCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => {
      store.actions.catalog.resetParams()
      clearDebouncedSearch();
      setSearchValue('');
    }, [store]),
  };

  const {t} = useTranslate();
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => ([
      {value: 'All', title: t('catalog.all')},
      ...select.categories.map(({_id, title, level}) => (
        {value: _id, title: '- '.repeat(level) + title})),
    ]), [select.categories])
  };

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onSelectCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={searchValue} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
