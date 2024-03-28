const scrollToElement = (selector, paramsId, id) => {
  const element = document.querySelector(selector);
  if (element) {
    const yOffset = window.pageYOffset + element.getBoundingClientRect().top - (window.innerHeight - element.offsetHeight) / 2;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
  }
};

export default scrollToElement;