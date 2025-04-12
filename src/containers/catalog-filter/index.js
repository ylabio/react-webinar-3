import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

function buildCategoryTree(categories, currentParentId = null, categoryMap, level = 0) {
  let options = [];
  const prefix = '- '.repeat(level);

  categories.forEach(category => {
    const parentId = category.parent ? category.parent._id : null;

    if (parentId === currentParentId) {
      options.push({
        value: category._id,
        title: `${prefix}${category.title}`,
      });
      // Рекурсивно ищем дочерние элементы
      options = options.concat(buildCategoryTree(categories, category._id, categoryMap, level + 1));
    }
  });
  return options;
}

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
    categoriesLoaded: state.catalog.categoriesLoaded,
    categoriesWaiting: state.catalog.categoriesWaiting,
  }));

  useEffect(() => {
    if (!select.categoriesLoaded && !select.categoriesWaiting) {
      store.actions.catalog.loadCategories();
    }
  }, [select.categoriesLoaded, select.categoriesWaiting, store.actions.catalog]);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Выбор категории
    onCategoryChange: useCallback(
      category => {
        // Передаем пустое значение или ID категории, сбрасываем страницу на 1
        store.actions.catalog.setParams({ category: category || '', page: 1 });
      },
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
      if (!select.categoriesLoaded) {
        return [{ value: '', title: 'Загрузка...' }];
      }

      const categoryMap = new Map(select.categories.map(cat => [cat._id, cat]));

      const treeOptions = buildCategoryTree(select.categories, null, categoryMap);

      return [{ value: '', title: 'Все' }, ...treeOptions];
    }, [select.categories, select.categoriesLoaded, t]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategoryChange}
        size="medium"
        disabled={select.categoriesWaiting}
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
