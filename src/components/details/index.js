import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";
import "./style.css";

function Details(props) {
  const location = useLocation();
  const {itemId} = location.state;
  
  const store = useStore();

  useEffect(() => {
    store.actions.details.loadItem(itemId);
  }, [itemId])


  const select = useSelector(state => ({
    list: state.details.list,
  }));

  const callbacks = {
    onAdd: (e) => props.onAdd(itemId)
  }

  const cn = bem('Details');

  return (
    <div className={cn()}>
      <p>{select.list.description}</p>
      <p>Страна производитель: <span className={cn('span')}>{select.list?.madeIn?.title}</span></p>
      <p>Категория: <span className={cn('span')}>{select.list?.category?.title}</span></p>
      <p>Год выпуска: <span className={cn('span')}>{select.list.edition}</span></p>
      <h1 className={cn('price')}>Цена: {numberFormat(select.list.price)} ₽</h1>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

export default Details;