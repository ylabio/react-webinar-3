import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, language, dataLanguage}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{ `${ language.basket }:` }</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, language.plural, dataLanguage)} / ${numberFormat(sum)} ₽`
          : `${ language.empty }`
        }
      </span>
      <button className={cn('button')} onClick={onOpen}>{language.open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.object,
  dataLanguage: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
