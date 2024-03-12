import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";

function MainMenu({ title }) {

	const store = useStore();

	const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
		lang: state.i18n.lang,
		languageNames: state.i18n.languageNames,
		locale: state.i18n.locale
	}));

	const callbacks = {
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		// Переключение языка
		changeLang: useCallback((e) => store.actions.i18n.changeLocale(e.target.value), [store])
	}

	return (
		<>
			<Head
				title={title}
				lang={select.lang}
				languageNames={select.languageNames}
				changeLang={callbacks.changeLang}
			/>
			<BasketTool
				onOpen={callbacks.openModalBasket}
				amount={select.amount}
				sum={select.sum}
				locale={select.locale}
			/>
		</>
	)
}

Head.propTypes = {
	title: PropTypes.node,
};

export default memo(MainMenu);
