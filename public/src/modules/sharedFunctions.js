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
     * Метод, преобразующее число, разделенное пробелами по сотням к типу number
     * @param {string} stringNumber число, разделённое пробелами
     * @return {number} число
     */
    _parseInt(stringNumber) {
        return parseInt(stringNumber.replace(/\s/g, ''));
    }
}

export default new SharedFunctions();
