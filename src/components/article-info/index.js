import { memo, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function ArticleInfo() {

  const cn = bem('ArticleInfo');
  const { id, lang } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.article.fetchArticle(id);
    return () => {
      store.actions.article.clearArticle();
    }
  }, []);

  const select = useSelector(state => ({
    item: state.article?.item,
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

  const onAddToCart = useCallback(() => {
    store.actions.basket.addToBasket(select.item._id);
  }, [store, select]);

  return select.item.title && (
    <>  
      <div className={cn()}>
        <div className={cn('paragraph')}>
          {select.item?.description}
        </div>
        <div className={cn('paragraph')}>
          {getBasketCountryText()}: {<span className={cn('paragraph-bold')}>{`${select.item?.madeIn?.title} (${select.item?.madeIn?.code})`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {getBasketCategoryText()}: {<span className={cn('paragraph-bold')}>{`${select.item?.category?.title}`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {getBasketYearText()}: {<span className={cn('paragraph-bold')}>{`${select.item?.edition}`}</span>}
        </div>
        <div className={cn('paragraph-price')}>
          {`${getItemPriceText()}: ${numberFormat(select?.item?.price)} ₽`}
        </div>
        <button className={cn('buy-button')} onClick={onAddToCart}>{getBasketAddText()}</button>
      </div>
    </>
  );
}

ArticleInfo.propTypes = {
};

ArticleInfo.defaultProps = {
}

export default memo(ArticleInfo);
