import {memo} from "react";
import './style.css';

function PageNotFound() {

  const cn = bem('PageNotFound');

  return (
    <div className={cn()}>
      <h2>Page Not Found</h2>
    </div>
  );
}

export default memo(PageNotFound);