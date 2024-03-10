import { memo, useEffect } from "react"
import { useParams } from "react-router";
import { cn as bem } from '@bem-react/classname';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css'
import { numberFormat } from "../../utils";

const ItemPage = () => {

	const cn = bem('ItemPage');

	const { id } = useParams();

	const store = useStore();

	useEffect(() => {
		if (id) {
			store.actions.product.loadItem(id);
		}
	}, [id])

	const {
		_id,
		title,
		description,
		price,
		madeIn,
		category,
		edition,
		locale
	} = useSelector(state => ({
		_id: state.product._id,
		title: state.product.title,
		description: state.product.description,
		price: state.product.price,
		madeIn: state.product.madeIn,
		category: state.product.category,
		edition: state.product.edition,
		locale: state.i18n.locale
	}));

	const onAdd = (_id) => {
		store.actions.basket.addToBasket(_id)
	}

	return (
		<div className={cn()}>
			<div>{description}</div>
			{madeIn && <div>{locale.Country_of_origin}: <strong>{madeIn.title}</strong></div>}
			{category && <div>{locale.Category}: <strong>{category.title}</strong></div>}
			{edition && <div>{locale.Year_of_production}: <strong>{edition}</strong></div>}
			{price && <div className={cn('price')}>{locale.Price}: <strong>{numberFormat(price)}</strong></div>}
			{_id && <button onClick={() => onAdd(_id)}>{locale.Add}</button>}

		</div>
	)
}

export default memo(ItemPage)