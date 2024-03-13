import {memo, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({totalCount, limit, currentPage, setCurrentPage}) {
  const cn = bem('Pagination');
  const pageNumbers = [];
  const [arrOfCurrentPages, setArrOfCurrentPages] = useState([]); // Массив для вывода нужных страниц

  /**
   * Определяем количество страниц и добавляем в массив
   */
  for (let i = 1; i < Math.ceil(totalCount / limit) + 1; i++) {
    pageNumbers.push(i);
  }

  /**
   * Загрузка выбранной страницы
   * @param {Number} page 
   */
  function loadPage(page) {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  }

  /**
   * Отслеживаем состояние переменной текущей страницы и добавляем в массив нужные страницы
   */
  useEffect(() => {
    let tempNumberOfPages = [...pageNumbers];

    if (pageNumbers.length > 5) {
      if (currentPage >= 1 && currentPage <= 2) {
        tempNumberOfPages = [1, 2, 3, '...', pageNumbers.length];
      } else if (currentPage === 3) {
        const sliced = pageNumbers.slice(0, 4);
        tempNumberOfPages = [...sliced, '...', pageNumbers.length];
      } else if (currentPage > 3 && currentPage < pageNumbers.length - 2) {
        const sliced1 = pageNumbers.slice(currentPage - 2, currentPage);
        const sliced2 = pageNumbers.slice(currentPage, currentPage + 1);
        tempNumberOfPages = ([1, '...', ...sliced1, ...sliced2, '...', pageNumbers.length])
      } else if (currentPage > pageNumbers.length - 3) {
        const sliced = pageNumbers.slice(pageNumbers.length - 4);
        tempNumberOfPages = ([1, '...', ...sliced]);
      } 
    }
    
    setArrOfCurrentPages(tempNumberOfPages);
  }, [currentPage])

  return (
    <div className={cn()}>
      {arrOfCurrentPages.map((page, index) => {
        return (
          <Link 
            to={`?page=${page}`} 
            key={index} 
            className={currentPage === page ? cn('link-active') : cn('link')} 
            onClick={() => loadPage(page)}
          >
            {page}
          </Link>
        )
      })}
    </div>
  )
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
}

Pagination.defaultProps = {
  setCurrentPage: () => {}
}

export default memo(Pagination);