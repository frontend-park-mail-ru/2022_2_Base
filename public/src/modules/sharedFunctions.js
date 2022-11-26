/**
 * Класс с функциями общего назначения
 */
class SharedFunctions {
    /**
     * Метод, подготавливающий число, разделенное пробелами по сотням
     * @param {number} number контекст отрисовки шаблона
     * @return {string} число, разделённое пробелами
     */
    _truncate(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    /**
     * Действие: запрос списка популярных карточек.
     * @param {array} data - данные карты
     */
    addSpacesToPrice(data) {
        data?.forEach((item) => {
            item.discount = null;
            item.price === item.lowprice ? item.price = item.discount :
                item.discount = 100 - Math.round(item.lowprice / item.price * 100);
            item.strPrice = this._truncate(item.price);
            item.strLowprice = this._truncate(item.lowprice);
        });
    }

    /**
     * Метод, преобразующее число, разделенное пробелами по сотням к типу number
     * @param {string} stringNumber число, разделённое пробелами
     * @return {number} число
     */
    _parseInt(stringNumber) {
        return parseInt(stringNumber.replace(/\s/g, ''));
    }

    /**
     * Функция, возвращающая завтрашнюю дату.
     * @param {int} firstDayIn сколько дней пропустить, считая от сегодняшнего
     * @return {object} завтрашняя дата
     */
    _getDate(firstDayIn) {
        const getDate = (next) => {
            const currDate = new Date(new Date().getTime() + next * 24 * 60 * 60 * 1000);
            return `${currDate.getDate()} / ${currDate.getMonth() + 1} / ${currDate.getFullYear()}`;
        };
        return Array.from(Array(7).keys()).map((inDays) => getDate(inDays + firstDayIn));
    }

    /**
     * Функция, выполняющая склонение окончаний в словах.
     * @param {number} number число для которого нужно выполнить склонение окончания у существительного
     * @param {Array} txt массив строк с выриантами склонений
     * @return {string} подходящая строка
     */
    _declination(number, txt) {
        const cases = [2, 0, 1, 1, 1, 2];
        return txt[
            (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
        ];
    }
}

export default new SharedFunctions();
