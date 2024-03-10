import { memo, useEffect } from "react"
import { useParams } from "react-router";
import { cn as bem } from '@bem-react/classname';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css'

const ItemPage = () => {

	const cn = bem('ItemPage');

	const { id } = useParams();

	const store = useStore();

	useEffect(() => {
		if (id) {
			store.actions.product.loadItem(id);
		}
	}, [id])

	const select = useSelector(state => ({
		_id: state.product._id,
		title: state.product.title,
		description: state.product.description,
		price: state.product.price,
		madeIn: state.product.madeIn,
		category: state.product.category,
		edition: state.product.edition,
	}));

	const onAdd = (_id) => {
		store.actions.basket.addToBasket(_id)
	}

	return (
		<div className={cn()}>
			<div>{select.description}</div>
			{select.madeIn && <div>Страна производитель: <strong>{select.madeIn.title}</strong></div>}
			{select.category && <div>Категория: <strong>{select.category.title}</strong></div>}
			{select.edition && <div>Год выпуска: <strong>{select.edition}</strong></div>}
			{select.price && <div className={cn('price')}>Цена: <strong>{select.price}</strong></div>}
			{select._id && <button onClick={() => onAdd(select._id)}>Добавить</button>}

		</div>
	)
}

export default memo(ItemPage)