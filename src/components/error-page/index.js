// import { useRouteError } from "react-router-dom";
import './style.css';

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className='ErrorPage' id="error-page">
      <div className="ErrorPage-container">
        <h1>Ой</h1>
        <p>Извините, произошла непредвиденная ошибка</p>
        <p>Подробную информацию можно найти в консоли</p>
      </div>
    </div>
  );
}
