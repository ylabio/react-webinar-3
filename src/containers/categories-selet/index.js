import { useMemo } from 'react';
import Select from '../../components/select';
import { parseTree } from '../../utils';

function CategoriesSelect({categories, currentCategory, onChangeCategory}) {
  const categoriesList = useMemo(() => {
    return parseTree(categories)
  }, [categories]);
  return (
    <Select options={categoriesList} value={currentCategory} onChange={onChangeCategory} />
  );
}

export default CategoriesSelect;

