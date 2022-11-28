/**
 * Метод, подготавливающий число, разделенное пробелами по сотням
 * @param {number} number контекст отрисовки шаблона
 * @return {string} число, разделённое пробелами
 */
export function truncatePrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Действие: запрос списка популярных карточек.
 * @param {object} item - данные карты
 */
const _addSpacesToItemPrice = (item) => {
    item.discount = null;
    item.price === item.lowprice ? item.price = item.discount :
        item.discount = 100 - Math.round(item.lowprice / item.price * 100);
    item.strPrice = truncatePrice(item.price);
    item.strLowprice = (item.strLowprice ? truncatePrice(item.lowprice) : null);
};

/**
 * Действие: запрос списка популярных карточек.
 * @param {array} data - данные карты
 */
export function addSpacesToPrice(data) {
    if (Array.isArray(data)) {
        data.forEach((item) => {
            _addSpacesToItemPrice(item);
        });
    } else if (typeof data === 'object' && data) {
        _addSpacesToItemPrice(data);
    }
}

/**
 * Метод, преобразующее число, разделенное пробелами по сотням к типу number
 * @param {string} stringNumber число, разделённое пробелами
 * @return {number} число
 */
export function parseIntInPrice(stringNumber) {
    return parseInt(stringNumber.replace(/\s/g, ''));
}

/**
 * Функция, возвращающая завтрашнюю дату.
 * @param {number} firstDayIn сколько дней пропустить, считая от сегодняшнего
 * @return {object} завтрашняя дата
 */
export function getDate(firstDayIn) {
    const getDate = (next) => {
        const currDate = new Date();
        currDate.setDate(next);
        return currDate.toLocaleDateString('en-GB').split('/').join(' / ');
    };
    return Array.from(Array(7).keys()).map((inDays) => getDate(inDays + firstDayIn));
}

/**
 * Функция, выполняющая склонение окончаний в словах.
 * @param {int} number число для которого нужно выполнить склонение окончания у существительного
 * @param {Array} txt массив строк с выриантами склонений
 * @return {string} подходящая строка
 */
export function _sklonenie(number, txt) {
    const cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ?
        2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
