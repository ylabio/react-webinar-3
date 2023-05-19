import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';

import './style.css';

function ModalFooter({ sum }) {
  return <div className="Footer">Итого {sum}</div>;
}

ModalLayout.propTypes = {
  sum: PropTypes.number,
};

export default React.memo(ModalFooter);
