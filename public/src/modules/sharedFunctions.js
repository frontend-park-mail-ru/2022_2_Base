/**
 * Класс с функциями общего назначения
 */
class SharedFunctions {
    /**
     * Метод, подготавливающий число, разделенное пробелами по сотням
     * @param {int} number контекст отрисовки шаблона
     * @return {string} число, разделённое пробелами
     */
    _truncate(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

export default new SharedFunctions();
