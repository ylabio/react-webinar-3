import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { UI_TEXTS } from '../../consts/content';
import LinkComponent from '../link';

function Item(props) {

  const cn = bem('Item');

  const currentLanguage = document.documentElement.lang
  const uiText = {
    addItemBtn: UI_TEXTS[currentLanguage].main.catalogList.addItemBtn,
  }

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <LinkComponent to={props.productLink} className={cn('title')}>
        {props.item.title}
      </LinkComponent>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{uiText.addItemBtn}</button>
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
  productLink: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
