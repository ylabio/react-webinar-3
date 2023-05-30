import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { translate } from '../../utils';
import useLang from '../../store/use-lang';

function Controls(props) {
  const {lang}= useLang();
  return (
    <div className='Controls'>
      <div>
      {translate("main.inBasket",lang)}:{' '}
        <strong>
          {props.totalCount ? (
            <>
              {formatText(
                props.totalCount,
                plural(props.totalCount, translate("productsPlural",lang))
              )}{' '}
              / {formatText(props.totalPrice, '₽')}
            </>
          ) : (
            translate("main.empty",lang)        
          )}
        </strong>
      </div>
      <button onClick={props.onCartOpen}><Translate path="links.open"/></button>
    </div>
  );
}

Controls.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onCartOpen: PropTypes.func,
};

Controls.defaultProps = {
  onCartOpen: () => {},
};

export default memo(Controls);
