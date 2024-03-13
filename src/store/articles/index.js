import StoreModule from '../module';

class Articles extends StoreModule {
  initState() {
    return {
      data: {},
      loading: 'idle',
      error: '',
    };
  }

  async getProductDetails(id, language = 'ru') {
    this.setState(
      {
        ...this.getState(),
        loading: 'panding',
      },
      'panding',
    );

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=${language}`,
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(response.status);
      }
      this.setState(
        {
          ...this.getState(),
          data: json.result,
          loading: 'success',
        },
        'Загружена детализация товара из АПИ',
      );
    } catch (err) {
      this.setState(
        {
          data: [],
          loading: 'failed',
          error: err.message,
        },
        'failed',
      );
    }
  }

  clearData() {
    this.setState({
      ...this.getState(),
      data: {},
    });
  }
}

export default Articles;
