import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      listCategory: [],
    }
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
    let vFlag3;
    let vFlag4;
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
          vMassCategoryNum.push({_id: vItems[vvz]._id, level: vLevelParent - 1, title: vItems[vvz].title, parentId: vItems[vvz].parent?._id});
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
    let vLevel = 0;
    let vFlag5;
    let vCount = 0;
    vFlag4 = true;
    while (vFlag4) {
    vFlag4 = false;
    vFlag5 = false;
    for (let vvj = 0; vvj < vMassCategoryNum.length; vvj++) {
      if (vFlag5 == true) {
        break;
      }
      for (let vvi = 0; vvi < vMassCategoryNum.length; vvi++) {
        if (vvi != vvj && vMassCategoryNum[vvj].level == vLevel &&
            (vLevel == 0 ||
             vLevel > 0 && vMassCategoryNum[vvi]._id == vMassCategoryNum[vvj].parentId)) {
          if (vMassCategoryNum[vvj].level != 0) {
            vFlag3 = false;
            for (let vvz = 0; vvz < vMassCategory.length; vvz++) {
              if (vMassCategoryNum[vvj]._id == vMassCategory[vvz].value) {
                vFlag3 = true;
                break;
              }
            }
            if (vFlag3 == true) {
              continue;
            }
            vFlag3 = false;
            for (let vvz = 0; vvz < vMassCategory.length; vvz++) {
              if (vMassCategoryNum[vvi]._id == vMassCategory[vvz].value &&
                  vMassCategoryNum[vvi].level == vMassCategoryNum[vvj].level - 1) {
                vLevel += 1;
                vFlag4 = true;
                vFlag3 = true;
                break;
              }
            }
            if (vFlag3 == false) {
              vFlag4 = true;
              continue;
            }
          }
          else {
            vFlag3 = false;
            for (let vvz = 0; vvz < vMassCategory.length; vvz++) {
              if (vMassCategoryNum[vvj]._id == vMassCategory[vvz].value) {
                vFlag3 = true;
                break;
              }
            }
            if (vFlag3 == true) {
              continue;
            }
            vLevel += 1;
            vFlag4 = true;
          }
          vSrt = '';
          for (let vvz = 0; vvz < vMassCategoryNum[vvj].level; vvz++) {
            vSrt += '- ';
          }
          vMassCategory.push({value: vMassCategoryNum[vvj]._id, title: vSrt + vMassCategoryNum[vvj].title});
          vFlag5 = true;
          break;
        }
      }
    }
    if (vFlag5 == false && vLevel > 0) {
      vLevel -= 1;
      vFlag4 = true;
    }
  }
  this.setState({
    ...this.getState(),
    listCategory: vMassCategory,
  }, 'Загружаем список категорий из АПИ');
}
}

export default CategoryState;
