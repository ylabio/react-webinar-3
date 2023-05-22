import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Footer(props) {
	const cn = bem('Footer');

	return (
		<div className={cn()}>
			<p className={cn('summery')}>
				<b className={cn('text')}>Итого&nbsp;&nbsp;&nbsp;<span className={cn('digital')}>{props.summary}</span>&nbsp;&#8381;</b>
			</p>
		</div>
	)
}

export default React.memo(Footer);
