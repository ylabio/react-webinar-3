import {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import PropTypes from 'prop-types';
import { sortToSubCategories } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter(props) {

  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    //Категория
    onChangeCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => 
      [{value:'all',title:'Все'}].concat(sortToSubCategories(props.categories)), [])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onChangeCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000} theme={'big'}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

CatalogFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    parent: PropTypes.shape({_id: PropTypes.string}),
  }))
}

CatalogFilter.defaultProps = {
  categories: [
    {
      _id: '',
      title: 'Все',
      parent: null,
    }
  ]
}

export default memo(CatalogFilter);
