import { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ language, sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const total = useMemo(() => {
    return language === 'ru'
      ? amount
        ? `${amount} ${plural(amount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })} / ${numberFormat(sum)} ₽`
        : 'пусто'
      : amount
        ? `${amount} ${plural(amount, {
          one: 'article',
          few: 'articles',
          many: 'articles',
        })} / ${numberFormat(sum)} ₽`
        : 'empty';
  }, [language, amount, sum]);

  const inCart = useMemo(() => {
    return language === 'ru'
      ? 'В корзине:'
      : 'In cart:'
  }, [language]);

  const open = useMemo(() => {
    return language === 'ru'
      ? 'Перейти:'
      : 'Open'
  }, [language]);


  return (
    <div className={cn()}>
      <span className={cn('label')}>{inCart}</span>
      <span className={cn('total')}>
        {total}
      </span>
      <button onClick={onOpen}>{open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  language: 'ru'
}

export default memo(BasketTool);
