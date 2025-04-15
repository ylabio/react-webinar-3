import { memo, useCallback, useMemo, } from 'react';
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
function CatalogFilter({ onCategoryChange }) {
  
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  // Функция для создания вложенной структуры категорий
  const buildOptions = (categories, parentId = null, depth = 0) => {
    return categories
      .filter(category => (category.parent ? category.parent._id === parentId : parentId === null))
      .flatMap(category => [
        { 
          value: category._id, 
          title: `${'- '.repeat(depth)} ${category.title}` // Добавляем отступы для вложенности
        },
        ...buildOptions(categories, category._id, depth + 1) // Рекурсивный вызов для дочерних категорий
      ]);
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
    // {
    //   "_id": "67f1871a692e2282cbacd2f4",
    //   "title": "Электроника",
    //   "parent": null
    // },
    categories: useMemo(() => {
      // Создаем массив категорий с добавлением опции "Все"
      const allCategories = [
        { value: '', title: 'Все' }, // Опция "Все"
        ...buildOptions(select.categories) // Вызов функции для построения вложенной структуры
      ];
      
      return allCategories;
    }, [select.categories]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={onCategoryChange}
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
