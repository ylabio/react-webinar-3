import {memo} from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import {cn as bem} from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  
  const language = useSelector(state => state.language);

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">{language.main}</Link>
      <span className={cn('label')}>{language.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: `${language.product}`,
            few: `${language.pluralProduct}`,
            many: `${language.pluralProducts}`,
          })} / ${numberFormat(sum)} ₽`
          : `${language.empty}`
        }
      </span>
      <button onClick={onOpen}>{language.move}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
