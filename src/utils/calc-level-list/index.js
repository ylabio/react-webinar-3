/**
 * Считает максимальный уровень вложенных объектов в массиве и добавляет метки с нужного уровеня
 * @param list {Array} Исходный объект
 * @param level {Array} С какого уровня вложенности ставить метку
 * @returns {Object} Массив с меткой 'max', максимальный уровень вложенности
 */

export default function calcLevelList(list, level) {

  let levelList = 0;

  if (list) {
    
    for (const elem of list) {
      let levelElem = 0;
      let countLevel = 0;
      elem.children?.length && (levelElem = calcChildren(elem.children, countLevel));

      levelList = levelList > levelElem ? levelList : levelElem;
    }
  }

  function calcChildren (elemList, countLevel) {
    let levelList = 0;
    countLevel = countLevel + 1;

    for (const elem of elemList) {

      if (level && countLevel >= level) {
        elem.level = 'max';
      }

      let levelElem = 0;
      elem.children?.length && (levelElem = calcChildren(elem.children, countLevel));
      levelList = levelList > levelElem ? levelList : levelElem;
    }

    levelList = levelList > countLevel ? levelList : countLevel;
    return levelList;
  }

  //levelList max уровень вложенности в массиве
  return {list, levelList};
}

