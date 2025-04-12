import { memo, useCallback, useEffect, useMemo } from 'react';
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
    categories: state.catalog.categories || [],
  }));

  const callbacks = {
    //Категория
    onCategory: useCallback(category => store.actions.catalog.setParams({category}), [store]),
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
    category: useMemo(() => {
      const map = new Map();
      select.categories.forEach(cat => map.set(cat._id, { ...cat, children: [] }));

      const roots = [];
      for (const cat of map.values()) {
        if (cat.parent && map.has(cat.parent._id)) {
          map.get(cat.parent._id).children.push(cat);
        } else {
          roots.push(cat);
        }
      }

      const flatList = [];
      const traverse = (node, level = 0) => {
        flatList.push({ value: node._id, title: `${'—'.repeat(level)} ${node.title}` });
        node.children.forEach(child => traverse(child, level + 1));
      };
      roots.forEach(root => traverse(root));

      return [{ value: '', title: 'Все категории' }, ...flatList];
    }, [select.categories]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
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
