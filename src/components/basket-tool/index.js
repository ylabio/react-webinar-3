import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural, pluralEn } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool(props) {
  const {
    onOpen = () => {},
    sum = 0,
    amount = 0,
    onMain = () => {},
    langContent = { lang: 'ru' },
  } = props;
  const cn = bem('BasketTool');
  const langPluralFnc = langContent.lang === 'ru' ? plural : pluralEn;

  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={() => onMain()}>
        {langContent.baskeNav}
      </div>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${langPluralFnc(amount, langContent.basketPlural)} / ${numberFormat(sum)} ₽`
            : langContent.basketButton}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onMain: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  langContent: PropTypes.shape({
    lang: PropTypes.string,
    basketPlural: PropTypes.shape({
      one: PropTypes.string,
      many: PropTypes.string,
    }),
    basketButton: PropTypes.string,
    baskeNav: PropTypes.string,
  }),
};

export default memo(BasketTool);
