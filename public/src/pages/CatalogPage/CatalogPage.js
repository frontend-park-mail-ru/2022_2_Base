import BasePage from '../BasePage.js';
import CatalogItemCard from '../../components/CatalogItemCard/CatalogItemCard.js';
import './CatalogPage.scss';
// import request from '../../modules/ajax.js';
// import router from '../../modules/Router.js';
import CatalogPageTemplate from './CatalogPage.hbs';
// import request from '../../modules/ajax';
// import ItemCard from '../../components/ItemCard/ItemCard';
// import {assertSimpleType} from '@babel/core/lib/config/caching';

/**
 * Класс, реализующий страницу с каталога.
 */
export default class CatalogPage extends BasePage {
    context = {};
    CatalogItemCards = {};
    loadedCardsCount = 0;

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(parent, CatalogPageTemplate);
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     */
    async loadCatalogItemCards() {
        /*
        В зависимости от this.loadedCardsCount добавлять цифры
         */
        const CatalogItemCardsInfo = []; // cюда нужно пушнуть все карточки


        /*
        const catalogItemCard1 = {
            itemName: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый', // имя товара
            exPrice: 26990,
            price: 25990,
            propertyName1: 'экран', // название первой характеристики
            property1: '10.2' (2160x1620), IPS', // первая характеристика
            propertyName2: 'процессор', // название второй характеристики
            property2: 'Apple A13 Bionic', // вторая характеристика
            propertyName3: 'версия ОС', // название третьей характеристики
            property3: 'iPadOS', // третья характеристика
            propertyName4: 'цвет', // название четвертой характеристики
            property4: 'серебристый', // четвертая характеристика
            id: 'some_ref1', // id товара
            favourite: true, // добавлен ли он в избранное (disabled)
            img: './../../../img/ipad.png', // фотка
            amount: 1, // количество в корзине (может быть 0)
            rating: 0, // пока disabled
        };

        const CatalogItemCardsInfo = [];
        CatalogItemCardsInfo.push(catalogItemCard1);

        const catalogItemCard2 = {
            itemName: 'Планшет Apple iPad Pro 11 2021, 128 ГБ, Wi-Fi, серебристый',
            exPrice: 26990,
            price: 25990,
            propertyName1: 'экран',
            property1: '10.2' (2160x1620), IPS',
            propertyName2: 'процессор',
            property2: 'Apple A13 Bionic',
            propertyName3: 'версия ОС',
            property3: 'iPadOS',
            propertyName4: 'цвет',
            property4: 'серебристый',
            id: 'some_ref2',
            favourite: true,
            img: './../../../img/ipad.png',
            inCart: false,
            amount: 5,
        };

        CatalogItemCardsInfo.push(catalogItemCard2);

        const catalogItemCard3 = {
            itemName: 'Планшет Apple iPad Pro 12.9 2021, 128 ГБ, Wi-Fi, серебристый',
            exPrice: 26990,
            price: 25990,
            propertyName1: 'экран',
            property1: '10.2' (2160x1620), IPS',
            propertyName2: 'процессор',
            property2: 'Apple A13 Bionic',
            propertyName3: 'версия ОС',
            property3: 'iPadOS',
            propertyName4: 'цвет',
            property4: 'серебристый',
            id: 'some_ref3',
            favourite: true,
            img: './../../../img/ipad.png',
            inCart: false,
            amount: 5,
        };

*/


        // CatalogItemCardsInfo.push(catalogItemCard3);

        // this.loadedCardsCount = 3;

        this.renderCards(CatalogItemCardsInfo);
    }

