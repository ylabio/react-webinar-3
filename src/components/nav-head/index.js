import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import NavBar from '../nav-bar';
import BasketTool from '../basket-tool';
import LanguageControl from '../language-control';

function NavHead({ onOpen = () => {}, sum = 0, amount = 0 }) {
  return (
    <div className={'NavHead'}>
      <NavBar />
      <LanguageControl />
      <BasketTool onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
}

NavHead.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(NavHead);
