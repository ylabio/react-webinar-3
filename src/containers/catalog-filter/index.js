import { memo, useCallback, useMemo, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

/**
 * Контейнер со всеми фильтрами каталога
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
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // категории
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
    categories: select.categories,
  };

  const { t } = useTranslate();
  useEffect(() => {
    const categoryTitle =
      select.category === '' || select.category === 'Все'
        ? 'Магазин'
        : `Магазин / ${select.category}`;
    document.title = categoryTitle;
  }, [select.category]); // Заголовок обновляется при изменении категории

  // Создаем строку для заголовка, чтобы передать в компонент Head
  const pageTitle =
    select.category === '' || select.category === 'Все'
      ? 'Магазин'
      : `Магазин / ${select.category}`;

  return (
    <SideLayout padding="medium">
      <Select
        options={select.categories}
        value={select.category}
        onChange={callbacks.onCategoryChange}
        disabled={select.categoriesLoading}
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
