import headerTemplate from './header.hbs';
import BaseComponent from '../BaseComponent';
import './header.scss';
import itemsStore from '../../stores/ItemsStore';
import validation from '../../modules/validation';
import errorMessage from '../../modules/ErrorMessage';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards';
import {config} from '../../config';
import router from '../../modules/Router';
import SearchSuggestion from '../SearchSuggestion/SearchSuggestion';

/**
 * Класс для реализации компонента Header
 */
export default class Header extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Header
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);

        itemsStore.addListener(this.listenSearchRequest, ItemCardsActionTypes.GET_SEARCH_RESULTS);
        itemsStore.addListener(this.listenSearchSuggestion.bind(this),
            ItemCardsActionTypes.GET_SUGGESTION_SEARCH);
    }

    /**
     * Функция, обрабатывающая результат запроса на поиск.
     */
    listenSearchRequest() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            router.openPage(config.href.search);
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при поиске. Попробуйте позже');
        }
    }

    /**
     * Функция, обрабатывающая результат запроса на подсказки поиска.
     */
    listenSearchSuggestion() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            this.suggestionsBlock.render(
                itemsStore.getContext(itemsStore._storeNames.suggestionsSearch));
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при поиске. Попробуйте позже');
        }
    }

    /**
     * Функция для передачи в слушателе mouseover.
     */
    async listenMouseOverProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        if (headerPopUp) {
            headerPopUp.style.display = 'block';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout.
     */
    async listenMouseOutProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        if (headerPopUp) {
            headerPopUp.style.display = 'none';
        }
    }

    /**
     * Функция, обрабатывающая нажатие на кнопку поиска.
     */
    listenSearchButtonClick() {
        const errorMessageSearch = validation.validateSearchField(this.searchInput.value);
        if (errorMessageSearch) {
            errorMessage.getAbsoluteErrorMessage(errorMessageSearch);
        } else {
            itemCardsAction.getSearchResults(this.searchInput.value);
        }
    }

    /**
     * Функция, обрабатывающая ввод в строку поиска.
     */
    listenInputSearch() {
        const errorMessageSearch = validation.validateSearchField(this.searchInput.value);
        if (!errorMessageSearch) {
            itemCardsAction.getSuggestionSearch(this.searchInput.value);
        } else {
            this.elementSuggestions.innerHTML = '';
        }
    }

    /**
     * Функция, обрабатывающая нажатие на саджест.
     * @param {HTMLElement} target - элемент вызвавший событие
     */
    listenSuggestSearch({target}) {
        const errorMessageSearch = validation.validateSearchField(target.innerText);
        if (!errorMessageSearch) {
            this.elementSuggestions.innerHTML = '';
            itemCardsAction.getSearchResults(target.innerText);
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.headerProfile = document.querySelector('.header__profile');
        if (this.headerProfile) {
            this.headerProfile.addEventListener('mouseover', this.listenMouseOverProfile);
            this.headerProfile.addEventListener('mouseout', this.listenMouseOutProfile);
        }

        this.searchButton = document.getElementById('search-button-submit');
        if (this.searchButton) {
            this.bindListenSearchButtonClick = this.listenSearchButtonClick.bind(this);
            this.searchButton.addEventListener('click', this.bindListenSearchButtonClick);
        }

        this.searchInput = document.getElementById('search-line__text');
        if (this.searchInput) {
            this.bindListenInputSearch = this.listenInputSearch.bind(this);
            this.searchInput.addEventListener('input', this.bindListenInputSearch);
        }

        if (this.elementSuggestions) {
            this.bindListenSuggestSearch = this.listenSuggestSearch.bind(this);
            this.elementSuggestions.addEventListener('click', this.bindListenSuggestSearch);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.headerProfile) {
            this.headerProfile.removeEventListener('mouseover', this.listenMouseOverProfile);
            this.headerProfile.removeEventListener('mouseout', this.listenMouseOutProfile);
        }

        if (this.searchButton) {
            this.searchButton.removeEventListener('click', this.bindListenSearchButtonClick);
        }

        if (this.searchInput) {
            this.searchInput.removeEventListener('input', this.bindListenInputSearch);
        }

        if (this.elementSuggestions) {
            this.elementSuggestions.removeEventListener('click', this.bindListenSuggestSearch);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Boolean} session контекст отрисовки шаблона, содержащий информацию об авторизации
     */
    render(session) {
        super.render(this.prepareRenderData(session), headerTemplate);
        this.elementSuggestions = document.getElementById('search-suggestions__main');
        this.suggestionsBlock = new SearchSuggestion(this.elementSuggestions);
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
