import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    onSort: sort => store.actions.catalog.setParams({ sort }),
    onSearch: query => store.actions.catalog.setParams({ query, page: 1 }),
    onReset: () => store.actions.catalog.resetParams(),
    onCategoryChange: category => store.actions.catalog.setParams({ category }),
  };

  const options = {
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={select.categories}
        value={select.category}
        onChange={callbacks.onCategoryChange}
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
