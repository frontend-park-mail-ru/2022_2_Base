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
    if (item.lowprice) {
        item.discount = 100 - Math.round(item.lowprice / item.price * 100);
        item.strPrice = truncatePrice(item.price);
    } else {
        item.lowprice = item.price;
        delete item.price;
    }
    item.strLowprice = truncatePrice(item.lowprice);
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
    const currDate = new Date();
    const getDate = (next) => {
        currDate.setDate(currDate.getDate() + 1 + next);
        return currDate.toLocaleDateString('en-GB').split('/').join(' / ');
    };
    return Array.from(Array(7).keys()).map(() => getDate(firstDayIn));
}

/**
 * Функция, выполняющая склонение окончаний в словах.
 * @param {number} number число для которого нужно выполнить склонение окончания у существительного
 * @param {Array} txt массив строк с выриантами склонений
 * @return {string} подходящая строка
 */
export function _declension(number, txt) {
    const cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ?
        2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


/**
 * Функция, возвращает объект query параметров вида {q: 'param'}.
 * @return {object} query params
 */
export function getQueryParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
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
