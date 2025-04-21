import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import Button from '../../components/button';

function CatalogFilter() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  const options = useMemo(() => ({
    sort: [
      { value: 'order', title: t('sort.order') },
      { value: 'title.ru', title: t('sort.title') },
      { value: '-price', title: t('sort.priceDesc') },
      { value: 'edition', title: t('sort.edition') },
    ],
    categories: [
      { value: '', title: t('category.all') },
      ...treeToList(listToTree(select.categories), (item, level) => ({
        value: item._id,
        title: '- '.repeat(level) + (item.title[lang] || item.title.ru || item.title),
      })),
    ],
  }), [select.categories, t, lang]);

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
        size="medium"
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
        size="medium"
        key={`sort-select-${lang}`}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('search.placeholder')}
        delay={1000}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
