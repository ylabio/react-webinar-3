import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, itemsBtn }) {
  return (
    <div className="List">
      {list.map((item) => {

        const {content, ...itemData} = item;

        return (
          <div key={itemData.code} className="List-item">
            <Item
              itemData={itemData}
              content={content}
              btn={itemsBtn}
            />
          </div>
        );
      })}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      infoContent: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
    })
  ).isRequired,
  itemBtn: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

export default React.memo(List);
