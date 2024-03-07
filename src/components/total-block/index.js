import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { formatPrice } from "../../utils";

function TotalBlock({ totalPrice }) {

    const cn = bem('footer')

    return (
      <div className={cn('bottom')}>
        <span className={cn('total')}>Итого</span>
        <span className={cn('totalPrice')}>{formatPrice(totalPrice)}</span>
      </div>
    );
  }

  export default React.memo(TotalBlock);