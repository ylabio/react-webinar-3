import { useContext } from 'react';
import { ServicesContext } from '../context';

/**
 * Хук для доступа к сервисам
 * @return {services}
 */
export default function useServices() {
  return useContext(ServicesContext);
}
