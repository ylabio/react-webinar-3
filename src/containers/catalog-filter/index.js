import { useEffect, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import CatalogFilterView from '../../components/catalog-filter-view';

/**
 * Умный компонент фильтров каталога
 */
function CatalogFilterContainer() {
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
    if (!select.categories.length) {
      store.actions.catalog.loadCategories();
    }
  }, [select.categories, store]);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategoryChange: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  // Вычисление текущей категории с учётом вложенности
  const currentCategory = useMemo(() => {
    return select.categories.find(c => c.value === select.category);
  }, [select.categories, select.category]);

  const pageTitle = currentCategory?.title
    ? `Магазин / ${currentCategory.title.trim()}`
    : 'Магазин';

  return (
    <CatalogFilterView
      categories={select.categories}
      categoriesLoading={select.categoriesLoading}
      sort={select.sort}
      query={select.query}
      category={select.category}
      onSort={callbacks.onSort}
      onSearch={callbacks.onSearch}
      onReset={callbacks.onReset}
      onCategoryChange={callbacks.onCategoryChange}
    />
  );
}

export default CatalogFilterContainer;
