import {cn as bem} from "@bem-react/classname";
import './style.css';
import { memo } from "react";
import { numberFormat } from '../../utils';
import PropTypes from "prop-types";
import { useLanguage } from "../../store/language-context";

const ItemDetail = (props) => {
  
  const cn = bem('ItemCard');

  const {Language, translations} = useLanguage();

  const callbacks = {
    onAddBasket: (e) => props.onAddBasket(props.card._id)
  }


  return (
    <div className={ cn() }>
      <p className={ cn( 'text' ) }>{ props.card.description }</p>
      <p className={ cn( 'text' ) }> Страна производитель: <span>{ props.card.madeIn?.title }  ({props.card.madeIn?.code})</span></p>
      <p className={ cn( 'text' ) }> Категория: <span>{ props.card.category?.title }</span></p>
      <p className={ cn( 'text' ) }> Год выпуска: <span>{ props.card.edition }</span></p>
      <p className={ cn( 'text' ) }><span>Цена: { numberFormat(props.card.price)} ₽</span></p>
      <button className={ cn( 'button' ) } onClick={callbacks.onAddBasket}>{translations['buttonAdd']}</button>
    </div>
  );
};

ItemDetail.propTypes = {
  card: PropTypes.shape( {
    _id: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number
  }).isRequired,
  onAddBasket: PropTypes.func
};

ItemDetail.defaultProps = {
  onAddBasket: () => {}
}

export default memo(ItemDetail);
