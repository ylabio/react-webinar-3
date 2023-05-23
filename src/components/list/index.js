import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";

function List({ list, clickButton, clickName }) {
    const cn = bem("List");
    return (
        <div className={cn()}>
            {list.map((item) => (
                <div key={item.code} className={cn("item")}>
                    <Item item={item} clickButton={clickButton} clickName={clickName} />
                </div>
            ))}
        </div>
    );
}

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number
    })).isRequired,
    clickButton: PropTypes.func,
    clickName: PropTypes.string
  };
  
  List.defaultProps = {
    clickButton: () => {}
  }

export default React.memo(List);
