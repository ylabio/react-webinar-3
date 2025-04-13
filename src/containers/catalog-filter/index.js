import { memo, useCallback, useMemo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

import PropTypes from 'prop-types';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter({ setHeaderTitle }) {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.categories,
  }));

  const callbacks = {
    //Установка категорий
    onSetCategory: useCallback(() => store.actions.categories.getCategories(), [store]),
    // Категории
    onCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

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
  };

  const { t } = useTranslate();

  useEffect(() => {
    callbacks.onSetCategory();
  }, [])

  useEffect(() => {
    const selectedCategory = select.categories.find(cat => cat.value === select.category);
    let title = 'Магазин';
    if (selectedCategory && select.category !== '') {
      title = `Магазин / ${selectedCategory.title.replaceAll('-', '')}`;
    }

    setHeaderTitle(title); // Обновляем заголовок в App
  }, [select.category, select.categories]);

  return (
    <SideLayout padding="medium">
      <Select
        options={select.categories}
        value={select.category}
        onChange={callbacks.onCategory}
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

CatalogFilter.propTypes = {
  setHeaderTitle: PropTypes.func,
}

export default memo(CatalogFilter);
