import React, { memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'
import { useArticle } from '../../hooks/use-article'
import { useComments } from '../../hooks/use-comments'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import Spinner from '../../components/spinner'
import ArticleCard from '../../components/article-card'
import LocaleSelect from '../../containers/locale-select'
import TopHead from '../../containers/top-head'
import Navigation from '../../containers/navigation'
import HeadLayout from '../../components/head-layout'
import CommentsSection from '../../components/comments-section'

function Article() {
  const store = useStore()
  const { t, lang } = useTranslate()
  const { id } = useParams()
  const { article, waiting: artLoading } = useArticle(id)
  const {
    comments, waiting: comLoading,
    replyTo, text, setText,
    onReplyClick, onSubmit
  } = useComments(id)

  const isAuth = Boolean(localStorage.getItem('token'))
  const addToBasket = useCallback(
    id => store.actions.basket.addToBasket(id),
    [store]
  )

  return (
    <>
      <HeadLayout>
        <TopHead/>
      </HeadLayout>
      <Head title={article.title}>
        <LocaleSelect/>
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={artLoading}>
          <ArticleCard
            article={article}
            onAdd={addToBasket}
            t={t} lang={lang}
          />

          <div className="comments-container">
            <h2>{t('comments.heading')} ({comments.length})</h2>
            <Spinner active={comLoading}>
              <CommentsSection
                comments={comments}
                replyTo={replyTo}
                text={text}
                onTextChange={setText}
                onReplyClick={onReplyClick}
                onSubmit={onSubmit}
                isAuthorized={isAuth}
              />
            </Spinner>
          </div>
        </Spinner>
      </PageLayout>
    </>
  )
}

export default memo(Article)
