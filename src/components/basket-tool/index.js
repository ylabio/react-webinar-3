import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import {Link} from 'react-router-dom';
import './style.css';

function BasketTool({sum, amount, onOpen, link}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('links')}>
        {link && <Link to={link.url} className={cn('link')}>{link.title}</Link>}
      </div>
      <div className={cn('tools')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${numberFormat(sum)} ₽`
            : `пусто`
          }
        </span>
        <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  link: null
}

export default memo(BasketTool);
