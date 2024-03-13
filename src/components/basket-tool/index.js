import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function BasketTool({ lang, sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const language = lang === 'ru' ? ruTranslations : enTranslations;

  const total = useMemo(() => {
    if (amount) {
      const itemWord = plural(amount, {
        one: language["basket.articles"]["one"],
        few: language["basket.articles"]["few"],
        many: language["basket.articles"]["many"],
        other: language["basket.articles"]["other"],
      }, lang);
      return `${amount} ${itemWord} / ${numberFormat(sum)} ₽`;
    } else {
      return language['basket.empty'];
    }
  }, [lang, amount, sum]);

  return (
    <div className={cn()}>
      <span className={cn('label')}>{language["basket.inBasket"]}</span>
      <span className={cn('total')}>
        {total}
      </span>
      <button onClick={onOpen}>{language["basket.open"]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  lang: 'ru'
}

export default memo(BasketTool);
