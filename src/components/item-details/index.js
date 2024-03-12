import { memo } from "react"
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css'

const ItemDetails = ({ item, onAdd, locale }) => {

	const cn = bem('ItemDetails');

	return (
		<div className={cn()}>
			<div>{item.description}</div>
			<div>{locale.Country_of_origin}: {item.madeIn && <strong>{item.madeIn.title}</strong>}</div>
			<div>{locale.Category}: {item.category && <strong>{item.category.title}</strong>}</div>
			<div>{locale.Year_of_production}: {item.edition && <strong>{item.edition}</strong>}</div>
			<div className={cn('price')}>{locale.Price}: {item.price && <strong>{numberFormat(item.price)}</strong>}</div>
			<button onClick={() => onAdd(item._id)}>{locale.Add}</button>
		</div>
	)
}

ItemDetails.propTypes = {
	item: PropTypes.object,
	onAdd: PropTypes.function,
	locale: PropTypes.object
};

ItemDetails.defaultProps = {
	onAdd: () => { },
}

export default memo(ItemDetails)