import headerTemplate from './header.hbs';
import BaseComponent from '../BaseComponent';
import './header.scss';
import itemsStore from '../../stores/ItemsStore';

/**
 * Класс для реализации компонента Header
 */
export default class Header extends BaseComponent {
    context = {
        categories: {
            Smartphone: {
                nameCategory: 'Телефоны',
                href: '/category/phones',
            },
            Computer: {
                nameCategory: 'Компьютеры',
                href: '/category/computers',
            },
            Monitors: {
                nameCategory: 'Мониторы',
                href: '/category/monitors',
            },
            TV: {
                nameCategory: 'Телевизоры',
                href: '/category/televisors',
            },
            Watch: {
                nameCategory: 'Часы',
                href: '/category/watches',
            },
            Tablet: {
                nameCategory: 'Планшеты',
                href: '/category/tablets',
            },
            Accessories: {
                nameCategory: 'Аксессуары',
                href: '/category/accessories',
            },
        },
    };

    /**
     * Конструктор, создающий класс компонента Header
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе mouseover.
     */
    async listenMouseOverProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        headerPopUp.style.display = 'block';
    }

    /**
     * Функция для передачи в слушателе mouseout.
     */
    async listenMouseOutProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        headerPopUp.style.display = 'none';
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const headerProfile = document.querySelector('.header__profile');
        if (headerProfile) {
            headerProfile.addEventListener('mouseover', this.listenMouseOverProfile);
            headerProfile.addEventListener('mouseout', this.listenMouseOutProfile);
        } else {
            console.log('element not found', headerProfile);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const headerProfile = document.querySelector('.header__profile');
        if (headerProfile) {
            headerProfile.removeEventListener('mouseover', this.listenMouseOverProfile);
            headerProfile.removeEventListener('mouseout', this.listenMouseOutProfile);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Boolean} session контекст отрисовки шаблона, содержащий информацию об авторизации
     */
    render(session) {
        super.render(this.prepareRenderData(session), headerTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareRenderData(context) {
        return {
            session: context,
            categories: itemsStore.getContext(itemsStore._storeNames.topCategory),
        };
    }
}
