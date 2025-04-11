import { useCallback } from 'react';
import useSelector from './use-selector';
import useTranslate from './use-translate';

export default function useDynamicTitle() {
  const { t } = useTranslate();
  const select = useSelector(state => ({
    categoryId: state.catalog.params.category[0],
    categories: state.categories.items,
    lang: state.locale.lang
  }));

  const getTitle = useCallback(() => {
    const baseTitle = t('title');
    if (!select.categoryId) return baseTitle;
    
    const category = select.categories.find(c => c._id === select.categoryId);
    return category ? `${baseTitle} / ${category.title}` : baseTitle;
  }, [select.categoryId, select.categories, t]);

  return { getTitle };
}