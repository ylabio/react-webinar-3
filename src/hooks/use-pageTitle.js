import { useEffect } from 'react';
import useSelector from '../hooks/use-selector';
import useTranslate from '../hooks/use-translate';

function usePageTitle({ useCatalogLogic = false, customTitle = null, defaultTitle = '' } = {}) {
  const { t } = useTranslate();

  const select = useSelector(state =>
    useCatalogLogic
      ? {
          categoryTitle: state.catalog.getPageTitle(t),
        }
      : null,
  );

  const pageTitle = customTitle
    ? customTitle
    : useCatalogLogic
      ? select?.categoryTitle
        ? `${t('title')} / ${select.categoryTitle}`
        : t('title')
      : t(defaultTitle);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return pageTitle;
}

export default usePageTitle;
