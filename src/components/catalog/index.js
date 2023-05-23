import React, {useCallback } from 'react';
import PropTypes from 'prop-types'
import Controls from '../controls';
import Head from '../head';
import Item from '../item';
import List from '../list';
import PageLayout from '../layouts/pageLayout';

function Catalog({list, addBasket, basketShow, info}) {
    const itemCatalog = useCallback( item => <Item item={item} clickButton={addBasket} clickName={'Добавить'} />, []);

    return (
        <PageLayout>
            <Head title='Магазин' />
            <Controls basketClick={basketShow} infoBasket={info} />
            <List list={list} render={itemCatalog} />
        </PageLayout>
    );
}
Catalog.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number
    })).isRequired,
    addBasket: PropTypes.func.isRequired,
    basketShow: PropTypes.func.isRequired,
    info: PropTypes.object
  }
  
  Catalog.defaultProps = {
    list: [],
    addBasket: () => { },
    basketShow: () => { },
    info: { goods: 0, price: 0 }
  }
export default Catalog;