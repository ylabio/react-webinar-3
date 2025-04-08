import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function ItemInfo(props) {
  const { data } = props;
  const cn = bem('ItemInfo');

  const callbacks = {
    addToBasket: e => props.onAdd(data?.result?._id),
  };

  return (
    <div className={cn()}>
      <p>{data?.result?.description}</p>
      <div>
        <table>
          <tbody>
              <tr>
                <td><div>{props.countryText}</div></td>
                <td className={cn('span')}><div>{data?.result?.madeIn._type}</div></td>
              </tr>
              <tr>
                <td><div>{props.categoryText}</div></td>
                <td className={cn('span')}><div>{data?.result?.category._type}</div></td>
              </tr>
              <tr>
                <td><div>{props.editionText}</div></td>
                <td className={cn('span')}><div>{data?.result?.edition}</div></td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{props.priceText}{numberFormat(data?.result?.price)} ₽</div>
        <Button style="primary" onClick={callbacks.addToBasket} title={props.addToBasketText} />
      </div>
    </div>
  );
}

ItemInfo.propTypes = {
  data: PropTypes.shape({
    result: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      madeIn: PropTypes.shape({
        _type: PropTypes.string
      }),
      category: PropTypes.shape({
        _type: PropTypes.string
      }),
      edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.number
    })
  }),
  onAdd: PropTypes.func.isRequired,
  countryText: PropTypes.string.isRequired,
  categoryText: PropTypes.string.isRequired,
  editionText: PropTypes.string.isRequired,
  priceText: PropTypes.string.isRequired,
  addToBasketText: PropTypes.string.isRequired
};

export default memo(ItemInfo);