    /**
     * Функция, отрисовывающая карточки товаров
     * @param {Array} CatalogItemCardsInfo массив карточек для отрисовки
     */
    renderCards(CatalogItemCardsInfo) {
        const Card = new CatalogItemCard(document.getElementById('items-block'));
        Card.render(CatalogItemCardsInfo);
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    localEventListenersHandler(event) {
        event.preventDefault();
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
                switch (elementId) {
                case 'catalog_button-add-to-cart':
                    /* запрос на добавление товара в корзину */

                    if (true) { // FIX!!! если запрос успешный
                        const addToCartButton = document.getElementById(
                            `catalog_button-add-to-cart/${itemId}`);
                        const amountSelector = document.getElementById(
                            `catalog_amount-selector/${itemId}`);
                        if (!!addToCartButton && !!amountSelector) {
                            amountSelector.style.display = 'grid';
                            addToCartButton.style.display = 'none';

                            const itemAmount = document.getElementById(`catalog_item-amount/${itemId}`);
                            if (itemAmount) {
                                if (parseInt(itemAmount.textContent) === 0) {
                                    // Можно получать количество элементов из HTML, а можно по запросу,
                                    // так данные будут более актуальны
                                    itemAmount.textContent = '1';
                                }
                            }
                        } else {
                            console.warn('Элементы не найдены: addToCartButton, addToCartButton');
                        }
                    }
                    break;
                case 'catalog_button-minus_cart':
                    /* Запрос на уменьшение количества единиц товара в корзине */

                    if (true) { // FIX!!! если запрос успешный
                        const itemAmount = document.getElementById(`catalog_item-amount/${itemId}`);
                        if (itemAmount) {
                            const amount = parseInt(itemAmount.textContent);
                            // Можно получать количество элементов из HTML, а можно по запросу,
                            // так данные будут более актуальны

                            if (amount === 1) {
                                const amountSelector = document.getElementById(
                                    `catalog_amount-selector/${itemId}`);
                                const addToCartButton = document.getElementById(
                                    `catalog_button-add-to-cart/${itemId}`);
                                if (!!addToCartButton && !!amountSelector) {
                                    amountSelector.style.display = 'none';
                                    addToCartButton.style.display = 'flex';
                                } else {
                                    console.warn(
                                        'Элементы не найдены: addToCartButton, addToCartButton');
                                }
                            } else {
                                itemAmount.textContent = (amount - 1).toString();
                            }
                        }
                    }

                    break;
                case 'catalog_button-plus_cart':
                    /* Запрос на увеличение количества единиц товара в корзине */

                    if (true) { // FIX!!! если запрос успешный
                        const itemAmount = document.getElementById(`catalog_item-amount/${itemId}`);
                        if (itemAmount) {
                            const amount = parseInt(itemAmount.textContent);
                            // Можно получать количество элементов из HTML, а можно по запросу,
                            // так данные будут более актуальны
                            itemAmount.textContent = (amount + 1).toString();
                        }
                    }
                    break;
                case 'catalog_like-button':
                    /* Запрос на добавление товара в избраннное */
                    // console.log(target)
                    // const likeButton = document.getElementById(`catalog_like-button/${itemId}`);
                    // console.log(target.hasAttribute('checked'));
                    // target.setAttribute('checked','');

                    break;
                }
            } else {
                switch (elementId) {
                case 'catalog-item-pic':
                    // target.dataset.href;
                    /* Переход на страницу товара по ссылке в комменте выше */

                    break;
                case 'catalog_item-title':
                    // target.getAttribute('href'));
                    /* Переход на страницу товара по ссылке в комменте выше */
                    break;
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая скролл на странице
     * @param {Event} event контекст события для обработки
     */
    bottomOfPageHandlerPrototype(event) {
        if ((scrollY + innerHeight > (0.95 * document.body.scrollHeight))) {
            this.loadCatalogItemCards();
        }
    }


    /**
     * Метод, обрабатывающий скролл, в котором есть this класса
     */
    bottomOfPageHandler = this.bottomOfPageHandlerPrototype.bind(this);

    /**
     * Метод, добавляющий слушатели
     */
    startEventListener() {
        const catalogContent = document.getElementById('catalog_content');
        if (catalogContent) {
            catalogContent.addEventListener('click', this.localEventListenersHandler);
        }

        window.addEventListener('scroll', this.bottomOfPageHandler);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const catalogContent = document.getElementById('catalog_content');
        if (catalogContent) {
            catalogContent.removeEventListener('click', this.localEventListenersHandler);
        }
    }


    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);
        await this.loadCatalogItemCards();
        this.startEventListener();
    }
}

