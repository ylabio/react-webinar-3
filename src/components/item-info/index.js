import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { getTranslation, numberFormat } from "../../utils";
import "./style.css";
import useSelector from "../../store/use-selector";

function ItemInfo({ itemData, onAdd }) {
  const cn = bem("ItemInfo");

  const callbacks = {
    onAdd: (e) => onAdd(itemData._id),
  };

  const select = useSelector((state) => ({
    languages: state.language,
  }));

  return (
    <div className={cn()}>
      <p>{itemData.description}</p>
      <p>
        {getTranslation("country")} {""}
        <b>
          {itemData.madeIn} ({itemData.madeInCode})
        </b>
      </p>
      <p>
        {getTranslation("category")} <b>{itemData.category}</b>
      </p>
      <p>
        {getTranslation("year")} <b>{itemData.edition}</b>
      </p>
      <p>
        <b className={"price"}>
          {" "}
          {getTranslation("price")} {numberFormat(itemData.price)} ₽
        </b>
      </p>
      <button onClick={callbacks.onAdd}>{getTranslation("add")}</button>
    </div>
  );
}
ItemInfo.propTypes = {
  itemData: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemInfo);
