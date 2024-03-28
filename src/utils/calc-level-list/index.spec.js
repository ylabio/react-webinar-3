import calcLevelList from './index';

describe('utils/calcLevelList', () => {

  test('equal to level 0', () => {
    expect(calcLevelList([{children: [], level: 0},{test: 2}], 2)).toEqual({list: [{children: [], level: 0},{test: 2}], levelList: 0});
  });

  test('equal to level 1', () => {
    expect(calcLevelList([{children: [{children: [], level: 1}], level: 0}, {children: [], level: 0}], 2))
      .toEqual({list: [{children: [{children: [], level: 1}], level: 0}, {children: [], level: 0}], levelList: 1});
  });

  test('equal to level 2', () => {
      expect(calcLevelList([{children: [{children: [{children: [], level: 2}], level: 1}, {children: []}], level: 0}], 2))
        .toEqual({list: [{children: [{children: [{children: [], level: 'max'}], level: 1}, {children: []}], level: 0}], levelList: 2});
  });

  test('equal to level 4', () => {
    expect(calcLevelList([
      {children: [
        {children: [
          {children: [], level: 2}, 
          {children: [{children: [{children: [], level: 4}], level: 3}], level: 2}
        ], 
        level: 1},
        {test: 2}, 
        {children: [], level: 1}
      ], 
      level: 0},
      {children: [
        {children: [], level: 1}
      ], 
      level: 0},
    ], 3)).toEqual(
      {list: [ 
        {children: [
          {children: [
            {children: [], level: 2}, 
            {children: [{children: [{children: [], level: 'max'}], level: 'max'}], level: 2} //ставит метку 'max'
          ], level: 1},
          {test: 2}, 
          {children: [], level: 1}
          ], 
          level: 0},
          {children: [
            {children: [], level: 1}
          ], 
          level: 0},], 
      levelList: 4 //максимальный уровень вложенности
      }); 
  });

});