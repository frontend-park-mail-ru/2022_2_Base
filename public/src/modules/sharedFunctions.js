import itemsStore from '../stores/ItemsStore';

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
 * @param {array} data - данные карты
 */
export function addSpacesToPrice(data) {
    data?.forEach((item) => {
        item.discount = null;
        item.price === item.lowprice ? item.price = item.discount :
            item.discount = 100 - Math.round(item.lowprice / item.price * 100);
        item.strPrice = truncatePrice(item.price);
        item.strLowprice = truncatePrice(item.lowprice);
    });
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
