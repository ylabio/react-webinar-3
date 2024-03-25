import useServices from './use-services';

/**
 * Хук для доступа к объекту хранилища
 * @return {i18n}
 */
export default function useTranslate() {
  return useServices().i18n;
}
