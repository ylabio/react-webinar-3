import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {useNavigate} from 'react-router-dom';
import { content } from "../../store/translation/content";

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      props.onAdd(props.item._id)}
  }
  const navigate = useNavigate()

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title-container')} >
        <span className={cn('title')} onClick={() => navigate(props.link)}>{props.item.title}</span>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{content[props.lang].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  lang: PropTypes.string,
  link: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  lang: 'ru',
  link: '/'
}

export default memo(Item);
