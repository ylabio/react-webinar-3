import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Button from "../../components/button";
import {buildCategoryOptions} from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();  

  const select = useSelector(state => ({
    categories: state.category.list,
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    onCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = useMemo(() => ({
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
    category: buildCategoryOptions(select.categories)
  }), [select.categories]);

  const {t} = useTranslate();
  
  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'} theme="big" 
             delay={1000}/>
      <Button onClick={callbacks.onReset}>{t('filter.reset')}</Button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);