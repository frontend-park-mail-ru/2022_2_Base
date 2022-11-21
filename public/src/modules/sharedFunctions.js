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
}

export default new SharedFunctions();
