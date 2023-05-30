import {memo} from "react";
import {Link} from "react-router-dom";

function Right({currentPage, pageNumber}) {
  return (
    <div>
      {pageNumber - currentPage > 2 && <span className="dots">...</span>}
      <Link to={`/${pageNumber}`} className="link">{pageNumber}</Link>
    </div>
  );
}

export default memo(Right);
