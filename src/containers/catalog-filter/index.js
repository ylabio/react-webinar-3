// containers/catalog-filter
import { memo, useEffect, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

function CatalogFilter() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.items,
  }));
  
  useEffect(() => {
    store.actions.categories.load();
  }, []);

  const getChildIds = useCallback((categoryId) => {
    const findChildren = (id) => {
      const children = select.categories.filter(cat => cat.parent?._id === id);
      return [id, ...children.flatMap(child => findChildren(child._id))];
    };
    return categoryId ? findChildren(categoryId) : [];
  }, [select.categories]);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort, category: store.getState().catalog.params.category }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1, category: store.getState().catalog.params.category }), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback(categoryId => {
      const categoryIds = getChildIds(categoryId);
      store.actions.catalog.setParams({ category: categoryIds, page: 1 });
    }, [store, getChildIds]),
  };

  const options = {
    sort: useMemo(() => [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ], []),
    categories: useMemo(() => {
      const allOption = { value: '', title: 'Все' };
      if (!select.categories.length) return [allOption];
      const buildTree = (parentId = null, level = 0) => 
        select.categories
          .filter(cat => (parentId ? cat.parent?._id === parentId : !cat.parent))
          .flatMap(cat => [
            { value: cat._id, title: '- '.repeat(level) + cat.title },
            ...buildTree(cat._id, level + 1)
          ]);
      return [allOption, ...buildTree(null, 0)];
    }, [select.categories]),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category[0] || ''}
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
        placeholder={t('input.search')}
        delay={1000}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}
export default memo(CatalogFilter);