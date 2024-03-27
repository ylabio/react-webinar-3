import useServices from './use-services';

/**
 * Хук для доступа к объекту хранилища
 * @return {Translate}
 */
export default function useStoreTranslate() {
  return useServices().translate;
}
