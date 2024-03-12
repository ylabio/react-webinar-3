import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import { UI_TEXTS } from '../../consts/content';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    language: state.language.currentLanguage
  }))

  const uiText = {
    homeBtn: UI_TEXTS[select.language].main.basketTool.homeBtn,
    inCart: UI_TEXTS[select.language].main.basketTool.inCart,
    empty: UI_TEXTS[select.language].main.basketTool.empty,
    toCartBtn: UI_TEXTS[select.language].main.basketTool.toCartBtn,
    goods: UI_TEXTS[select.language].main.basketTool.goods,
  }


  return (
    <div className={cn()}>
      <div>
        <Link className={cn('home-btn')} to='/'>{uiText.homeBtn}</Link>
      </div>

      <div className={cn('info')}>
        <span className={cn('label')}>{uiText.inCart}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, uiText.goods)} / ${numberFormat(sum)} ₽`
          : `${uiText.empty}`
        }
      </span>
        <button onClick={onOpen}>{uiText.toCartBtn}</button>
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
