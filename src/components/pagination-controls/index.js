import {memo} from 'react';
import './style.css';
import PropTypes from 'prop-types';
import PageSize from "../page-size";
import PaginationView from "../pagination-view";

function PaginationControls({
                              pageSize = 10,
                              totalPages = 1,
                              currentPage = 1,
                              onLimitChange}) {

  return (
    <div className="PaginationControls">
      <PageSize size={pageSize}
                currentPage={currentPage} setSize={onLimitChange}/>

      <PaginationView
        totalPages={totalPages}
        currentPage={currentPage}
        limit={pageSize}
      />
    </div>
  );
}


PaginationControls.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  onLimitChange: PropTypes.func.isRequired,
};

export default memo(PaginationControls);
