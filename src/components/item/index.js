import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {useNavigate} from "react-router-dom";

function Item(props){
  const navigate = useNavigate();
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    loadArticle: (e)=>props.loadArticle(props.item._id),

  }

  return (
    <div className={cn()}>
      <div className={cn('title')}
           onClick={()=>navigate('/article')}
      >
        <span className={cn('titleLink')}
              onClick={callbacks.loadArticle}
        >{props.item.title}</span>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  loadArticle: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  loadArticle: ()=>{},
}

export default memo(Item);
