import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationSwitcher({changeCount = () => {}}) {
  const [value, setValue] = useState(10);
  
  const cn = bem('PaginationSwitcher');

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <>
      <div></div>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <input
            className={cn('input')}
            type='range'
            value={value}
            onChange={handleChange}
            onMouseUp={(e) => changeCount(Number(e.target.value))}
            min={5}
            max={50}
            step={1}
          />
        </div>
        <div className={cn('container')}>
          Количество записей: {value}
        </div>
      </div>
    </>
    
  )
}

PaginationSwitcher.propTypes = {
  changeCount: PropTypes.func,
};

export default PaginationSwitcher;