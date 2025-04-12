import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import useTranslate from '../../hooks/use-translate';

function CategorySelect() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    onSelect: useCallback(category => {
      store.actions.catalog.setParams({ category, page: 1 });
    }, [store]),
  };

  const options = useMemo(() => {
    if (!select.categories || select.categories.length === 0) {
      return [{ value: '', title: t('filter.all') }];
    }

    const buildOptions = (categories, parentId = null, level = 0) => {
      return categories
        .filter(category => {
          if (parentId === null) return !category.parent;
          return category.parent?._id === parentId;
        })
        .flatMap(category => [
          {
            value: category._id,
            title: `${level > 0 ? '—'.repeat(level) + ' ' : ''}${category.title}`,
          },
          ...buildOptions(select.categories, category._id, level + 1),
        ]);
    };

    return [
      { value: '', title: t('filter.all') },
      ...buildOptions(select.categories),
    ];
  }, [select.categories, t]);

  return (
    <Select
      value={select.category || ''}
      onChange={callbacks.onSelect}
      options={options}
      size="medium"
    />
  );
}

export default memo(CategorySelect);