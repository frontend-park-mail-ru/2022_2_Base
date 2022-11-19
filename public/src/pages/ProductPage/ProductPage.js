import ProductPagePageTemplate from './ProductPage.hbs';
import BasePage from '../BasePage.js';
import './ProductPage.scss';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class ProductPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
     constructor(parent) {
        super(
            parent,
            ProductPagePageTemplate,
        );
    }
    /**
     * Метод, добавляющий слушатели.
     */
     startEventListener() {
        
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        
    }
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
     render(config) {
        const data = {
            path: [
                {
                    name: 'Планшеты',
                    href: ''
                },
                {
                    name: 'Apple',
                    href: ''
                },
            ],
            name: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый',
            rating: '5.0',
            comments: {
                href: '',
                count: 466,
            },
            favourite: false,
            photo: './img/ipad.png',
            description: 'Для работы. Для отдыха. Для творчества. Это iPad - универсальный и доступный планшет, прекрасно проявляющий себя во всех сферах: от создания музыки и видео до общения с друзьями и близкими. С iPad всегда все очень просто.',
            characteristics: [
                {
                    name: 'Цвет',
                    data: 'Серый'
                },
                {
                    name: 'Память',
                    data: '64 ГБ'
                },
                {
                    name: 'Экран',
                    data: '10.2" (2160x1620), IPS'
                },
                {
                    name: 'Процессор',
                    data: 'Apple A13 Bionic'
                },
                {
                    name: 'Версия ОС',
                    data: 'iPadOS'
                },
                {
                    name: 'Камеры',
                    data: '3 камеры, основная  8 МП, фронтальная 12 МП'
                },
            ],
            price: '35 890',
            salePrice: '31 580',
            discount: 12,
            date: ' 01 / 12 / 2022',
        }
        super.render(data)
    }
}