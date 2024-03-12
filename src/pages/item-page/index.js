import { memo, useEffect, useMemo } from "react"
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

	const { product, locale } = useSelector(state => ({
		product: state.product,
		locale: state.i18n.locale
	}));

	const onAdd = (_id) => {
		store.actions.basket.addToBasket(_id)
	}

	return (
		<div className={cn()}>
			<div>{product.description}</div>
			{product.madeIn && <div>{locale.Country_of_origin}: <strong>{product.madeIn.title}</strong></div>}
			{product.category && <div>{locale.Category}: <strong>{product.category.title}</strong></div>}
			{product.edition && <div>{locale.Year_of_production}: <strong>{product.edition}</strong></div>}
			{product.price && <div className={cn('price')}>{locale.Price}: <strong>{numberFormat(product.price)}</strong></div>}
			{product._id && <button onClick={() => onAdd(product._id)}>{locale.Add}</button>}

		</div>
	)
}

export default memo(ItemPage)