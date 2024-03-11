import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css'


function PageList({page, totalPages, onPageChange}){
  const cn = bem('PageList');
  const callbacks = {
    changePage: (e) => onPageChange(e)
  }

  const handlepageClick = (clickedPage) => {
    onPageChange(clickedPage)
  }
  let content = [];

  if(page < 4){
    for(let i = 1; i < 5; i++){
      content.push(<p key={i} className={i === page ? 'page selected' : 'page'} onClick={() => handlepageClick(i)}>{i}</p>);
    }
    return(
      <div className={cn()}>
        {content}
        <p className="dots">...</p>
        <p className="page" key={totalPages} onClick={() => handlepageClick(totalPages)}>{totalPages} </p>
      </div>
    );
  }
  if(page > totalPages-3){
    for(let i = totalPages - 3; i <= totalPages; i++){
      content.push(<p key={i} className={i === page ? 'page selected' : 'page'} onClick={() => handlepageClick(i)}>{i}</p>);
    }
    return(
      <div className={cn()}>
        <p className="page" key={1} onClick={() => handlepageClick(1)}>1</p>
        <p className="dots">...</p>
        {content}
      </div>
    );
  }

  return(
    <div className={cn()}>
      <p className="page" key={1} onClick={() => handlepageClick(1)}>1</p>
      <p className="dots">...</p>
      <p className="page" key={page-1} onClick={() => handlepageClick(page-1)}>{page-1}</p>
      <p className="page selected" key={page}>{page}</p>
      <p className="page" key={page+1} onClick={() => handlepageClick(page+1)}>{page+1}</p>
      <p className="dots">...</p>
      <p className="page" key={totalPages} onClick={() => handlepageClick(totalPages)}>{totalPages}</p>
    </div>
  );
}

PageList.propTypes = {
  onPageChange: PropTypes.func
}

export default memo(PageList);