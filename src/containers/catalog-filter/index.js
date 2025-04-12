import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import CustomSelect from '../../components/custom-select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import calcLevels from '../../utils/calc-level';

function CatalogFilter() {
  const store = useStore();
  const { t } = useTranslate();
  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.list || [],
  }));

  useEffect(() => {
    store.actions.category.load();
  }, []);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onCategory: useCallback(
      category => {
        const value = category === 'all' ? undefined : category;
        store.actions.catalog.setParams({ category: value, page: 1 });
      },
      [store],
    ),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: t('sort.order') },
        { value: 'title.ru', title: t('sort.byTitle') },
        { value: '-price', title: t('sort.price') },
        { value: 'edition', title: t('sort.edition') },
      ],
      [t],
    ),

    category: useMemo(() => {
      const base = [{ value: 'all', title: t('category.all'), level: 0 }];
      const formatted = calcLevels(select.categories).map(cat => ({
        value: cat._id,
        title: t(`category.${cat.title}`),
        level: cat.level,
      }));
      return base.concat(formatted);
    }, [select.categories, t]),
  };

  return (
    <SideLayout padding="medium">
      <CustomSelect
        options={options.category}
        value={select.category || 'all'}
        onChange={callbacks.onCategory}
      />
      <CustomSelect options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('search.placeholder')}
        delay={1000}
        theme="big"
      />
      <Button
        className="CustomReset"
        style="text"
        onClick={callbacks.onReset}
        title={t('filter.reset')}
      />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
