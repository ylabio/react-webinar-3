import { memo, useCallback, useMemo } from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';
import SideLayout from '../../components/side-layout';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    categories: state.catalog.categories,
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Категории
    onCategorySelect: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const { t } = useTranslate();

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: t('filter.order') },
        { value: 'title.ru', title: t('filter.title') },
        { value: '-price', title: t('filter.price') },
        { value: 'edition', title: t('filter.edition') },
      ],
      [t],
    ),
    categories: useMemo(
      () => [{ value: '', title: t('filter.category.all') }, ...select.categories],
      [select.categories, t],
    ),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategorySelect}
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
        placeholder={t('filter.search')}
        delay={1000}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
