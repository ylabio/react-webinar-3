import { memo, useState, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';

import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

import Button from '../button';

import { getCurrentPaginationArray } from '../../utils';

import './style.css';

function Pagination() {
  const store = useStore();

  const select = useSelector(state => ({
    pageCount: state.catalog.pagesCountList,
  }));

  const callbacks = {
    // Обновление страницы
    openAnotherPage: useCallback(
      pageKey => {
        store.actions.catalog.updateProductData(10, pageKey), setNumViewPage(pageKey);
      },
      [store],
    ),
  };

  const [numViewPage, setNumViewPage] = useState(0);

  const cn = bem('Navigation');

  const checkActivePage = key => key === numViewPage;

  return select.pageCount.length ? (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {getCurrentPaginationArray(select.pageCount, numViewPage).map(item => {
          return (
            <li key={`l-item-${item.key}`}>
              {typeof item.key === 'number' ? (
                <Button
                  onClick={() => callbacks.openAnotherPage(item.key)}
                  style={`pagination${checkActivePage(item.key) ? ' active' : ''}`}
                  title={`${item.page}`}
                  disabled={checkActivePage(item.key)}
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

export default memo(Pagination);
