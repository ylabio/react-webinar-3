import { memo, useCallback } from "react"
import Head from '../../components/head'
import NavMain from '../../components/nav-main'
import NavMenu from '../../components/nav-menu'
import BasketTool from '../../components/basket-tool'
import LanguageToggler from "../../components/language-toggler"
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PropTypes from 'prop-types';


function Header({title}) {

  const store = useStore();

  const {amount, sum, currentPage, currentLanguage} = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.pages.currentPage,
    currentLanguage: state.language.currentLanguage
  }));

  const onOpen = useCallback(() => store.actions.modals.open('basket'), [store]);
  const onToggleLanguage = useCallback(() => store.actions.language.toggleLanguage(), [store])

  return (
    <header className="Header">
      <Head {...{title}}>
        <LanguageToggler {...{currentLanguage, onToggleLanguage}}/>
      </Head>
      <NavMenu>
        <NavMain link={`/${currentPage}`}/>
        <BasketTool {...{onOpen, sum, amount}} />
      </NavMenu>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}

export default memo(Header)