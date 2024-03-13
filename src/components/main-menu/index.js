import React from "react"
import './style.css'
import BasketTool from "../basket-tool"
import Head from "../head"
import { Link } from "react-router-dom"
import {cn as bem} from '@bem-react/classname';
import { useTranslate } from "../../translate";
import { url } from "../../url";
const Menu=(props)=>{
    const {translate}=useTranslate()
    const cn = bem('Menu');
    return <>
    <Head title={props.title}/>
    <div className={cn()+'-LinkBasket'}>
          <Link className={cn()+'-Link'} to={url.main}>{translate('home')}</Link>
    <BasketTool url={props.url}  amount={props.amount}
                  sum={props.sum}/> 
    </div>
 
    </>
}

export default Menu;