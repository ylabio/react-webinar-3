import {memo, useCallback, useMemo} from "react";
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
    categories: state.catalog.categories,
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сортировка по категориям
    onSortCategories: useCallback((category) => store.actions.catalog.setParams({category}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const nestingOfCategories = (item, categories) => {
    if (!item.parent) return item.title;
    if (item.parent && categories.filter(mainCategory => !mainCategory.parent && mainCategory._id === item.parent._id).length > 0) return `- ${item.title}`
    return `-- ${item.title}`
  }

  console.log( ...select.categories.map( item => ({value: item._id, title: nestingOfCategories(item, select.categories), key: item._key, parentKey: item.parent ? item.parent._key : 0})))

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => ([
      {value: '', title: 'Все'},
      ...select.categories.map( item => ({value: item._id, title: nestingOfCategories(item, select.categories), key: item._key, parentKey: item.parent ? item.parent._key : 1000})).sort(function(item1,item2) {
        if (item1.parentKey < item2.parentKey) return -1;
        if (item1.parentKey > item2.parentKey) return 1;
        // при равных parentKey сортируем по key
        if (item1.key < item2.key) return -1;
        if (item1.key > item2.key) return 1;
        return 0;
      })
    ]), [select.categories])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onSortCategories}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
