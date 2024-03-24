import {useCallback, useContext} from 'react';
import {I18nContext} from '../i18n/context';
import I18NService from '../i18n';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n
  return useContext(I18nContext);
}
