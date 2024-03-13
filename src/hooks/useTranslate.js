import { useEffect } from 'react'
import { translate } from '../locales/lang'

export const useTranslate = (deps, lang) => {
  useEffect(() => {
    for (let key in translate) {
      if (document.querySelectorAll('.lng-'+key)) {
        const nodeList = document.querySelectorAll('.lng-'+key)
        Array.prototype.slice.call(nodeList).map(item => {
          item.innerHTML = translate[key][lang]
        })
      }
    }
  }, [...deps])
}