import './style.css';
import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';

import useSelector from '../../store/use-selector';

import Button from '../button';

import { getActualPaginationArray } from '../../utils';
import PropTypes from "prop-types";

function Pagination(props) {
  const cn = bem('Navigation');

  const [numViewPage, setNumViewPage] = useState(0);

  const callbacks = {
    onOpenPage: (pageKey) => {
      props.onOpenPage(10, pageKey);
      setNumViewPage(pageKey);
    },
  };

  const select = useSelector(state => ({
    pageCount: state.catalog.pagesCountList,
  }));

  const checkActivePage = key => key === numViewPage;

  return select.pageCount.length ? (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {getActualPaginationArray(select.pageCount, numViewPage).map(item => {
          return (
            <li key={`l-item-${item.key}`}>
              {typeof item.key === 'number' ? (
                <Button
                  onClick={() => callbacks.onOpenPage(item.key)}
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

Pagination.propTypes = {
  onOpenPage: PropTypes.func.isRequired,
};

export default memo(Pagination);
