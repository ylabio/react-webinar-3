import React from 'react';

// Создаём функцию которая генерирует нам рандомное число от 1 до 100
const GenerateUniqueId = (numbersArray) => {

    const newId = Math.round(Math.random()*100);
    // Сделаем проверку на уникальность пускай она принимает в себя массив из всех айдишников записей
    if (numbersArray.includes(newId)) { // И если число которое она сгенерировала в нем есть запускает себя заново
        return 0,
        GenerateUniqueId(numbersArray);
    } else {
        return newId; // Рано или поздно она дойдет до числа которого в списке нет - и вернёт его
    }
};

export default GenerateUniqueId;





