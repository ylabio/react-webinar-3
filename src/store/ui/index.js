import StoreModule from '../module';

class UI extends StoreModule {
  initState() {
    return {
      headerTitle: 'Магазин',
    };
  }

  setTitle(title) {
    this.setState(
      {
        ...this.getState(),
        headerTitle: title,
      },
      `Обновлён заголовок: ${title}`,
    );
  }
}

export default UI;
