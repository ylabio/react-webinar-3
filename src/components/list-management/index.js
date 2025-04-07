import { memo } from 'react';

import ItemsPerPageSelect from '../items-per-page';
import Pagination from '../pagination';

import './style.css';

function ListManagement({
  onPageChange,
  onItemsPerPageChange,
  itemsPerPage,
  totalItems,
  currentPage,
  translations,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="ListManagement">
      {totalItems > itemsPerPage && (
        <ItemsPerPageSelect
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          translations={translations}
        />
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      )}
    </div>
  );
}

export default memo(ListManagement);
