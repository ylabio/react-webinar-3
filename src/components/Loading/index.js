import {memo} from "react";
import './style.css';

function Loading() {
  return (
    <div className="Loading">
      <span className="loader"></span>
    </div>
  );
}

export default memo(Loading);
