import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import { getSum } from "../../utils";
import { formatPrice } from "../../utils";

function List({ list, handleCart, title }) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (list.length > 0) {
      const sum = getSum(list);
      setSum(sum);
    } else setSum();
  }, [list]);

  return (
    <div className="List">
      {list.map((item) => {
        return (
          <div key={item.code} className="List-item">
            <Item
              item={item}
              handleCart={handleCart}
              count={item.count}
              title={title}
            />
          </div>
        );
      })}
      {sum > 0 || (sum === 0 && list.length === 1) ? (
        <div className="List-sum-container">
          <div className="List-sum">
            <span>Итого</span>
            <span>{formatPrice(sum)} ₽</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  handleCart: PropTypes.func,
  title: PropTypes.node,
};

List.defaultProps = {
  handleCart: () => {},
};

export default React.memo(List);
