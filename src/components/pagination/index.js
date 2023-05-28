import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({ total, current, onClick }) {
  const cn = bem('Pagination');

  const fill = (from, to) => {
    return Array.from({ length: to - from + 1 }, (v, k) => from + k);
  }

  const array = useMemo(() => {
    if (total <= 5 || (current == 3 && total == 6)) {
      return fill(1, total);
    }
    if (current < 3) {
      return fill(1, 3).concat('...', total);
    }
    if (current == 3) {
      return fill(1, 4).concat('...', total);
    }
    if (current == total - 2) {
      return [1, '...'].concat(fill(current - 1, total));
    }
    if (current > total - 2) {
      return [1, '...'].concat(fill(total - 2, total));
    }
    return [1, '...'].concat(fill(current - 1, current + 1)).concat('...', total);
  }, [total, current]);

  const defineStyle = useCallback(value => {
    switch (value) {
      default: return 'normal';
      case current: return 'selected';
      case '...': return 'dots';
    }
  }, [current]);

  return (
    <div className={cn()}>
      {array.map((value, index) => {
          return <div key={index} className={cn(defineStyle(value))}
            onClick={() => onClick(value)}
          >{value}</div>
      })}
    </div>
  );
};

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  current: PropTypes.number,
  total: PropTypes.number.isRequired
}

Pagination.defaultProps = {
  current: 1
}

export default React.memo(Pagination);