import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural,langArr} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen,children,button,language}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      {button}
      <span className={cn('label')}>{langArr.BasketTools[language]}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: langArr.goodsOne[language],
            few: langArr.goodsFew[language],
            many: langArr.goodsMany[language]
          })} / ${numberFormat(sum)} ₽`
          : langArr.empty[language]
        }
      </span>
      <button onClick={onOpen}>{langArr.go[language]}</button>
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
