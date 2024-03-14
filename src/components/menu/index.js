import { memo } from "react";
import React  from 'react';
import Head from "../head";
import BasketTool from "../basket-tool";
import { langArr } from "../../utils";
import { Link } from "react-router-dom";

const Menu = ({setLanguage,language,openModalBasket,amount,sum,title}) => {
    return (
        <div className="menu">
            <Head title={title}>
            <div className='lang__btns'>
                <button onClick={() => setLanguage('ru')}>ru</button>
                <button onClick={() => setLanguage('en')}>eng</button>
            </div>
            </Head>
            <BasketTool language={language} onOpen={openModalBasket} amount={amount}
                    sum={sum}/>
        </div>
    );
};

export default memo(Menu);