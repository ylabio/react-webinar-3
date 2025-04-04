import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationButton({onClick = () => {}, page, isCurrentPage = false, children}) {

  const cn = bem('PaginationButton');

  function handleClick() {
    onClick(page)
  }


  return (
    <button
      onClick={handleClick}
      className={cn({currentPage: isCurrentPage})}
      type="button"
    >
      {page}
    </button>
  );
}

PaginationButton.propTypes = {
  onPageSelect: PropTypes.func,
  page: PropTypes.number,
  isCurrentPage: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(PaginationButton);
