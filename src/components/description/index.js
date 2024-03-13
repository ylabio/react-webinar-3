import React from "react";
import './style.css'
import { useTranslate } from "../../translate";
const Description=({props})=>{
   const {translate}=useTranslate()
    return < div className="Description">
    <div> {props?.description}</div>
    <div>{translate('country')}:<b>{props?.madeIn._type}</b></div>
    <div>{translate('category')}:<b>{props?.category._type}</b></div>
    <div>{translate('year')}:<b>{props?.edition}</b></div>
    <div className="Description-Price">{translate('price')}: <b>{props?.price}</b></div>
    </div>
}

export default Description;