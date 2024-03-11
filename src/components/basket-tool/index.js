import {memo} from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, translation}) {

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
			<Link to={'/'} className={cn('link')}>{translation.main}</Link>
      <div className={cn('group')}>
				<span className={cn('label')}>{`${translation.basketTool.inCart}:`}</span>
				<span className={cn('total')}>
					{amount
						? `${amount} ${plural(amount, {
							one: translation.basketTool.one,
							few: translation.basketTool.few,
							many: translation.basketTool.many
						})} / ${numberFormat(sum)} ₽`
						: `${translation.basketTool.empty}`
					}
				</span>
				<button className={cn('button')} onClick={onOpen}>{translation.actions.open}</button>
			</div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
	translation: PropTypes.object
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
