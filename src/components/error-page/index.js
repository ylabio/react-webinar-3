import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import { useRouteError } from "react-router-dom";
import './style.css';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const cn = bem('ErrorPage');

  return (
    <div className={cn()} id="error-page">
      <h1>Упс!</h1>
      <p>Что-то пошло не так</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
export default memo(ErrorPage);
