import { useState, useEffect, useMemo } from 'react';

const useCategoriesList = () => {
    const [categories, setCategories] = useState();
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
          const json = await response.json();
          setCategories(json.result.items);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchData();
    }, []);
  
    const buildCategoryOptions = useMemo(() => {
      const flattenCategories = (categories, level = 0, parentTitle = '') => {
        let options = [];
        categories.forEach((category, index) => {
          const prefix = "-".repeat(level);
          const title = `${prefix} ${category.title}`;
          options.push({ value: category._id, title: title });
          if (category.children && category.children.length > 0) {
            options.push(...flattenCategories(category.children, level + 1, title));
          }
          // Add separator between categories except for the last category
          if (index < categories.length - 1) {
            options.push({ value: `separator-${category._id}`, title: '-', disabled: true });
          }
        });
        return options;
      };
  
      if (!categories) {
        return [];
      }
  
      const allCategoriesOption = { value: 'all', title: 'Все категории' };
      const categoryOptions = flattenCategories(categories);
      return [allCategoriesOption, ...categoryOptions];
    }, [categories]);
  
    return { categories, buildCategoryOptions };
  };
  
  export default useCategoriesList;