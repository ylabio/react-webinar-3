import React, { createContext, useEffect, useState, useContext } from 'react';
import { buildCategoryTree } from '../utils';

const CategoryContext = createContext({
  options: [],
  loading: true,
});

export const CategoryProvider = ({ children }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
        const data = await res.json();
        
        const categories = data.result?.items || [];
        const flatOptions = buildCategoryTree(categories, {
          prefix: '- ',
          rootTitle: 'Все категории'
        });

        setOptions(flatOptions);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ options, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);