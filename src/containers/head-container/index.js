import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Head from '../../components/head';
import LocaleSelect from '../locale-select';
import useInit from '../../hooks/use-init';

function HeadContainer() {
  const { t } = useTranslate();
  const { category, categories } = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories
  }));

  const selectedCategory = categories.find(cat => cat._id === category);
  const title = selectedCategory 
    ? `${t('title')} / ${selectedCategory.title}`
    : t('title');

  useInit(() => {
    document.title = title;
  }, [title]);

  return (
    <Head title={title}>
      <LocaleSelect/>
    </Head>
  );
}

export default memo(HeadContainer);
