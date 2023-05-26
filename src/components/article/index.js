import {memo, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import useStore from "../../store/use-store";

function Article(props){

  const store = useStore();
  const cn = bem('Article');


  useEffect(() => {
    store.actions.article.load(id);
  }, [store.state.article.id]);


  // const callbacks = {
  //   onAdd: (e) => props.onAdd(props.item._id)
  // }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Описание товара из множества букв. Описание товара из букв. В АПИ может быть меньше букв. Описание товара из множества букв.
      </div>
      <div className={cn('title')}>
        Страна производитель: <span className={cn('info')}>Россия (RU)</span>
      </div>
      <div className={cn('title')}>
        Категория: <span className={cn('info')}>Электронника123a</span>
      </div>
      <div className={cn('title')}>
        Год выпуска: <span className={cn('info')}>2015</span>
      </div>
      <div className={cn('price')}>
        {/*{numberFormat(props.item.price)} ₽*/}
        Цена: <span className={cn('info')}>12,57 ₽</span>
      </div>

      <div className={cn('actions')}>
        <button
          // onClick={callbacks.onAdd}
        >Добавить</button>

      </div>
    </div>
  );
}

Article.propTypes = {
  // item: PropTypes.shape({
  //   _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   title: PropTypes.string,
  //   price: PropTypes.number
  // }).isRequired,
  // onAdd: PropTypes.func,
};

Article.defaultProps = {
  // onAdd: () => {},
}

export default memo(Article);
