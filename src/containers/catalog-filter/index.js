import { memo, useCallback, useMemo, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import { loadCategories } from '../../api/http';
/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const [categoryValue, setCategoryValue] = useState([
    { value: '', title: 'Все' },
  ],)
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));
  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Сортировка по категориям
    onSelectCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
  };
   useEffect(()=>{
      async function fetchCatergoty () {
        const response  = await loadCategories();
        setCategoryValue(prevValue =>{
          return [ { value: '', title: 'Все' }, ...response]
        })
      }
      fetchCatergoty();
    },[]);
    
  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
     category: useMemo(
          () => categoryValue,
          [categoryValue],
        ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
        <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onSelectCategory}
        size="medium"
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
        size="medium"
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
