import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketTool from '../basket-tool';
import useStore from '../../store/use-store';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/translation-hook';

function Controls() {
  const store = useStore();
  const translate = useTranslation();

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <div className="Controls">
      <Link to="/" className="Controls-title">
        {translate('title.controlsTitle')}
      </Link>
      <BasketTool onOpen={callbacks.openModalBasket} />
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
