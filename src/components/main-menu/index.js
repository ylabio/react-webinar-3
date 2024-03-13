import React from "react"
import './style.css'
import BasketTool from "../basket-tool"
import Head from "../head"
import { Link } from "react-router-dom"
import {cn as bem} from '@bem-react/classname';
import { useTranslate } from "../../translate";
import Menu from "../menu"
import { url } from "../../url";
const MainMenu=(props)=>{
    const {translate}=useTranslate()
    const cn = bem('Menu');
    return <>
    <Head title={props.title}/>
    <div className={cn()+'-LinkBasket'}>
          <Menu url={props.url}/>
    <BasketTool url={props.url}  amount={props.amount}
                  sum={props.sum} onOpen={props.onOpen}/> 
    </div>
 
    </>
}

export default MainMenu;