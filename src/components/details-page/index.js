import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import "./style.css";

function DetailsPage(props) {

  const cn = bem('DetailsPage');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.select._id)
  }

  return (
    <>
      <div className={cn()}>
        <p>{props.select.description}</p>
        <p>Страна производитель: <span className={cn('span')}>{props.select?.madeIn?.title}</span></p>
        <p>Категория: <span className={cn('span')}>{props.select?.category?.title}</span></p>
        <p>Год выпуска: <span className={cn('span')}>{props.select.edition}</span></p>
        <h1 className={cn('price')}>Цена: {numberFormat(props.select.price)} ₽</h1>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </>
  );
}

export default DetailsPage;