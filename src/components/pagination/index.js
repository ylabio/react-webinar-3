import {memo, useCallback, useEffect} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({page, toPage}){

  const cn = bem('Pagination');

  const lastPageNum = Math.ceil(page.count / page.limit)
  const curPage = Math.round((page.skip + page.limit) / page.limit)
  
  let navTemplate = null
  if (lastPageNum <= 5) {
    navTemplate = Array.from({length: lastPageNum}, (_, i) => i + 1)
  }
  else if (curPage <= 2) {
    navTemplate = [1, 2, 3, 'skip', lastPageNum]
  }
  else if (curPage == 3) {
    navTemplate = [1, 2, 3, 4, 'skip', lastPageNum]
  }
  else if (lastPageNum - curPage <= 2) {
    navTemplate = [1, 'skip', lastPageNum - 3, lastPageNum - 2, lastPageNum - 1, lastPageNum]
  }
  else {
    navTemplate = [1, 'skip', curPage - 1, curPage, curPage + 1, 'skip', lastPageNum]
  }

  return (
    <nav className={cn()}>
      <ul>{
        navTemplate.map((pageNum, i) => {
          if (pageNum == "skip") {
            return <li key={i}><span className={cn("skip")}>...</span></li>
          }
          else {
            return (
            <li key={i}>
              <button className={"Pagination-button" + (pageNum == curPage ? " Pagination-button_selected" : "")}
               onClick={e => toPage(pageNum)}>{pageNum}</button>
            </li>
            )
          }
        })}
      </ul>
    </nav>
  );
}

export default memo(Pagination);
