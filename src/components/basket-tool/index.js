import {memo, useContext} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../language-provider';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const { t } = useContext(LanguageContext); 
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link')}>{t('mainPage')}</Link>
      <div className={cn('wrapper')}>
        <span className={cn('label')}>{t('inBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: t('oneProduct'),
              few: t('twoProducts'),
              many: t('aLotOfProducts')
            })} / ${numberFormat(sum)} ₽`
            : `${t('empty')}`
          }
        </span>
        <button onClick={onOpen}>{t('proceed')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
