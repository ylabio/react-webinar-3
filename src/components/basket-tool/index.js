import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function BasketTool({sum, amount, onOpen, link, text, empty, word, textButton}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div>
        <Link to="/" className={cn('link')}>{link}</Link>
      </div>
      <div>
        <span className={cn('label')}>{text}</span>
        <span className={cn('total')}>
          {amount
            ? `${word(amount)} / ${numberFormat(sum)} ₽`
            : empty
          }
        </span>
        <button onClick={onOpen}>{textButton}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  link: PropTypes.string,
  text: PropTypes.string,
  empty: PropTypes.string,
  word: PropTypes.func,
  textButton: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
