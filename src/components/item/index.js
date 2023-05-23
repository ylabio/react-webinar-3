import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
    const cn = bem("Item");
    const callbacks = {
      clickButton: () => {
        props.clickButton(props.item.code)
      }
    }
    return (
        <div className={cn()}>
            <div className={cn("code")}>{props.item.code}</div>
            <div className={cn("title")}>{props.item.title}</div>
            <div className={cn("price")}>
                {props.item.price.toLocaleString("ru-Ru") + " ₽"}
            </div>
            <div className={cn("count")}>
                {props.item.count ? props.item.count + " шт" : ""}
            </div>
            <div className={cn("actions")}>
                <button
                    onClick={callbacks.clickButton}
                    className={cn("button")}
                >
                    {props.clickName}
                </button>
            </div>
        </div>
    );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  clickButton: PropTypes.func,
};

Item.defaultProps = {
  clickButton: () => {},
}
export default React.memo(Item);
