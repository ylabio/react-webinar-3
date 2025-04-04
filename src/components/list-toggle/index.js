import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ListToggle() {
  const cn = bem('ListToggle');
  return (
    <div className={cn()}>
      <button type='button'>1</button>
      <button  className={'active'} type='button'>2</button>
      <span>...</span>
      <button type='button'>25</button>
    </div>
  );
}

ListToggle.propTypes = {
  sum: PropTypes.number,
};

export default memo(ListToggle);
