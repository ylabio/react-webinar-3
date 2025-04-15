import { memo } from 'react';
import Select from '../select';
import Input from '../input';
import SideLayout from '../side-layout';
import Button from '..//button';

/**
 * Глупый компонент фильтров каталога
 */
function CatalogFilterView({
  categories,
  categoriesLoading,
  sort,
  query,
  category,
  onSort,
  onSearch,
  onReset,
  onCategoryChange,
}) {
  const options = {
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
  };

  // Функция для рендеринга названия категории с добавлением префикса
  const renderCategoryTitle = category => {
    return category.level > 0 ? '- '.repeat(category.level) + category.title : category.title;
  };

  return (
    <SideLayout padding="medium">
      {/* Категории с вложенностью */}
      <Select
        options={categories.map(cat => ({
          ...cat,
          title: renderCategoryTitle(cat),
        }))}
        value={category}
        onChange={onCategoryChange}
        disabled={categoriesLoading}
        size="medium"
      />

      {/* Сортировка */}
      <Select options={options.sort} value={sort} onChange={onSort} size="medium" />

      {/* Поиск */}
      <Input value={query} onChange={onSearch} placeholder={'Поиск'} delay={1000} theme={'big'} />

      {/* Сброс */}
      <Button style="text" onClick={onReset} title="Сбросить" textColor="var(--primary)" />
    </SideLayout>
  );
}

export default memo(CatalogFilterView);
