import React, {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import './style.css';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function ItemDescription(props) {

    const cn = bem('Description');

	const callbacks = {
		onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
	};

	return (
		<div className={cn()}>
			<p className={cn('main')}>{props.item.description}</p>
			<p className={cn('main')}>Страна-производитель:
                <span> {props.item.madeIn?.title} : ({props.item.madeIn?.code})</span>
			</p>
			<p className={cn('main')}> Категория:<span> {props.item.category?.title}</span></p>
			<p className={cn('main')}> Год выпуска:<span> {props.item.edition}</span></p>
			<p className={cn('price')}> <span> Цена: {numberFormat(props.item.price)} ₽</span></p>
			<p className={"Description-button"}><button onClick={callbacks.onAdd}>Добавить</button></p>
		</div>
	)
}

ItemDescription.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		description: PropTypes.string,
		madeIn: PropTypes.shape({
		    title: PropTypes.string,
            code: PropTypes.string
	    }),
		category: PropTypes.shape({
			title: PropTypes.string,
		}),
		edition: PropTypes.number,
		price: PropTypes.number
	}).isRequired,
	onAdd: propTypes.func,
}

ItemDescription.defaultProps = {
	onAdd: () => {}
}

export default memo(ItemDescription);