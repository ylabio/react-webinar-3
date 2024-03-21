import { useState, useEffect } from 'react';

export default function useCategoriesList ()  {
    const [categories, setCategories] = useState();

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(
            "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
          );
          const json = await response.json();
          setCategories(json.result.items);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchData();
    }, []);
  
    function transform(categories = [], parent = null, indent = 0) {
      const result = [];
  
      categories.forEach((category) => {
        if (
          (parent === null && !category.parent) ||
          (category.parent && category.parent._id === parent)
        ) {
          const title = "- ".repeat(indent) + category.title;
          result.push({ value: category._id, title });
          const childrenCategories = transform(
            categories,
            category._id,
            indent + 1
          );
          result.push(...childrenCategories);
        }
      });
  
      return result;
    }
  
    return transform(categories);
  }
