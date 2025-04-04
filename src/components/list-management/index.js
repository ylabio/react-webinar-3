import { memo, useCallback } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import ItemsPerPageSelect from '../items-per-page';
import Pagination from '../pagination';

import './style.css';

function ListManagement() {
  const store = useStore();

  const select = useSelector(state => ({
    itemsPerPage: state.catalog.itemsPerPage,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
  }));

  const totalPages = Math.ceil(select.totalItems / select.itemsPerPage);

  const callbacks = {
    onPageChange: useCallback(
      page => {
        store.actions.catalog.load(page);
      },
      [store],
    ),

    onItemsPerPageChange: useCallback(
      itemsPerPage => {
        store.actions.catalog.changeItemsPerPage(itemsPerPage);
      },
      [store],
    ),
  };

  if (select.totalItems === 0) {
    return null;
  }

  return (
    <div className="ListManagement">
      {select.totalItems > select.itemsPerPage && (
        <ItemsPerPageSelect value={select.itemsPerPage} onChange={callbacks.onItemsPerPageChange} />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={select.currentPage}
          onPageChange={callbacks.onPageChange}
        />
      )}
    </div>
  );
}

export default memo(ListManagement);
