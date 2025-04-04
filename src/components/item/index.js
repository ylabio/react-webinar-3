import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import {useNavigate} from "react-router-dom";
import useSelector from "../../store/use-selector";

function Item(props) {
  const lang = useSelector(state => state.language.language);
  const translations = {
    ru: {
      add: 'Добавить',
    },
    en: {
      add: 'Add',
    },
  }
  const cn = bem('Item');
  const navigate = useNavigate();

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
    onOpen: e => navigate('/' + props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <h4 onClick={callbacks.onOpen} className={cn('title')}>{props.item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={translations[lang].add} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
