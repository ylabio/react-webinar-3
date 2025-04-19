import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import articleActions from '../store-redux/article/actions'
import useTranslate from './use-translate'

export function useArticle(productId) {
  const dispatch = useDispatch()
  const { lang } = useTranslate()

  const article = useSelector(state => state.article.data);
  const waiting = useSelector(state => state.article.waiting);

  useEffect(() => {
    dispatch(articleActions.load(productId))
  }, [dispatch, productId, lang])

  return { article, waiting }
}
