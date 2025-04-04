import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Pagination from '../pagination';

function PaginationTool({
  currentPage,
  totalPages,
  onPageChange = () => {},
  onLimitChange = () => {},
}) {
  const callbacks = {
    onChange: e => onLimitChange(e.target.value),
  };

  return (
    <div className="PaginationTool">
      <select onChange={callbacks.onChange} defaultValue={5}>
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

PaginationTool.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default memo(PaginationTool);
