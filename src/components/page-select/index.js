import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { PageSelectButton } from '../page-select-button';
import './style.css';

function PageSelect({currentPage, pages}) {

  const renderPageSelect = useCallback((currentPage, pages) => {

  }, [currentPage,pages]);

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