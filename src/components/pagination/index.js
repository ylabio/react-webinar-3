import { useState, useCallback, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';

import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

import Button from '../button';

import { getCurrentPaginationArray } from '../../utils';

import './style.css';

function Pagination() {
  const store = useStore();

  const select = useSelector(state => ({
    allItemsCount: state.catalog.allItemsCount,
    currentPage: state.catalog.currentPage,
    itemsPerPage: state.catalog.itemsPerPage,
  }));

  const [currentPage, setCurrentPage] = useState(select.currentPage);

  const callbacks = {
    // Обновление страницы
    openNextPage: useCallback(
      (pageItems, page) => {
        store.actions.catalog.updateProductData(pageItems, page);
        setCurrentPage(page);
      },
      [store.state.catalog],
    ),
  };

  const paginationList = getCurrentPaginationArray(
    select.itemsPerPage,
    select.currentPage,
    select.allItemsCount,
  );

  const cn = bem('Pagination');

  const checkActivePage = page => page === currentPage;

  useEffect(() => {
    setCurrentPage(prev => select.currentPage);
  }, [store.state.catalog.currentPage]);

  return paginationList.length ? (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {paginationList.map(item => {
          return (
            <li key={`l-item-${item.key}`}>
              {typeof item.key === 'number' ? (
                <Button
                  onClick={() => callbacks.openNextPage(select.itemsPerPage, item.page)}
                  style={`pagination${checkActivePage(item.page) ? ' active' : ''}`}
                  title={`${item.page}`}
                  disabled={checkActivePage(item.page)}
                />
              ) : (
                <Button style="pagination dots" title={`${item.page}`} disabled={true} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  ) : null;
}

export default Pagination;
