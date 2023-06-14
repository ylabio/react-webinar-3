import useServices from "./use-services";

/**
 * Хук объект для локализации текстов, код языка и функцию его смены
 * @return {I18nService}
 */
export default function useI18nService() {
  return useServices().translation;
}
