import { useContext } from 'react';
import { ServicesContext } from '../context';

/**
 * Хук для доступа к сервисам
 * @return {services}
 */
export default function useServices() {
  // const services = useContext(ServicesContext);
  // if (!services) {
  //   throw new Error('useServices must be used within a ServicesContext.Provider');
  // }
  // console.log('ServicesContext', useContext(ServicesContext));
  return useContext(ServicesContext);
  // return services;
}
