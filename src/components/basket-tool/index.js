import {memo, useContext} from "react";
import {LanguagesContext} from "../../lang/context";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const {data} = useContext(LanguagesContext);

  return (
    <div className={cn()}>
      <Link to="/" className={cn('link')}>{data.main.page}</Link>
      <div>
        <span className={cn('label')}>{data.basket.inCart}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, data.basket.variants)} / ${numberFormat(sum)} ₽`
            : `${data.basket.tools}`
          }
        </span>
        <button onClick={onOpen}>{data.buttons.onOpenTxt}</button>
      </div>
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
