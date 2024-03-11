import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {lang as langData} from '../../lang/data'

function BasketTool({sum, amount, onOpen, lang}) {

  const lng = lang === 'ru' ? {
    title: langData.basketTool.title.ru,
    items: langData.basketTool.items.ru,
    locale: 'ru-RU',
    empty: langData.basketTool.empty.ru,
    btn: langData.basketTool.button.ru
  } : {
    title: langData.basketTool.title.en,
    items: langData.basketTool.items.en,
    locale: 'en-US',
    empty: langData.basketTool.empty.en,
    btn: langData.basketTool.button.en
  }

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{lng.title}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, lng.items, lng.locale)} / ${numberFormat(sum)} ₽`
          : `${lng.empty}`
        }
      </span>
      <button onClick={onOpen}>{lng.btn}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
