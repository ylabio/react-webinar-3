import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function ArticleInfo({item, onAddToCart}) {

  const cn = bem('ArticleInfo');

  const select = useSelector(state => ({
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getBasketAddText = useCallback(() => {
    return select.uiElements.basketAdd[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);
  
  const getBasketCountryText = useCallback(() => {
    return select.uiElements.basketCountry[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getBasketCategoryText = useCallback(() => {
    return select.uiElements.basketCategory[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getBasketYearText = useCallback(() => {
    return select.uiElements.basketYear[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const getItemPriceText = useCallback(() => {
    return select.uiElements.itemPrice[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  return item.title && (
    <>  
      <div className={cn()}>
        <div className={cn('paragraph')}>
          {item?.description}
        </div>
        <div className={cn('paragraph')}>
          {getBasketCountryText()}: {<span className={cn('paragraph-bold')}>{`${item?.madeIn?.title} (${item?.madeIn?.code})`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {getBasketCategoryText()}: {<span className={cn('paragraph-bold')}>{`${item?.category?.title}`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {getBasketYearText()}: {<span className={cn('paragraph-bold')}>{`${item?.edition}`}</span>}
        </div>
        <div className={cn('paragraph-price')}>
          {`${getItemPriceText()}: ${numberFormat(item?.price)} ₽`}
        </div>
        <button className={cn('buy-button')} onClick={onAddToCart}>{getBasketAddText()}</button>
      </div>
    </>
  );
}

ArticleInfo.propTypes = {
  item: PropTypes.object,
  onAddToCart: PropTypes.func,
};

ArticleInfo.defaultProps = {
  onAddToCart: () => {},
}

export default memo(ArticleInfo);
