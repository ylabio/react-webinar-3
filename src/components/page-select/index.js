import { memo, useCallback } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import PageSelectButton from '../page-select-button';
import './style.css';

function PageSelect({currentPage, pages}) {

  const renderPageSelect = useCallback((currentPage, pages) => {
    let pageNumbers = [1, currentPage - 1, currentPage, currentPage + 1, pages];
    if (currentPage === 1) {
      pageNumbers.splice(4, 0, 3);
    }
    if (currentPage === pages) {
      pageNumbers.splice(pageNumbers.length - 4, 0, pages - 2);
    }
    pageNumbers = pageNumbers.filter((page) => page > 0 && page <= pages);
    pageNumbers = Array.from(new Set(pageNumbers));
    
    if (currentPage > 3) {
      pageNumbers.splice(1, 0, '…');
    }
    if (currentPage < pages - 2) {
      pageNumbers.splice(pageNumbers.length - 1, 0, '…');
    }

    return pageNumbers.map((page, index) => {
      return <PageSelectButton key={`page-select-button-${index}`} page={page.toString()} active={currentPage === page} />
    });
  }, []);

  const cn = bem('PageSelect');
  return (
    <div className={cn()}>
        {renderPageSelect(currentPage, pages)}
    </div>
  );
}

PageSelect.propTypes = {
    currentPage: PropTypes.number,
    pages: PropTypes.number,
};

PageSelect.defaultProps = {
  currentPage: 0,
  pages: 1,
}

export default memo(PageSelect);