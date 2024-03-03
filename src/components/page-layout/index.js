import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const PageLayout = ({ children }) => {
	console.log('PageLayout');

	const cn = bem('PageLayout');

	return (
		<div className={cn()}>
			<div className={cn('center')}>{children}</div>
		</div>
	);
};

PageLayout.propTypes = {
	children: PropTypes.node,
};

export default React.memo(PageLayout);
