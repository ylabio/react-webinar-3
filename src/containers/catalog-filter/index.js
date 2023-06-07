import React, {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    categoryOne: state.catalog.params.category,
  }));

  const categories = select.categories;

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback((query) => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Сброс страницы
    onPaginate: useCallback(page => store.actions.catalog.setParams({page}), [store]),
    // Поиск по категории
    onCategories: useCallback(category => {
      const id = select.categories.find((i) => i.title === category.replace(/-/g, ""))
      if(id === undefined) {
        callbacks.onReset()
      } else {
        store.actions.catalog.setParams({category: category.replace(/-/g, "")})
      }
    }, [store, select.categories]),
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

function sortCategories(categories, parent = null, indent = 0) {
  const sortedCategories = [];
  categories.forEach((category) => {
    if ((category.parent && category.parent._id === parent) || (!category.parent && parent === null)) {
      const sortedCategory = { ...category, indent };
      sortedCategories.push(sortedCategory);
      const childCategories = sortCategories(
        categories,
        category._id,
        indent + 1
      );
      sortedCategories.push(...childCategories);
    }
  });
  return sortedCategories
}
const sortedCategories = sortCategories(categories, null);
  return (
    <SideLayout padding='medium'>
      <Select options={sortedCategories} value={select.categoryOne} onChange={callbacks.onCategories} resetPage={callbacks.onReset}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
