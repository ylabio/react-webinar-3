import {memo} from "react";
import { Link } from "react-router-dom";

function Navigate() {

  return (
    <div>
      <Link to='/'>Главная</Link>
    </div>
  );
}


export default memo(Navigate);