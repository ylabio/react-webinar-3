import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Paginate({listLength = 0, limit = 10, setSkip}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listLength / limit); i++) {
    pageNumbers.push(i)
  }

  const paginate = pageNumber => setSkip(pageNumber);

  const cn = bem('Pagination');

  return (
    <>
      <ul className={cn()}>
        {
          // Рендер кнопок пагинации. Добавляем классы для активной кнопки и ее соседей. Обрабатываем исключения.  
          pageNumbers.map(number => 
            <li id={`paginate-${number}`} className={`${cn('button')}
              ${currentPage === 1  && number === currentPage + 1 || currentPage === 1  && number === currentPage + 2 || currentPage === 3  && number === currentPage - 2 ? "subactive" : ""}
              ${currentPage === pageNumbers.length && number === currentPage - 2 || currentPage === pageNumbers.length - 2 && number === pageNumbers.length ? "subactive" : ""} 
              ${number === currentPage - 1 || number === currentPage + 1  ? "subactive" : ""} 
              ${number === currentPage ? "active" : ""}`} key={number}>
              <a href="!#" className={cn('link')} onClick={(e) => {
                e.preventDefault(); 
                paginate(number); 
                setCurrentPage(number);}}>
                {number}
              </a>
            </li>
        )}
      </ul>
    </>
  )
}

Paginate.propTypes = {
  listLength: PropTypes.number,
  limit: PropTypes.number,
  setSkip: PropTypes.func,
};

export default memo(Paginate);
