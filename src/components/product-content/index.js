import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { UI_TEXTS } from '../../consts/content';
import './style.css'

const ProductContent = ({content, onAdd}) => {
  const callbacks = {
    onAdd: () => onAdd()
  }

  const currentLanguage = document.documentElement.lang;
  const uiText = {
    madeIn: UI_TEXTS[currentLanguage].product.mainContent.madeIn,
    category: UI_TEXTS[currentLanguage].product.mainContent.category,
    edition: UI_TEXTS[currentLanguage].product.mainContent.edition,
    price: UI_TEXTS[currentLanguage].product.mainContent.price,
    addItemBtn: UI_TEXTS[currentLanguage].product.mainContent.addItemBtn,
  }

  return (
    <article>
      <p>{content.description}</p>
      <p>{uiText.madeIn}: <span>{content.madeIn && `${content.madeIn.title} (${content.madeIn.code})`}</span>
      </p>
      <p>{uiText.category}: <span>{content.category && content.category.title}</span></p>
      <p>{uiText.edition}: <span>{content.edition}</span></p>
      <p className="Product-price">{uiText.price}: {numberFormat(content.price, 'ru-RU', {
        style: 'currency',
        currency: 'RUB',
      })}</p>
      <button onClick={callbacks.onAdd}>{uiText.addItemBtn}</button>
    </article>
  );
};

ProductContent.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string.isRequired,
    madeIn: PropTypes.shape({
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }),
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    edition: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAdd: PropTypes.func,
}

export default ProductContent;