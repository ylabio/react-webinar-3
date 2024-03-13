import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import './style.css';


function BasketTool({sum, amount, onOpen, multilingualText, language}) {

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
        <span className={cn('label')}>{multilingualText.cart[language]}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: [multilingualText.product[language]],
              few: [multilingualText.productTwo[language]],
              many: [multilingualText.products[language]]
            })} / ${numberFormat(sum)} ₽`
            : `${multilingualText.empty[language]}`
          }
        </span>
        <button onClick={onOpen}>{multilingualText.buttonGo[language]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.node,
  multilingualText: PropTypes.object
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
