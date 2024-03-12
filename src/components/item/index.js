import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Item(props) {
  const navigate = useNavigate();
  const store = useStore();
  const t = store.actions.translator.useTranslate();

  const select = useSelector((state) => ({
    lang: state.translator.language,
  }));

  const cn = bem("Item");
  const callbacks = {
    onItemClick: (e) => {
      e.stopPropagation();
      navigate(`/${props.item._id}`);
    },
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn("title")} onClick={callbacks.onItemClick}>
        {props.item.title}
      </div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t("Добавить")}</button>
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
