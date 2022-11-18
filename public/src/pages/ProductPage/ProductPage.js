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
        }
        super.render(data)
    }
}