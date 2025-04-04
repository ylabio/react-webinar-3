import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';
import PaginationControl from '../pagination-control';
import PaginationLimit from '../pagination-limit';

function Pagination({ pagination = () => {}, count = 0, setLimit = () => {}, limit = 0 }) {
  return (
    <div className={'Pagination'}>
      <PaginationLimit onChange={setLimit} limit={limit} />
      <PaginationControl pagination={pagination} count={count} limit={limit} />
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.func.isRequired,
  count: PropTypes.number,
  setLimit: PropTypes.func,
  limit: PropTypes.number,
};

export default memo(Pagination);
