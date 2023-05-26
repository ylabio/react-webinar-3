import {memo} from "react";
import PropTypes from "prop-types";
import useTranslate from '../../hooks/use-translation';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function DetailCard({detail, onAdd}){
  const { t } = useTranslate();
  const cn = bem('DetailCard');
  
  const callbacks = {
    onAdd: (e) => onAdd(detail._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}><span>{detail.description}</span></p>
      <p className={cn('text')}>{t('Страна производитель')}: <b>{detail.madeIn?.title}</b></p>
      <p className={cn('text')}>{t('Категория')}: <b> {detail.category?.title}</b></p>
      <p className={cn('text')}>{t('Год выпуска')}: <b>{detail.edition}</b></p>
      <p className={cn('price')}>{t('Цена')} {detail.price}</p>
      <button onClick={callbacks.onAdd}>{t('Добавить')}</button>
    </div>
  )
}

DetailCard.propTypes = {
  detail: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    edition: PropTypes.number,
    madeIn: PropTypes.object,
    category: PropTypes.object,
  }).isRequired,
  onAdd: PropTypes.func,
}

DetailCard.defaultProps = {
  onAdd: () => {},
}

export default memo(DetailCard);
