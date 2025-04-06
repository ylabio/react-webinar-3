import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural, pluralEn } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import useTranslation from '../../store/lang/use-translat';
import { useLang } from '../../store/lang/language-context';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0, main = 'Заголовок', onMain = () => {} } = props;

  const cn = bem('BasketTool');
  const { lang } = useLang();
  const { t } = useTranslation();
  const langContent = {
    langButton: t('button').basket,
    langPlural: t('plural'),
    langPluralFnc: lang === 'ru' ? plural : pluralEn,
  };

  return (
    <div className={cn()}>
      <div className={cn('link')} onClick={() => onMain()}>
        {main}
      </div>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${langContent.langPluralFnc(amount, langContent.langPlural)} / ${numberFormat(sum)} ₽`
            : langContent.langButton}
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
  main: PropTypes.string,
};

export default memo(BasketTool);
