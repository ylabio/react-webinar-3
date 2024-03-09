
import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import { useParams } from 'react-router'

function Product() {
    const {id} = useParams()
    const [{title,description,price},changeProduct] = useState({})
    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`http://example.front.ylab.io/api/v1/articles/${id}`);
            const json = await response.json();
            changeProduct(json.result)
        }

        getProduct()
    },[id])

    return (
        <PageLayout>
        <Head title={title}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
        <p>{description}</p>
        </PageLayout>
    )
}

export default Product