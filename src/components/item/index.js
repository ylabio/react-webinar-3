import {memo, useContext} from "react";
import PropTypes from "prop-types";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translate} from "../../utils";
import {NavLink} from "react-router-dom";
import {LanguageContext} from "../../store/context";
import './style.css';

function Item(props){
  const cn = bem('Item');
  const activeLanguage = useContext(LanguageContext)

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <NavLink
          to={props.link}
          className={({ isActive }) =>
            isActive ? cn('link_active') : cn('link')
          }
        >
          {props.item.title}
        </NavLink>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate('add', activeLanguage)}</button>
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
  link: propTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
