import React, { useContext } from "react";
import { Context } from "../context";
import { constructIntl } from "../../utils";
import PropTypes from "prop-types";
import './style.css';

function Item({item}) {
  const { defaultContext, modifiedContext } = useContext(Context);

  const callbacks = {
    addBusket: product => {
      let bool = false;

      const obj = defaultContext.map(item => {
        if (item.code === product.code) {
          bool = true;
          return {...item, count: ++item.count};
        };

        return item;
      });

      bool ? modifiedContext([...obj]) : modifiedContext([...defaultContext, {...product, count: 1}]) ;
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-actions'>
        <span className="item_price">{constructIntl({method: 'NumberFormat', value: item.price})}</span>
        <button onClick={() => callbacks.addBusket(item)}>Добавить</button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
};

export default React.memo(Item);
