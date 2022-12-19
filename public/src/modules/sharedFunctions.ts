import {config} from '../config';

/**
 * Метод, подготавливающий число, разделенное пробелами по сотням
 * @param number - контекст отрисовки шаблона
 * @returns число, разделённое пробелами
 */
export function truncatePrice(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Действие: запрос списка популярных карточек.
 * @param item - данные карты
 */
export function _addSpacesToItemPrice(item: priceData) {
    if (item.lowprice) {
        item.discount = 100 - Math.round(item.lowprice / item.price * 100);
        item.strPrice = truncatePrice(item.price);
    } else {
        item.lowprice = item.price;
    }
    item.strLowprice = truncatePrice(item.lowprice);
}

/**
 * Действие: добавление пробелов в цену и вычисление скидки.
 * @param data - данные карты
 */
export function addSpacesToPrice(data: Array<priceData>) {
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
 * @param stringNumber - число, разделённое пробелами
 * @returns число
 */
export function parseIntInPrice(stringNumber: string) {
    return parseInt(stringNumber.replace(/\s/g, ''));
}

/**
 * Функция, возвращающая дату с пробелами между '/'.
 * @param date - дата для конвертации
 * @returns дата в формате 09 / 12 / 2022
 */
export function getLocalDate(date: Date) {
    return date.toLocaleDateString('en-GB').split('/').join(' / ');
}

/**
 * Функция, возвращающая завтрашнюю дату.
 * @param firstDayIn - сколько дней пропустить, считая от сегодняшнего
 * @returns завтрашняя дата
 */
export function getDate(firstDayIn: number) {
    const currDate = new Date();
    const getDate = (next: number) => {
        currDate.setDate(currDate.getDate() + next);
        return currDate.toLocaleDateString('en-GB').split('/').join(' / ');
    };
    return Array.from(Array(7).keys()).map(() => getDate(firstDayIn));
}

/**
 * Функция, выполняющая склонение окончаний в словах.
 * @param number - число для которого нужно выполнить склонение окончания у существительного
 * @param declensionVariants - массив с вариантами склонений
 * @returns подходящая строка
 */
export function _declension(number: number, declensionVariants: Array<string>) {
    const cases = [2, 0, 1, 1, 1, 2];
    return declensionVariants[(number % 100 > 4 && number % 100 < 20) ?
        2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


/**
 * Функция, возвращает объект query параметров вида q: 'param'.
 * @returns query params
 */
export function getQueryParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(<string>prop),
    });
}

/**
 * Функция, получающая по id, HTMLInputElement элемент и возвращающая его как HTMLInputElement.
 * @param  elementID - идентификатор элемента
 */
export function getInputValueById(elementID: string) {
    const inputElement = document.getElementById(elementID);
    if (inputElement instanceof HTMLInputElement) {
        return inputElement;
    }
    return (config.empyNode as HTMLInputElement);
}

/**
 * Функция получающая unknown и проверяющая на string.
 * @param  data - данные для обработки
 */
export function getStringValueFromStore(data: unknown) {
    if (typeof data === 'string') {
        return data;
    } else {
        return '';
    }
}

/**
 * Функция изменяющаяся textContent.
 * @param  element - данные для обработки
 * @param  data - данные для обработки
 */
export function setTextContent(element: HTMLElement | null, data: string) {
    if (element) {
        element.textContent = data;
    }
}

/**
 * Функция изменяющаяся textContent.
 * @param  element - данные для обработки
 */
export function getTextContent(element: HTMLElement | null) {
    if (element) {
        return element.textContent ?? '';
    }
    return '';
}

/**
 * Функция возвращающая объект со всеми свойствами в строчном написании.
 * @param  obj - объект для обработки
 */
export function objectKeysToLowerCase(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]),
    );
}

/**
 * Функция, для получения информации
 * на что действует промокод и размер скидки.
 * @param promo - прмокод
 * @returns текст для отображения
 */
export function parsePromo(promo: string) {
    return (promo ? `Скидка на ${parseCategoryPromo(promo)}` +
        `${Number(promo.substring(1, 2)).toString()}` : null);
}

/**
 * Функция, для получения категории промокода
 * @param promo - прмокод
 * @returns категория
 */
export function parseCategoryPromo(promo: string) {
    switch (promo.substring(0, 1)) {
    case 'A':
        return 'все товары';
    case 'C':
        return 'компьютеры';
    case 'M':
        return 'мониторы';
    case 'P':
        return 'телефоны';
    case 'V':
        return 'телевизоры';
    case 'W':
        return 'часы';
    case 'T':
        return 'планшеты';
    case 'X':
        return 'аксессуары';
    default:
        return 'некоторые товары';
    }
}
