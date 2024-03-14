import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function ArticleInfo({item, onAddToCart, uiElements}) {

  const cn = bem('ArticleInfo');

  return item.title && (
    <>  
      <div className={cn()}>
        <div className={cn('paragraph')}>
          {item?.description}
        </div>
        <div className={cn('paragraph')}>
          {uiElements.country}: {<span className={cn('paragraph-bold')}>{`${item?.madeIn?.title} (${item?.madeIn?.code})`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {uiElements.category}: {<span className={cn('paragraph-bold')}>{`${item?.category?.title}`}</span>}
        </div>
        <div className={cn('paragraph')}>
          {uiElements.year}: {<span className={cn('paragraph-bold')}>{`${item?.edition}`}</span>}
        </div>
        <div className={cn('paragraph-price')}>
          {`${uiElements.price}: ${numberFormat(item?.price)} ₽`}
        </div>
        <button className={cn('buy-button')} onClick={onAddToCart}>{uiElements.addButton}</button>
      </div>
    </>
  );
}

ArticleInfo.propTypes = {
  item: PropTypes.object,
  onAddToCart: PropTypes.func,
  uiElements: PropTypes.shape({
    addButton: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.string,
    price: PropTypes.string,
  }),  
};

ArticleInfo.defaultProps = {
  onAddToCart: () => {},
}

export default memo(ArticleInfo);
