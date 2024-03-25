export default {
  changLanguage: (language) => {
    return {type: 'translate/change-language', payload: {language}};
  },
}
