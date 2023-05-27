import React, {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {NavLink} from "react-router-dom";

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <NavLink to={'/'} className={cn('nav')}>
          {lang.link}
        </NavLink>
      </div>
     <div>
       <span className={cn('label')}>{lang.label}:</span>
       <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:lang.product.item,
            few:lang.product.goods, many:lang.product.several_goods})} / ${numberFormat(sum)} ₽`
          : `${lang.total}`
        }
      </span>
       <button onClick={onOpen}>{lang.button.move}</button>
     </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.object.isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default memo(BasketTool);
