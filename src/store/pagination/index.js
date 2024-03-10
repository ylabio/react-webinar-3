import StoreModule from '../module';

class Pagination extends StoreModule {

  initState() {
    return {
      pageButtons: [],
      showedPageButtons: [],
    }
  }

  generateButtons(count, currentSkipValue) {
    const pageButtons = [];
    const showedPageButtons = [];

    // Заполнение массива с кнопками
    for (let i = 0; i < count; i++) {
      pageButtons.push({
        pageNumber: i + 1,
        selected: false,
        skipValue: 0
      });
      pageButtons[i].skipValue = (pageButtons[i].pageNumber - 1) * 10;
      if (pageButtons[i].skipValue === currentSkipValue) {
        pageButtons[i].selected = true;
      }
    }

    const currentButton = pageButtons.filter((button) => button.selected)[0]; // Текущая нажатая кнопка

    // Всегда отображать кнопку первой страницы
    showedPageButtons.push(pageButtons[0]);

    if (currentButton.pageNumber < 3) {
      // Отображение кнопок для малых значений текущей страницы
      showedPageButtons.push(pageButtons[1]);
      showedPageButtons.push(pageButtons[2]);
      showedPageButtons.push({key: 'ellipsis'});
    } else if (currentButton.pageNumber > count - 2) {
      // Отображение кнопок для больших значений текущей страницы
      showedPageButtons.push({key: 'ellipsis'});
      showedPageButtons.push(pageButtons[count - 3]);
      showedPageButtons.push(pageButtons[count - 2]);
    } else {
      // Отображение кнопок для остальных случаев
      if (currentButton.pageNumber > 3) showedPageButtons.push({key: 'ellipsis_1'});
      showedPageButtons.push(pageButtons[currentButton.pageNumber - 2]);
      showedPageButtons.push(currentButton);
      showedPageButtons.push(pageButtons[currentButton.pageNumber]);
      if (currentButton.pageNumber < count - 2) showedPageButtons.push({key: 'ellipsis_2'});
    }

    // Всегда отображать кнопку последней страницы
    showedPageButtons.push(pageButtons[count - 1]);

    this.setState({
      ...this.getState(),
      pageButtons,
      showedPageButtons
    }, 'Генрация кнопок пагинации')
  }
}

export default Pagination;
