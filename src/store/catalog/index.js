import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      listCategory: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        sortCategory: '*',
        query: '',
        token: ''
      },
      count: 0,
      waiting: false,
      refresh: false,
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(token = '') {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    const refresh = this.getState().refresh;
    if (refresh == false) {
      if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
      if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
      if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
      if (urlParams.has('query')) validParams.query = urlParams.get('query');
      if (urlParams.has('sortCategory')) validParams.sortCategory = urlParams.get('sortCategory');
      if (urlParams.has('token')) validParams.token = urlParams.get('token');
      this.setState({
        ...this.getState(),
        //params: validParams,
        refresh: true
      }, 'Обновление страницы');
    }
    else {
      validParams = this.getState().params;
      validParams.token = token;
      /*this.setState({
        ...this.getState(),
        params: validParams,
      }, 'Меняем токен');*/
    }
    //validParams.sortCategory = '*';
    if (refresh == false) await this.setParams({...this.initState().params, ...validParams}, true);
    else await this.setParams(validParams, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (window.location.pathname == '/') {
      if (replaceHistory) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    }
    
    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    const vReqvest = `/api/v1/articles?${new URLSearchParams(apiParams)}` + (params.sortCategory == '*' ? '' : `&search[category]=${params.sortCategory}`);;

    const response = await fetch(vReqvest);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

async getCategotys() {
  const apiParams = {
    limit: '*',
    fields: '_id,title,parent(_id)',
  };

  const response = await fetch(`/api/v1/categories?${new URLSearchParams(apiParams)}`);
  const json = await response.json();

    let vMassCategory = [];

    let vItems = json.result.items;
    let vCountOptionsCategory = vItems.length;
    let vMassCategoryNum = [];
    let vLevelParent;
    let vSrt;
    let vFlag;
    let vFlag2;
    let _idTemp;
    let vvg;
    let vvj;
    let vvz;
    let vvh;
    let vMass = [];

    vvg = 0;
    vvj = 0;
    vvz = -1;
    vvh = 0;
    _idTemp = vItems[vvj]._id;
    vLevelParent = 0;

    while (vvg <= vCountOptionsCategory) {
      if (vvg < vCountOptionsCategory && _idTemp == vItems[vvg]._id) {
        if (vLevelParent == 0) vvz = vvg;
        vLevelParent++;
        vFlag = false;
          for (let vvi = 0; vvi < vMassCategoryNum.length; vvi++) {
            if (vMassCategoryNum[vvi]._id == vItems[vvz]._id) {
              vFlag = true;
              break;
            }
          }
        if (vFlag == false && !vItems[vvg].parent?._id) {//нулевой уровень
          vMassCategoryNum.push({_id: vItems[vvz]._id, level: vLevelParent - 1, title: vItems[vvz].title});
          vLevelParent = 0;
          if (vLevelParent == 0) {
            vFlag2 = false;
            for (let vvl = 0; vvl < vvh; vvl++) {
              if (vMass[vvl] != -1) {
                vvg = vMass[vvl];
                _idTemp = vItems[vvg]._id;
                vMass[vvl] = -1;
                if (vvl == vvh - 1) vvh = 0;
                vFlag2 = true;
                break;
              } 
            }
            if (vFlag2 == false) {
              vvg = vvj;
              _idTemp = vItems[vvg]._id;
            }
            continue;
          }
        }
        else {//не нулевой уровень
          if (vFlag == false) {
            for (let vvi = 0; vvi < vCountOptionsCategory; vvi++) {
              if (vItems[vvi].parent?._id == vItems[vvg]._id) {
                if (vvj <= vvi) {
                  if (vvh == 0) vMass = [];
                  vMass[vvh] = vvi;
                  vvh += 1;
                }
              }
            }
          }
          _idTemp = vItems[vvg].parent?._id;
        }
        vvg = 0;
        continue;
      }
      if (vvg >= vCountOptionsCategory - 1) {
        vvj++;
        if (vvj >= vCountOptionsCategory) {
          break;
        }
        vLevelParent = 0;
        _idTemp = vItems[vvj]._id;
        vvg = vvj;
        continue;
      }
      vvg++;
    }
    
      for (let vvi = 0; vvi < vMassCategoryNum.length; vvi++) {
          vSrt = '';
          for (let vvz = 0; vvz < vMassCategoryNum[vvi].level; vvz++) {
            vSrt += '- ';
          }
          vMassCategory.push({value: vMassCategoryNum[vvi]._id, title: vSrt + vMassCategoryNum[vvi].title});
      }

  this.setState({
    ...this.getState(),
    listCategory: vMassCategory,
  }, 'Загружаем список категорий из АПИ');
}
}

export default CatalogState;
