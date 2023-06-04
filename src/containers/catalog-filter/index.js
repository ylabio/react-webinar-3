import {memo, useCallback, useEffect, useMemo, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import useInit from "../../hooks/use-init";

function CatalogFilter() {

  useInit(() => {
    store.actions.category.load();
  }, [], true);

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.category.categories,
  }));

  const categoryOptions = [
    {value: 0, title: 'Все', parent: null},
    ...select.categories,
  ]

  const getTranformedArray = (initialArray) => {
    const result = [];
    const arr = [...initialArray];

    arr.map((category) => {
      // для всех категорий у которых нет родительской категории
      if (!category.parent) {
        // сначала пушим сами категории
        result.push({title: category.title, value: category.value});

        // находим детей
        const children  = arr.filter(el => el?.parent !== null && el?.parent._id === category.value);

        // преобразовываем так чтобы был -
        const transformedChildren = children.map((child) => ({value: child.value, title: `- ${child.title}`}));

        // пушим детей
        transformedChildren.forEach(child => {
          result.push(child);
        })
      }
    })

    return result;
  }

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Категория
    onSelect: useCallback((categoryId) => store.actions.catalog.setParams({ category: categoryId, page: 1 }, [store]))
  };

  
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => getTranformedArray(categoryOptions), [categoryOptions]),
  };

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onSelect}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'} delay={1000}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
