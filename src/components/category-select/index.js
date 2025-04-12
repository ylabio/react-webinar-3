import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../custom-select';
import Spinner from '../spinner';

const CategorySelect = ({ value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      .then((res) => res.json())
      .then((data) => {
        console.log('Ответ API категорий:', data);
        
        const categories = Array.isArray(data.result?.items)
          ? data.result.items
          : [];
          
        const categoryMap = {};
        categories.forEach(cat => {
          categoryMap[cat._id] = { ...cat, children: [] };
        });

        const tree = [];
        categories.forEach(cat => {
          if (cat.parent && cat.parent._id && categoryMap[cat.parent._id]) {
            categoryMap[cat.parent._id].children.push(categoryMap[cat._id]);
          } else {
            tree.push(categoryMap[cat._id]);
          }
        });

        const flatOptions = [];
        const traverse = (nodes, depth = 0) => {
          nodes.forEach(node => {
            const prefix = depth > 0 ? `${'-'.repeat(depth)} ` : '';
            flatOptions.push({
              value: node._id,
              title: `${prefix}${node.title}`,
              rawTitle: node.title,
            });
            if (node.children && node.children.length > 0) {
              traverse(node.children, depth + 1);
            }
          });
        };
        traverse(tree, 0);
        flatOptions.unshift({ value: '', title: 'Все категории', rawTitle: 'Все категории' });
        setOptions(flatOptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке категорий:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <CustomSelect
      options={options}
      value={value}
      onChange={(selectedValue) => {
        const found = options.find(opt => opt.value === selectedValue);
        if(found) {
          onChange(found);
        }
      }}
      placeholder={placeholder}
      size="medium"
    />
  );
};

CategorySelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CategorySelect;
