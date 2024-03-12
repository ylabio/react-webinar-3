import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function DescriptionBasketTool({ sum, amount, onOpen, texts, locale }) {
  const cn = bem('DescriptionBasketTool');
  console.log(texts);
  return (
    <div className={cn()}>
      <div className={cn('link-container')}>
        <Link className={cn('link')} to="/">{texts?.main}</Link>
      </div>

      <div className={cn('main')}>
        <span className={cn('label')}>{texts?.inCart}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, texts?.article, locale)} / ${numberFormat(sum)} ₽`
            : texts?.empty
          }
        </span>
        <button onClick={onOpen}>{texts?.openCart}</button>
      </div>
    </div>
  );
}

DescriptionBasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

DescriptionBasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(DescriptionBasketTool);