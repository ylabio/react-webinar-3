import { useMemo } from 'react';
import Select from '../../components/select';


function CategoriesFilter({categories, currentCategory, onChangeCategory}) {
  const categoriesList = useMemo(() => {

     const handleChoose = (items, level = 0) => {
      let list = [];
      for (let i = 0; i < items.length; i++) {
        const currentItem = {
          title: `${'- '.repeat(level)}${items[i].title}`,
          value: items[i]._id ? items[i]._id : items[i].value
        };
        list.push(currentItem);
        const nextLevel = level + 1;
        if (items[i].children) {
          list = [...list, ...handleChoose(items[i].children, nextLevel)];
        }
      }
      return list;
    }

    return handleChoose(categories)
  }, [categories]);
  return (
    <Select options={categoriesList} value={currentCategory} onChange={onChangeCategory} />
  );
}

export default CategoriesFilter;

