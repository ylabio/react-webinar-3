import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import {categoryTree, getAllChild} from '../../utils';
import useInit from "../../hooks/use-init";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categoryList: state.categories.list, //state.catalog.categoryList,
    category: state.catalog.params.category,
  }));

  useInit(() => {
    store.actions.categories.load();
  }, []);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

    onCategory: useCallback(
      category => {
        const children = getAllChild(select.categoryList, category);
        store.actions.catalog.setParams({ category, page: 1 }, false, children);
      },
      [store, select.categoryList],
    ),
  };

  useEffect(() => {
    if (select.category && select.categoryList.length > 0) {
      const children = getAllChild(select.categoryList, select.category);
      // Устанавливаем потомков в фильтр (если они используются в store)
      store.actions.catalog.setParams(
        { category: select.category, page: 1 },
        false,
        children
      );
    }
  }, [select.categoryList, select.category, store]);

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
    categories: useMemo(
      () => [
        { value: '', title: 'Все' },
        ...categoryTree(select.categoryList),
      ],
      [select.categoryList],
    ),
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
        delay={600}
        theme={'big'}
      />
      <Button style="text" onClick={callbacks.onReset} title={t('filter.reset')} />
    </SideLayout>
  );
}

export default memo(CatalogFilter);
