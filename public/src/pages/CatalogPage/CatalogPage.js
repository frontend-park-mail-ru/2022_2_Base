import BasePage from '../BasePage.js';
import CatalogItemCard from '../../components/CatalogItemCard/CatalogItemCard.js';
import './CatalogPage.scss';
import request from '../../modules/ajax.js';
import router from '../../modules/Router.js';
import CatalogPageTemplate from './CatalogPage.hbs';

/**
 * Класс, реализующий страницу с каталога.
 */
export default class CatalogPage extends BasePage {
    context = {};
    CatalogItemCards = {};
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            CatalogPageTemplate,
        );
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     */
    async loadCatalogItemCards() {
        const catalogItemCard = {
            itemName: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый',
            exPrice: '26 990 ₽',
            price: '25 990 ₽',
            propertyName1: 'экран',
            property1: '10.2" (2160x1620), IPS',
            propertyName2: 'процессор',
            property2: 'Apple A13 Bionic',
            propertyName3: 'версия ОС',
            property3: 'iPadOS',
            propertyName4: 'цвет',
            property4: 'серебристый',
            id: 'some_ref',
            favourite: true,
            img: './../../../img/ipad.png',
        };

        const CatalogItemCardsInfo = [];
        CatalogItemCardsInfo.push(catalogItemCard);
        CatalogItemCardsInfo.push(catalogItemCard);
        CatalogItemCardsInfo.push(catalogItemCard);
        CatalogItemCardsInfo.push(catalogItemCard);

        await this.renderCards(CatalogItemCardsInfo);
    }

    /**
     * Функция, отрисовывающая карточки товаров
     * @param {Array} CatalogItemCardsInfo массив карточек для отрисовки
     */
    async renderCards(CatalogItemCardsInfo) {
        const CatalogItemCards = [];
        CatalogItemCardsInfo.forEach(function(catalogItemCard, index, array) {
            const Card = new CatalogItemCard(document.getElementById('items-block'));
            Card.render(catalogItemCard);
            CatalogItemCards.push(Card);
        });
        this.CatalogItemCards = CatalogItemCards;
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
        this.CatalogItemCards.forEach(function(catalogItemCard, index, array) {
            catalogItemCard.removeEventListener();
        });
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);
        await this.loadCatalogItemCards();
    }
}
