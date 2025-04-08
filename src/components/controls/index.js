import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router';
import { Paths } from '../../routes/paths';
import BasketTool from '../basket-tool';

function Controls(props) {
  const { onClick = () => {}, openModalBasket = () => {}, amount, sum, t = text => {} } = props;

  return (
    <div className={'Controls'}>
      <Link onClick={onClick} className={'Controls-link'} to={Paths.MAIN}>
        {t('Main')}
      </Link>
      <BasketTool onOpen={openModalBasket} amount={amount} sum={sum} t={t} />
    </div>
  );
}

Controls.propTypes = {
  openModalBasket: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  onClick: PropTypes.func,
  t: PropTypes.func,
};

export default memo(Controls);
