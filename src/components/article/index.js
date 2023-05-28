import {memo, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Article(props){

  const store = useStore();
  const cn = bem('Article');


  useEffect(() => {
    store.actions.articles.load(store.state.articles._id);

  }, [store.state.articles._id]);


  const select = useSelector(state => ({
    id: state.articles._id,
    description: state.articles.description,
    madeIn: state.articles.madeIn.title,
    codeCountry: state.articles.madeIn.code,
    category: state.articles.category.title,
    edition: state.articles.edition,
    price: state.articles.price,
  }));

  const callbacks = {
    onAdd: (e) => props.onAdd(select.id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {select.description}
      </div>
      <div className={cn('title')}>
        Страна производитель: <span className={cn('info')}>{select.madeIn} ({select.codeCountry})</span>
      </div>
      <div className={cn('title')}>
        Категория: <span className={cn('info')}>{select.category}</span>
      </div>
      <div className={cn('title')}>
        Год выпуска: <span className={cn('info')}>{select.edition}</span>
      </div>
      <div className={cn('price')}>
        Цена: <span className={cn('info')}>{numberFormat(select.price)} ₽</span>
      </div>

      <div className={cn('actions')}>
        <button
          onClick={callbacks.onAdd}
        >Добавить</button>

      </div>
    </div>
  );
}

Article.propTypes = {
  // item: PropTypes.shape({
  //   _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // }).isRequired,
  // onAdd: PropTypes.func,
};

Article.defaultProps = {
  // onAdd: () => {},
}

export default memo(Article);
