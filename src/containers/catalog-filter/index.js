import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Button from '../../components/button';
import { buildCategoryMapTree, createCategories, flattenCategoryTree } from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.getCategory()
  }, [store]);


  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),

/*    onFilter: useCallback(() => store.actions.catalog.getCategory(), [store]),*/


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
  };


  const treeCategories = buildCategoryMapTree(select.categories || [])

  console.log("treeCategories", treeCategories);

  const optionsCategory = flattenCategoryTree(treeCategories);

  console.log("optionsCategory", optionsCategory);

  const { t } = useTranslate();





  return (
    <SideLayout padding="medium">
      <Select
        options={optionsCategory}
        value={''}
        onChange={id => {console.log('Текущий ID:', id)}}
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

{/*      <select onChange={e => console.log(JSON.parse(e.target.value))}>
        <option value="">Все</option>
        {optionsCategory.map(opt => (
          <option key={opt._id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>*/}


    </SideLayout>
  );
}

export default memo(CatalogFilter);
