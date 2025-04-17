import { memo, useCallback, useMemo } from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';
import SideLayout from '../../components/side-layout';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(
      category =>
        store.actions.catalog.setParams({
          category,
          page: 1,
        }),
      [store],
    ),
  };

  const { t, lang } = useTranslate();

  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        { value: 'order', title: t('filter.order') },
        { value: 'title.ru', title: t('filter.title') },
        { value: '-price', title: t('filter.price') },
        { value: 'edition', title: t('filter.edition') },
      ],
      [lang],
    ),
    // Категории для фильтра
    categories: useMemo(
      () => [
        { value: '', title: t('filter.category.all') },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: '- '.repeat(level) + item.title,
        })),
      ],
      [select.categories, lang],
    ),
  };

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
