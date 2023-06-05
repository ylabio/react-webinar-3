import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import React, { useState } from "react";

function OptionTree({ array, level = 0, prefix, renderItem }) {
  const cn = bem('OptionTree');

  return (
    <>
      {array.map((item) => (
        <React.Fragment key={item._id}>
          <option value={item._id}>
            {prefix && level > 0 && prefix.repeat(level) + "  "}
            {renderItem(item)}
          </option>
          {item.children && item.children.length > 0 && (
            <OptionTree
              prefix={prefix}
              renderItem={renderItem}
              array={item.children}
              level={level + 1}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

OptionTree.propTypes = {
  array: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.array,
      })
  ).isRequired,
  prefix: PropTypes.string,
  renderItem: PropTypes.func,
  level: PropTypes.number,
};

OptionTree.defaultProps = {
  renderItem: () => {},
};

export default OptionTree;
