import { memo, useCallback, useMemo, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

/**
 * Компонент фильтров каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category || '',
    categories: state.catalog.categories,
    categoriesLoading: state.catalog.categoriesLoading,
  }));

  // Загрузка категорий
  useEffect(() => {
    store.actions.catalog.loadCategories();
  }, [store]);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategoryChange: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  const options = {
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
  };

  const { t } = useTranslate();

  useEffect(() => {
    const categoryTitle =
      select.category === '' || select.category === 'Все'
        ? 'Магазин'
        : `Магазин / ${select.category}`;
    document.title = categoryTitle;
  }, [select.category]);

  // Вычисление текущей категории с учётом вложенности
  const currentCategory = useMemo(() => {
    return select.categories.find(c => c.value === select.category);
  }, [select.categories, select.category]);

  const pageTitle = currentCategory?.title
    ? `Магазин / ${currentCategory.title.trim()}`
    : 'Магазин';

  return (
    <SideLayout padding="medium">
      {/* Категории с вложенностью */}
      <Select
        options={select.categories}
        value={select.category}
        onChange={callbacks.onCategoryChange}
        disabled={select.categoriesLoading}
        size="medium"
      />

      {/* Сортировка */}
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
        size="medium"
      />

      {/* Поиск */}
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        theme={'big'}
      />

      {/* Сброс */}
      <Button
        style="text"
        onClick={callbacks.onReset}
        title={t('filter.reset')}
        textColor="var(--primary)"
      />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
