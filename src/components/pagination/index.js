import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');
  const countPages = Math.ceil(props.totalPages / props.limit);
  const showedPageButtons = [];

  // Всегда отображать кнопку первой страницы
  showedPageButtons.push(props.generateButton(0, props.limit));

  if ((props.currentPage + 1) < 3) {
    // Отображение кнопок для малых значений текущей страницы
    showedPageButtons.push(props.generateButton(1, props.limit));
    showedPageButtons.push(props.generateButton(2, props.limit));
    showedPageButtons.push({ key: 'ellipsis' });
  } else if ((props.currentPage + 1) > countPages - 2) {
    // Отображение кнопок для больших значений текущей страницы
    showedPageButtons.push({ key: 'ellipsis' });
    showedPageButtons.push(props.generateButton(countPages - 3, props.limit));
    showedPageButtons.push(props.generateButton(countPages - 2, props.limit));
  } else {
    // Отображение кнопок для остальных случаев
    if ((props.currentPage + 1) > 3) showedPageButtons.push({ key: 'ellipsis_1' });
    showedPageButtons.push(props.generateButton(props.currentPage - 1, props.limit));
    showedPageButtons.push(props.generateButton(props.currentPage, props.limit));
    showedPageButtons.push(props.generateButton(props.currentPage + 1, props.limit));
    if ((props.currentPage + 1) < countPages - 2) showedPageButtons.push({ key: 'ellipsis_2' });
  }
  // Всегда отображать кнопку последней страницы
  showedPageButtons.push(props.generateButton(countPages - 1, props.limit));

  return (
    <div className={cn()}>
      <ul>
        {showedPageButtons.map(button => !button.key ?
          <li className={cn('page', (button.pageNumber === props.currentPage ? 'selected' : ''))} key={button.pageNumber} onClick={() => {
            props.setCurrentPage(button.pageNumber);
          }}>
            {button.pageNumber + 1}
          </li> :
          <li className={cn('page', ('ellipsis'))} key={button.key}>...</li>
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number
};

Pagination.defaultProps = {
  totalPages: 0
}

export default memo(Pagination);
