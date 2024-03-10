import { memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  const { currentLanguage } = useLanguage();
  const { add, currency } = dictionary[currentLanguage];
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={`/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>
          {numberFormat(props.item.price)} {currency}
        </div>
        <button onClick={callbacks.onAdd}>{add}</button>
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
