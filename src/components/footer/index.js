import React, { useContext } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Context } from './../../context';

function Footer() {
	const cn = bem('Footer');

	const { summary } = useContext(Context);
	return (
		<div className={cn()}>
			<p className={cn('summery')}>
				<b className={cn('text')}>Итого&nbsp;&nbsp;&nbsp;<span className={cn('digital')}>{summary}</span>&nbsp;&#8381;</b>
			</p>
		</div>
	)
}

export default React.memo(Footer);
