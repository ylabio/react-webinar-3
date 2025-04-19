import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../custom-select';
import Spinner from '../spinner';
import { useCategories } from '../../hooks/use-categories';

const CategorySelect = ({ value, onChange, placeholder }) => {
  const { options, loading } = useCategories();

  if (loading) {
    return <Spinner />;
  }

  return (
    <CustomSelect
      options={options}
      value={value}
      onChange={(selectedValue) => {
        const found = options.find(opt => opt.value === selectedValue);
        if (found) {
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
