import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css'
import { Link } from "react-router-dom";


function PageList({page, totalPages, onPageChange}){
  const cn = bem('PageList');
  page = parseInt(page, 10);
  const callbacks = {
    changePage: (e) => onPageChange(e)
  }

  const handlepageClick = (clickedPage) => {
    onPageChange(clickedPage)
  }
  let content = [];
  const dots = <p className="dots">...</p>;
  const lastPage = <Link className="page" key={totalPages} to={`/page/${totalPages}`}>{totalPages}</Link>;
  const firstPage = <Link className="page" key={1} to={`/page/1`}>1</Link>;

  if(page < 4){
    for(let i = 1; i < 5; i++){
      content.push(<Link key={i} className={i === page ? 'page selected' : 'page'} to={`/page/${i}`}>{i}</Link>);
    }
    return(
      <div className={cn()}>
        {content}
        {dots}
        {lastPage}
      </div>
    );
  }
  if(page > totalPages-3){
    for(let i = totalPages - 3; i <= totalPages; i++){
      content.push(<Link key={i} className={i === page ? 'page selected' : 'page'} to={`/page/${i}`}>{i}</Link>);
    }
    return(
      <div className={cn()}>
        {firstPage}
        {dots}
        {content}
      </div>
    );
  }

  return(
    <div className={cn()}>
      {firstPage}
      {dots}
      <Link className="page" key={page-1} to={`/page/${page-1}`}>{page-1}</Link>
      <Link className="page selected" key={page}>{page}</Link>
      <Link className="page" key={page+1} to={`/page/${page+1}`}>{page+1}</Link>
      {dots}
      {lastPage}
    </div>
  );
}

PageList.propTypes = {
  onPageChange: PropTypes.func
}

export default memo(PageList);