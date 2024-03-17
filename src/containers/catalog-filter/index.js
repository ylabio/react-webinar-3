import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import SelectCategory from "../../components/select-category";
import useInit from "../../hooks/use-init";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.getCategotys();
  }, []);

  const select = useSelector(state => ({
    page: state.catalog.params.page,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    sortCategory: state.catalog.params.sortCategory,
    listCategory: state.catalog.listCategory,
  }));

  const callbacks = {
    // Сортировка по категориям
    onSortCategory: useCallback(sortCategory => store.actions.catalog.setParams({sortCategory, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const {t} = useTranslate();

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: t('filter.select.InOrder')},
      {value: 'title.ru', title: t('filter.select.ByNaming')},
      {value: '-price', title: t('filter.select.DearOnesFirst')},
      {value: 'edition', title: t('filter.select.Ancient')},
    ]), [t]),
    sortCategory: useMemo(() => (select.listCategory), [select])
  };

  return (
    <SideLayout padding='medium'>
      <SelectCategory optionsCategory={options.sortCategory}
                      value={select.sortCategory}
                      onChangeCategory={callbacks.onSortCategory}
                      all={t('filter.category.all')}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t('filter.search')}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
