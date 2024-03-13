import { dictionary } from './dictionary';

export const availableLanguages = [
  {
    label: 'ru',
    name: 'Русский'
  },
  {
    label: 'en',
    name: 'English'
  }
]

export const translate = (lang) => {
  return dictionary[lang];
};