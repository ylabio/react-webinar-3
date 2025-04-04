import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationSwitcher({changeCount = (count) => {}}) {
  
  const cn = bem('PaginationSwitcher');
  const [value, setValue] = useState(10);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div></div>
      <div className={cn()} onClick={changeCount}>
        <div className={cn('wrapper')}>
          <input
            className={cn('input')}
            type='range'
            value={value}
            onChange={handleChange}
            onMouseUp={()=>changeCount(value)}
            min={5}
            max={20}
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