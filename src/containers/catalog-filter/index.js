import { memo, useCallback, useMemo } from 'react'
import useInit from '../../hooks/use-init'
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import { itemsToOptions } from '../../utils'

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  useInit(() => {
    store.actions.category.load();
  }, [])

  const select = useSelector(state => ({
    sort: {
      sort: state.catalog.params.sort,
      category: state.catalog.params.category
    },
    query: state.catalog.params.query,
    categoryOptions: [
      {
      _id: "all",
      title: "Все",
      value: 'all',
      parent: null
      },
      ... itemsToOptions(state.category.items)
    ]
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={select.categoryOptions} value={select.sort.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'} theme={'big'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
