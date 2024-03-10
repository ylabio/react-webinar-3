import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import {useLanguage} from '../../localization/language-context'
import texts from '../../localization/texts';
import './style.css';

function BasketTool({sum, amount, onOpen}) {

  const cn = bem('BasketTool');
  const {language} = useLanguage();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/'>{texts[language].main}</Link>
      <span className={cn('label')}>{texts[language].inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: texts[language].productOne,
            few: texts[language].productFew,
            many: texts[language].productMany
          })} / ${numberFormat(sum)} ₽`
          : texts[language].empty
        }
      </span>
      <button onClick={onOpen}>{texts[language].follow}</button>
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
