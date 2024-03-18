import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import buildCategoryTree from "../../hooks/buildCategoryTree";
import flattenCategories from "../../hooks/flattenCategories";
import { useRef } from "react";
/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params['search[category]'] || '',
  }));
    const debounceTimerRef = useRef(null);
    const isResetClickedRef = useRef(false);
  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

      onCategorySelect: useCallback(categoryId => {
          if (categoryId !== undefined) {
              store.actions.catalog.setParams({ 'search[category]': categoryId, page: 1 });
          }
      }, [store])
  };
    const categoryTree = buildCategoryTree(store.getState().catalog.categories);
    const categoryOptions = flattenCategories(categoryTree);
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    
  };
    

  const {t} = useTranslate();

    const handleInputChange = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            if (!isResetClickedRef.current) {
                callbacks.onReset()
                callbacks.onSearch();
            }
        }, 1000);
    }, [store]);//как смог исправил косяк с тем что если нажать сброс сразу после ввода то некорректно отрабатывает все
    
  return (
    <SideLayout padding='medium'>
          <Select
              options={categoryOptions} 
              value={select.category}
              onChange={e => callbacks.onCategorySelect(e)}
          />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
          <Input value={select.query !== undefined ? select.query : ''} onChange={callbacks.onSearch} placeholder={'Поиск'} delay={1000} />
          <button onClick={handleInputChange}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
