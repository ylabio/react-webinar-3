import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const navigate = useNavigate();

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
    page: state.catalog.page,
  }));

  const getReturnText = useCallback(() => {
    return select.uiElements.returnText[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getInCartText = useCallback(() => {
    return select.uiElements.basketInCart[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getBasketEmptyText = useCallback(() => {
    return select.uiElements.basketEmpty[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getBasketCountables = useCallback(() => {
    return select.uiElements.basketCountables[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getBasketOpenText = useCallback(() => {
    return select.uiElements.basketOpen[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);
  
  return (
    <div className={cn()}>
      <Link to={`/pages/${select.page}`} className={cn('return')}>
        {getReturnText()}
      </Link>
      <span className={cn('cartInfo')}>
        <span className={cn('label')}>{`${getInCartText()}:`}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(
                amount, 
                getBasketCountables()
              )} / ${numberFormat(sum)} ₽`
            : getBasketEmptyText()
          }
        </span>      
        <button className={cn('open-button')} onClick={onOpen}>{getBasketOpenText()}</button>
      </span>
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
