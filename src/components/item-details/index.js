import {memo, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Loader from "../loader/index";
import useSelector from "../../store/use-selector";
import './style.css';

function ItemDetails(props) {
  const { id } = useParams();
  const cn = bem('ItemDetails');
  const [isLoading, setIsLoading] = useState(false);
  const details = useSelector(state => state.catalog.details);

  const callbacks = {
    onAdd: (e) => props.onAdd(id.slice(1))
  };

  useEffect(() => {
     setIsLoading(true);
     props.onLoadDetails(id.slice(1))
     .then(details => {
      // setDetails(details);
     })
     .then(()=> setIsLoading(false))
  }, [id]);

  return isLoading ? (
    <Loader />
    ) : (
    <div className={cn()}>
        <div className={cn('description')}>{Object.keys(details).length ? details.description : ''}</div>
        <div className={cn('country')}>Страна производитель: <b>{Object.keys(details).length ? `${details.madeIn.title} (${details.madeIn.code})` : ''}</b></div>
        <div className={cn('category')}>Категория: <b>{Object.keys(details).length ? details.category.title : ''}</b></div>
        <div className={cn('edition')}>Год выпуска: <b>{details.edition}</b></div>
        <div className={cn('price')}><b>Цена: {numberFormat(details.price || 0)} ₽</b></div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    </div>
  )
}

ItemDetails.propTypes = {
  onAdd: PropTypes.func,
  onLoadDetails: PropTypes.func,
}

ItemDetails.defaultProps = {
  onAdd: () => {},
  onLoadDetails: () => {},
}

export default memo(ItemDetails);