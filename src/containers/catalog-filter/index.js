import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {transformCategories} from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

	

  const store = useStore();

  const select = useSelector(state => ({
		category: state.catalog.params.category,
		categories: state.categories.data,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
		// Фильтр категорий
		onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

	const options = useMemo(() => ({
		categories: [
			{value: '', title: 'Все'},
			...transformCategories(select.categories)
		],
    sort: [
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]
  }), [select.categories]);

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
			<Select options={options.categories} value={select.category} onChange={callbacks.onCategory} theme={'big'}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={600} theme={'big'}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
