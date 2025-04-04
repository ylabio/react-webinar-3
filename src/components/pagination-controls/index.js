import { memo, useEffect, useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import PageSize from "../page-size";
import PaginationContainer from "../pagination-сontainer";

function PaginationControls({totalCount, onChange = () => {}}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getSkipByPage = (page, limit) => (page - 1) * limit;
  const getPageBySkip = (skip, limit) => Math.floor(skip / limit) + 1;

  useEffect(() => {
    const skip = getSkipByPage(currentPage, limit);
    onChange(skip, limit);
  }, [currentPage, limit]);

  const handleLimitChange = (newLimit) => {
    const skip = getSkipByPage(currentPage, limit);
    const newPage = getPageBySkip(skip, newLimit);
    setLimit(newLimit);
    setCurrentPage(newPage);
  };

  return (
    <div className="PaginationControls">
      <PageSize size={limit} setSize={handleLimitChange} />

      <PaginationContainer
        totalCount={totalCount}
        currentPage={currentPage}
        limit={limit}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}


PaginationControls.propTypes = {
  totalCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(PaginationControls);
