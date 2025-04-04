import {memo} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationButtons({totalPages, currentPage, ButtonsAround = 1, onChange = () => {}}) {
  const cn = bem('Pagination');

  const createButtons = () => {
    const pages = [1]

    // Ищем какие кнопки будут показаны вокруг активной
    const first = Math.max(2, currentPage - ButtonsAround)
    const last = Math.min(totalPages - 1, currentPage + ButtonsAround )

    if (first > 2) pages.push('...')

    for (let i = first; i <= last; i++) {
      pages.push(i)
    }

    if (last < totalPages - 1 ) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages
  }

  const pages = createButtons()


  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pages.map((page, index) => (
          <li key={index} className={cn('item')}>
            {page === '...' 
            ? (<span className={cn('dots')}>{page}</span>)
            : (<button 
                className={page === currentPage 
                  ? `${cn('button')} ${cn('button--active')}` 
                  : cn('button')} 
                onClick={() => onChange(page)} 
                disabled={page === currentPage}
                >
                  {page}
                </button>
              )
            } 
          </li>
        ))}
      </ul>
    </div>
  );
}

PaginationButtons.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  ButtonsAround: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(PaginationButtons);
