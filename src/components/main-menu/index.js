import React from "react"
import BasketTool from "../basket-tool"
import Head from "../head"

const Menu=(props)=>{
    return <>
    <Head title={props.title}/>
    <BasketTool url={props.url}  amount={props.amount}
                  sum={props.sum}/>
    </>
}

export default Menu;