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
            item.strLowprice = (item.strLowprice ? this._truncate(item.lowprice) : null);
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
}

export default new SharedFunctions();
