import React, {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {useLanguage} from "../../LanguageContext";
import PropTypes from "prop-types";

function BasketTool({amount, sum, openModal}) {
  const cn = bem('BasketTool');

  const {tr} = useLanguage()


  return (
    <div className={cn()}>
      <span className={cn('label')}>{tr('inTheBasket')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: tr('oneProduct'),
            few: tr('fewProduct'),
            many: tr('manyProduct')
          })} / ${numberFormat(sum)} ₽`
          : tr('empty')
        }
      </span>
      <button onClick={openModal}>{tr('goBtn')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  amount: PropTypes.number,
  sum: PropTypes.number,
  openModal: PropTypes.func
}

export default memo(BasketTool);
