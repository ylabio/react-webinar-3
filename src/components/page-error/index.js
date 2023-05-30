import {memo} from "react";
import {Link} from "react-router-dom";
import './style.css';

function PageError({translation}) {
  return (
    <div className="PageError">
      <h3>{translation.message}</h3>
      <Link to="/">{translation.link}</Link>
    </div>
  );
}

export default memo(PageError);
