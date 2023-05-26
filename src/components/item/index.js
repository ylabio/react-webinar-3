import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { memo, useTransition } from "react";
import { Link } from "react-router-dom";
import browserRoutes from "../../app/lib/browserRoutes";
import { numberFormat } from "../../utils";
import "./style.css";
import { useTranslation } from "../../store/translation";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

	const {t} = useTranslation()

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={props.titleLink ?? browserRoutes.product(props.item._id)}
        className={cn("title")}
      >
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t('addBtn')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
