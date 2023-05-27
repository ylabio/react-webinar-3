import React, {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import './style.css';
import PropTypes from "prop-types";

function ProductInfo(props) {
	
	const cn = bem('ProductInfo');
	
	const callbacks = {
		onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
	};
	
	return (
		<div className={cn()}>
			<div className={cn('text')}>
				{props.item.description}
			</div>
			<div className={cn('text')}>
				{props.lang.info.country}: <b>{props.item.madeIn?.title}</b>
			</div>
			<div className={cn('text')}>
				{props.lang.info.category}: <b>{props.item.category?.title}</b>
			</div>
			<div className={cn('text')}>
				{props.lang.info.year}: <b>{props.item.edition}</b>
			</div>
			<div className={cn('price')}>
				<b>{props.lang.info.price}: {numberFormat(props.item.price)} ₽</b>
			</div>
			<div className={cn('button')}>
				<button onClick={callbacks.onAdd}>{props.lang.button.add}</button>
			</div>
		</div>
	)
}

ProductInfo.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		description: PropTypes.string,
		madeIn: PropTypes.shape({
			title: PropTypes.string,
		}),
		category: PropTypes.shape({
			title: PropTypes.string,
		}),
		edition: PropTypes.number,
		price: PropTypes.number
	}).isRequired,
	lang: propTypes.object.isRequired,
	onAdd: propTypes.func,
}

ProductInfo.defaultProps = {
	onAdd: () => {
	},
}

export default memo(ProductInfo);