import {memo} from "react";
import {Link} from "react-router-dom";
import 'style.css';
function Left({currentPage}) {

  return (
    <div>
      <Link to={`/`} className="link">1</Link>
      {currentPage > 3 && <span className="dots">...</span>}
    </div>
  )
}

export default memo(Left);