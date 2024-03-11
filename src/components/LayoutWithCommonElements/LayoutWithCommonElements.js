
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { useCallback } from "react";
function LayoutWithCommonElements({ title, children }) {
    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));
    const store = useStore();
    const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

    return (
        <PageLayout>
            <Head title={title} />
            <BasketTool onOpen={openModalBasket} amount={select.amount} sum={select.sum} />
            {children}
        </PageLayout>
    );
}
export default LayoutWithCommonElements
