import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoryList: state.catalog.categoryList,
    categoryListWaiting: state.catalog.categoryListWaiting,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

    onChangeCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store])
  };

  const sortOptions = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const categoryOptions = {
    option: useMemo(() => ([
      {title: 'Все', value: ''},
      ...select.categoryList.map(
        category => ({
          title: `${Array(category.level).fill('-').join(' ')} ${category.title}`, value: category._id
        })
      )
    ]), [select.categoryList])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Spinner active={select.categoryListWaiting}>
        <Select options={categoryOptions.option} value={select.category} onChange={callbacks.onChangeCategory}/>
      </Spinner>
      <Select options={sortOptions.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
