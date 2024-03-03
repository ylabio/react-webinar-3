import React from "react";
import PropTypes from 'prop-types';

function Button({ title, callback }) {

	const handleClick = (e) => {
		e.stopPropagation();
		callback()
	}

	return (
		<button onClick={handleClick}>{title}</button>
	)
}

Button.propTypes = {
	title: PropTypes.string,
	onAdd: PropTypes.func
};

Button.defaultProps = {
	callback: () => {
	}
}

export default React.memo(Button);
