import Head from "../head";
import PageLayout from "../page-layout";
import {memo, useMemo,useCallback} from 'react'
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from "../basket-tool";
import { Link } from "react-router-dom";
import {numberFormat,langArr} from "../../utils";
import './style.css'

function ItemLayout({language,setLanguage}) {
    const params = useParams();
    const store = useStore();
    

    const select = useSelector(state => ({
        itemInfo: state.itemInfo.itemInfo,amount: state.basket.amount,
        sum: state.basket.sum
      }));
    
    const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    useMemo(() => {
        store.actions.itemInfo.getInfo(params.id);
    }, [params.id])
    
    // console.log(select.itemInfo)
    
    return (
        <PageLayout>
            <Head title={select.itemInfo.title}>
                <div className='lang__btns'>
                <button onClick={() => setLanguage('ru')}>ru</button>
                <button onClick={() => setLanguage('en')}>eng</button>
                </div>
            </Head>
            <BasketTool language={language} onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} button={<Link to="/" className="Main-page" style={{marginRight:"auto",color:'#0087E9'}}>{langArr.main[language]}</Link>}></BasketTool>
            <div className="Item-info__container">      
                <p className="Item-info-description">{select.itemInfo.description}</p>
                <p className="Item-info-country">{`Страна производитель:`} <span>{`${select.itemInfo.madeIn?.title} (${select.itemInfo.madeIn?.code})`}</span></p>
                <p className="Item-info-category">{`Категория:`} <span>{`${select.itemInfo.category?.title}`}</span></p>
                <p className="Item-info-date">{`Год выпуска:`} <span>{`${select.itemInfo.edition}`}</span></p>
                <p className="Item-info-price">{`Цена:  ${numberFormat(select.itemInfo.price)}₽`}</p>
                <button onClick={() => callbacks.addToBasket(select.itemInfo._id)}>{langArr.add[language]}</button>
            </div>
        </PageLayout>
    );
}

export default memo(ItemLayout);
