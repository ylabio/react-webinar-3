import React, { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Head from '../../components/head'
import PageLayout from '../../components/page-layout'
import './style.css'
import useSelector from '../../store/use-selector'
import useStore from '../../store/use-store'

function NotFound() {
  const store = useStore();

  const select = useSelector(state => ({
    language: state.language.value,
  }));

  const callbacks = {
    changeLanguage: useCallback(lang => store.actions.language.changeLang(lang), [store])
  }

  return (
    <PageLayout>
      <Head lang={select.language} changeLang={callbacks.changeLanguage}/>
      <h1 className={'NotFound'}>
        {select.language === 'ru' ? (
          <>
            <span>😕</span>
            <br />
            Ничего не найдено
            <p>Увы, такой страницы ещё нет :(</p>
            <Link to={'/'}>Вернуться на главную</Link>
          </>
        ) : (
          <>
            <span>😕</span>
            <br />
            Nothing was found
            <p>Alas, there is no such page yet :(</p>
            <Link to={'/'}>Go back to the main page</Link>
          </>
      )}
      </h1>
    </PageLayout>
  )
}

export default memo(NotFound);