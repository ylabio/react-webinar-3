import {memo, useCallback, useMemo, useState, useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {buildCategoryOptions} from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const [categoryOptions, setCategoryOptions] = useState([]);

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Фильтрация по категории
    onCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = useMemo(() => ({
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
    category: categoryOptions
  }), [categoryOptions]);

  const {t} = useTranslate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
        const data = await response.json();
        const categories = buildCategoryOptions(data.result.items);        
        setCategoryOptions(categories);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
