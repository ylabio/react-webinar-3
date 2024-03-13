import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {useLanguage} from "../../LanguageContext";
import FlexContainer from "../flex-container";

function Item(props) {

  const cn = bem('Item');
  const {tr} = useLanguage()

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  const linkTo = props.customLink || `/articles/${props.item._id}`;

  return (
      <FlexContainer>
        <Link to={linkTo} className={cn('title')}>
          {props.item.title}
        </Link>
        <div className={cn('actions')}>
          <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
          <button onClick={callbacks.onAdd}>{tr('addBtn')}</button>
        </div>
      </FlexContainer>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  customLink: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
