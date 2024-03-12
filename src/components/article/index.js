import {memo} from "react";
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Article({articleId, item, onAdd}) {
  
  const cn = bem('Article');

  const language = useSelector(state => ({
    language: state.language.language,
    articleTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    articleTextEn: {...state.language.en.itemPage, ...state.language.en.values},
  }));

  const text = language.language === "ru" ? language.articleTextRu : language.articleTextEn;

  const callbacks = {
    onAdd: (e) => onAdd(articleId)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('made')}>{text.madeIn}: <b>{item.madeIn}</b></div>
      <div className={cn('category')}>{text.category}: <b>{item.category}</b></div>
      <div className={cn('edition')}>{text.edition}: <b>{item.edition}</b></div>
      <div className={cn('price')}>{text.price}: {item.price} {text.currency}</div>
      <button onClick={callbacks.onAdd}>{text.itemAddButtonText}</button>
    </div>
  );
}

Article.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Article.defaultProps = {
  onAdd: () => {}
}

export default memo(Article);
