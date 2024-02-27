# Интенсив React от Y_LAB

## 1. Погружение в React

### Задача 1
Доработать выделение записей, чтобы при выделении сбрасывалось выделения у других записей. Клик по выделенной записи тоже отменяет выделение.

### Задача 2
Доработать создание новой записи. Если обратили внимание код у новой записи формируется на основе размера массива, что не гарантирует уникальности кода. Реализуйте генератор уникальных чисел в рамках сессии. Генерировать огромные числа не надо, просто обеспечивается неповторимость кодов. Код записи - это не её порядковый номер. Выводится код записи. Если удалить последнюю запись с кодом 7, то при добавлении новой код будет равен 8. Записи с кодом 7 больше не будет в списке.

### Задача 3
Вывести количество совершенных выделений для каждого пункта фразой “Выделяли N раз”. По умолчанию у всех ноль. Фразу с нулём выводить не надо.
