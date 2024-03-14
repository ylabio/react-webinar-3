import {memo} from "react"
import {Link} from "react-router-dom";
import './style.css'

function PaginationLink({page, children}) {
  const path = '/page/' + page;

  return (
    <Link className='PaginationLink' to={path}>
      {children}
    </Link>
  )
}

export default memo(PaginationLink);
