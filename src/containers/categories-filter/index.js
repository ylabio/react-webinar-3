import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import CategorySelect from '../../components/category-select';

function CategoriesFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    categories: state.catalog.categories,
    categorySort: state.catalog.params.categorySort,
  }));

  const callbacks = {
    onLoad: useCallback(() => store.actions.catalog.loadCategories(), [store]),
    onSort: useCallback((categorySort) => store.actions.catalog.setParams({categorySort, page: 1}), [store]),
  }

  return (
    <>
      <CategorySelect options={select.categories} value={select.categorySort} onChange={callbacks.onSort}></CategorySelect>
    </>
  )
}

export default memo(CategoriesFilter);