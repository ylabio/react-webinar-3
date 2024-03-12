import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import SelectLang from "../select-lang";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function BasketTool({sum, amount, onOpen}) {
  const {main,inCard,openModalCard,empty,pluralForms} = useSelector(state => state.locale.translations.basketTool);
  const lang = useSelector(state => state.locale.lang);

  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      <Link className={cn('home-link')} to= "/">{main}</Link>
      <SelectLang/>
      <span className={cn('label')}>{inCard}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 
            pluralForms,lang
          )} / ${numberFormat(sum)} ₽`
          : `${empty}`
        }
      </span>
      <button onClick={onOpen}>{openModalCard}</button>
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
