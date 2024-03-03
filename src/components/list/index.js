import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List({ theme, list, onDeleteItem, onSelectItem, onBucketAction }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            theme={theme}
            item={item}
            onDelete={onDeleteItem}
            onSelect={onSelectItem}
            onBucketAction={onBucketAction}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onBucketAdd: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
  onBucketAdd: () => {},
};

export default React.memo(List);
