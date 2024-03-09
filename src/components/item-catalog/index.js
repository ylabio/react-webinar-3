import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { Link } from "react-router-dom";
import "./style.css";
import useTranslation from "../../hooks/useTranslation";

function ItemCatalog(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  const [getTranslation] = useTranslation();

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`${props.item._id}`} className={cn("title")}>
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{getTranslation("add")}</button>
      </div>
    </div>
  );
}

ItemCatalog.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemCatalog.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemCatalog);
