import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ProductCard(props) {

  const cn = bem('ProductCard');


  return (
    <div className={cn()}>

      <div className={cn('card')}>
        <div>{props.product?.description}</div>
        <div>{props.manufacturerCountryTitle}: <span
          className={cn('bold')}>{props.product?.madeIn?.title}&nbsp;({props.product?.madeIn?.code})</span>
        </div>
        <div>{props.categoryTitle}:&nbsp;
          <span className={cn('bold')}>{props.product?.category?.title}</span>
        </div>
        <div>{props.yearOfIssueTitle}:&nbsp;
          <span className={cn('bold')}>{props.product?.edition}</span>
        </div>
        <div className={cn('price')}>{props.priceTitle}:&nbsp;{numberFormat(props.product?.price)} ₽</div>
        <div>
          <button onClick={props.addToBasket}>{props.addButtonTitle}</button>
        </div>
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  addToBasket: PropTypes.func.isRequired,
  manufacturerCountryTitle: PropTypes.string.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  yearOfIssueTitle: PropTypes.string.isRequired,
  priceTitle: PropTypes.string.isRequired,
  addButtonTitle: PropTypes.string.isRequired
};


export default memo(ProductCard);
