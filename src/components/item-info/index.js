import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import { numberFormat } from '../../utils';
import PropTypes from 'prop-types';
import useSelector from '../../store/use-selector';
import { translate } from '../../utils';

function ItemInfo(props) {
  const {
    item = { _id, description, madeIn: { title, code }, category: { title }, edition, price },
    addToBasket = () => {},
  } = props;
  const cn = bem('ItemInfo');
  const callbacks = {
    addToBasket: () => addToBasket(item._id),
  };
  const lang = useSelector(state => state.language.language);
  const translation = translate[lang];

  return (
    <div className={cn()}>
      <div>{item.description}</div>
      <div className={cn('wrapper')}>
        <div className={cn('description')}>
          {translation.madeIn}:
          <b>
            {item.madeIn.title} ({item.madeIn.code})
          </b>
        </div>
        <div className={cn('description')}>
          {translation.category}:<b>{item.category.title}</b>
        </div>
        <div className={cn('description')}>
          {translation.edition}:<b>{item.edition}</b>
        </div>
      </div>
      <div className={cn('price')}>
        {translation.price}: {numberFormat(item.price)} ₽
      </div>
      <Button style="primary" onClick={callbacks.addToBasket} title={translation.buttonAdd} />
    </div>
  );
}
ItemInfo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }),
  addToBasket: PropTypes.func,
};
export default memo(ItemInfo);
