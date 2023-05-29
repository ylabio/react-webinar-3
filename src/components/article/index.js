import {memo, useContext} from 'react';
import "./style.css"
import {cn as bem} from "@bem-react/classname";
import { LanguageContext } from "../../store/language";
import translations from '../../store/language/translations.json'
import { replaceDots } from '../../utils';

function Article({card, addToBasket}) {

    const cn = bem('Article');
    const ln = useContext(LanguageContext).ln

    const callbacks = {
		onAdd: (e) => addToBasket(card._id)
	}

    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <p>{card.description}</p>
                <p className={cn('info-country')}>
                    Страна производитель: <span>{card.madeIn}</span>
                </p>
                <p className={cn('info-category')}>
                    Категория: <span>{card.category}</span>
                </p>
                <p className={cn('info-year')}>
                    Год выпуска: <span>{card.edition}</span>
                </p>
                <p className={cn('info-price')}>
                    Цена: {replaceDots(card.price)} ₽
                </p>
            </div>
            <button className={cn('btn')} onClick={callbacks.onAdd}>{translations[ln].addBtn}</button>
        </div>
    );
}

export default memo(Article);