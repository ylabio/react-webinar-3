import {memo} from "react";
import {Link} from "react-router-dom";
import './style.css';

function Center({currentPage, pageAmount}) {
  return (
    <div className="Pagination-block">
      {pageAmount === currentPage && pageAmount > 2 && <span className="item"><Link to={`/${currentPage - 2}`} className="link">{currentPage - 2}</Link></span>}
      {currentPage > 1 && <span className="item"><Link to={`/${currentPage - 1}`} className="link">{currentPage - 1}</Link></span>}
      <div className='active'><span>{currentPage}</span></div>
      {currentPage < pageAmount && <span className="item"><Link to={`/${currentPage + 1}`} className="link">{currentPage + 1}</Link></span>}
      {currentPage === 1 && pageAmount > 2 && <span className="item"><Link to={`/${currentPage + 2}`} className="link">{currentPage + 2}</Link></span>}
    </div>
  );
}

export default memo(Center);
