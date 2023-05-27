import './style.css'
import React from "react";
import useSelector from "../../store/use-selector";
import {Link, useSearchParams} from "react-router-dom";

function Paginator() {

  const [searchParams] = useSearchParams();
  // Получаем текущую страницу из url
  const page = +searchParams.get('page');
  const select = useSelector(state => ({
    count: state.catalog.count,
  }));
  const totalPages = Math.ceil(select.count / 10);

  const visiblePages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    if (page <= 3) {
      for (let i = 1; i <= 4; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
      visiblePages.push(totalPages);
    } else if (page >= totalPages - 2) {
      visiblePages.push(1);
      visiblePages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);
      visiblePages.push('...');
      for (let i = page - 1; i <= page + 1; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
      visiblePages.push(totalPages);
    }
  }

  return (
    <div className={'paginator'}>
      <div className={'paginatorWrapper'}>
        {visiblePages.map((pageItem, index) => {
          if (pageItem === '...') {
            return (
              <div key={index} className={'paginatorEmptySpace'}>
                ...
              </div>
            );
          }

          return (
            <Link
              key={index}
              className={pageItem === page ? 'paginatorLinkActive' : 'paginatorLink'}
              to={`/?page=${pageItem}`}
            >
              {pageItem}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Paginator);