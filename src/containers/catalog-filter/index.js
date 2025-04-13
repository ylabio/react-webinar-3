import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import CategorySelect from '../../components/category-select';
import { sortCategories } from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter(factory, deps) {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.category.defaultCategory,
    categoryList: state.category.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Обновляем id для поиска по категориям
    onChangeIdCategory: useCallback(
      categoryId => store.actions.catalog.setCategoryParametr(categoryId),
      [store.category],
    ),
    // Обновление текущей категории
    onUpdateDefaultCategory: useCallback(
      param => store.actions.category.setCurrentCategory(param),
      [store],
    ),
    // Сброс категории
    onResetCategory: useCallback(() => store.actions.category.resetCategory(), [store]),
  };

  const options = {
    sort: useMemo(() => [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]),
    categories: useMemo(() => [...sortCategories(select.categoryList)]),
  };

  const { t } = useTranslate();

  const onResetParams = () => {
    callbacks.onReset();
    callbacks.onResetCategory();
  };

  return (
    <SideLayout padding="medium">
      <CategorySelect
        categoryList={options.categories}
        size="medium"
        value={select.category}
        onChange={callbacks.onChangeIdCategory}
        onUpdate={callbacks.onUpdateDefaultCategory}
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
        delay={600}
        theme={'big'}
      />
      <Button style="text" onClick={onResetParams} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
