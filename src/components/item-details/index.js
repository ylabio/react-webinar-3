import {memo, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Loader from "../loader/index"
import './style.css';

function ItemDetails(props) {
  const { id } = useParams();
  const cn = bem('ItemDetails');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  };

  useEffect(() => {
     setIsLoading(true);
     props.onLoadDetails(id.slice(1))
     .then(details => setData(details))
     .then(details => console.log('details',details))
     .then(()=> setIsLoading(false))
  }, [id]);

  return isLoading ? (
    <Loader />
    ) : (
    <div className={cn()}>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(data.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(data.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
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