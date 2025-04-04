import { memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { returnPaginationRange } from '../../utils';
import SelectLimit from '../select-limit';
import PropTypes from 'prop-types';

function Pagination(props) {
  const {
    totalItem = 0,
    page = 1,
    limit = 10,
    limitChange = () => {},
    pageChange = () => {},
  } = props;
  const cn = bem('pagination');
  const array = returnPaginationRange(totalItem, page, limit);

  return (
    <div className={cn()}>
      <label>
        <SelectLimit limit={limit} limitChange={value => limitChange(value)}></SelectLimit>
      </label>
      <ul className={cn('ul')}>
        {array.map((value, index) => {
          if (value === '...') {
            return (
              <li key={index} className={cn('dots')}>
                {value}
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className={value === page ? cn('active') : cn('li')}
                onClick={() => pageChange(value)}
              >
                {value}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
Pagination.propTypes = {
  page: PropTypes.number,
  totalItem: PropTypes.number,
  limit: PropTypes.number,
  pageChange: PropTypes.func,
  limitChange: PropTypes.func,
};

export default memo(Pagination);
