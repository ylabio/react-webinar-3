import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import CategorySelect from '../../components/category-select';
import {sortCategories} from '../../utils';

function CategoriesFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    categories: state.catalog.categories,
  }));

  const callbacks = {
    onLoad: useCallback(() => store.actions.catalog.loadCategories(), [store]),
    onSort: useCallback(() => store.actions.catalog.setParams(), [store]),
  }

  const defaultValue = 'all';
  const sortedItems = sortCategories(select.categories);
  console.log(22, sortedItems);

  return (
    <>
      <CategorySelect options={select.categories} value={defaultValue}></CategorySelect>
    </>
  )
}

export default memo(CategoriesFilter);