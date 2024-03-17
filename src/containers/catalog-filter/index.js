import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Фильтрация по категориям
    onFilterCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    category: useMemo(() => ([
      {value: '', title: 'Все'},
      {value: '65f32fda7696753a3078d67c', title: 'Электроника'},
      {value: '65f32fda7696753a3078d67d', title: '- Телефоны'},
      {value: '65f32fda7696753a3078d684', title: '- - Смартфоны'},
      {value: '65f32fda7696753a3078d685', title: '- - Аксессуары'},
      {value: '65f32fda7696753a3078d67e', title: '- Ноутбуки'},
      {value: '65f32fda7696753a3078d67f', title: '- Телевизоры'},
      {value: '65f32fda7696753a3078d680', title: 'Книги'},
      {value: '65f32fda7696753a3078d681', title: '- Учебники'},
      {value: '65f32fda7696753a3078d682', title: '- Художественная'},
      {value: '65f32fda7696753a3078d683', title: '- Комиксы'},
    ]), []),
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onFilterCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
