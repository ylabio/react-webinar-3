import StoreModule from '../module';

class Modals extends StoreModule {
  initState() {
    return {
      name: null,
    };
  }

  open(name, props = {}) {
    console.log('что открываем:', name);
    this.setState({ name, props }, `Открытие модалки ${name}`);
    console.log('новое состояние:', this.getState());
  }

  close() {
    this.setState({ name: null }, `Закрытие модалки`);
  }
}

export default Modals;
