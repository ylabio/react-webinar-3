import { memo, useCallback, useMemo } from 'react';
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
    category: state.catalog.params.category,
    categories: state.categories.tree,
    loading: state.categories.waiting,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Категории
    onCategory: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
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
    categories: useMemo(() => {
      const build = (items, level = 0) => {
        return items.reduce((acc, item) => {
          acc.push({
            value: item._id,
            title: `${'-'.repeat(level)} ${item.title}`,
          });

          if (item.children) {
            acc.push(...build(item.children, level + 1));
          }

          return acc;
        }, []);
      };

      return [
        {
          value: '',
          title: 'Все',
        },
        ...build(select.categories),
      ];
    }, [select.categories]),
  };

  const { t } = useTranslate();

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
        placeholder={'Поиск'}
        delay={1000}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
