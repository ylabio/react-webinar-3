import {memo} from "react";
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import { AppRoute } from "../../const";
import './style.css';

function PageNotFound() {

  const cn = bem('PageNotFound');

  return (
    <div className={cn()}>
      <h1>Page Not Found</h1>
      <Link className={cn('link')} to={AppRoute.Main}>Вернуться на главную</Link>
    </div>
  );
}

export default memo(PageNotFound);
