import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

const Controls = ({ onAdd }) => {
	console.log('Controls');

	return (
		<div className="Controls">
			<button onClick={() => onAdd()}>Добавить</button>
		</div>
	);
};

Controls.propTypes = {
	onAdd: PropTypes.func.isRequired,
};

Controls.defaultProps = {
	onAdd: () => {},
};

export default React.memo(Controls);
