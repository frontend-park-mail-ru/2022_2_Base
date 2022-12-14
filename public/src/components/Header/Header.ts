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
import {getQueryParams} from '../../modules/sharedFunctions';

/**
 * Класс для реализации компонента Header
 */
export default class Header extends BaseComponent {
    bindListenEnterPressSearch: addListenerFunction | emptyCallback;
    bindListenInputSearch: addListenerFunction | emptyCallback;
    bindListenSearchButtonClick: addListenerFunction | emptyCallback;
    bindListenSuggestSearch: addListenerFunction | emptyCallback;
    elementSuggestions: HTMLElement | null;
    headerProfile: HTMLElement | null;
    searchButton: HTMLElement | null;
    searchInput: HTMLInputElement | null;
    catalogButton: HTMLElement | null;
    dropdownContent: HTMLElement | null;
    suggestionsBlock: SearchSuggestion | undefined;
    /**
     * Конструктор, создающий класс компонента Header
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
        this.bindListenEnterPressSearch = config.noop;
        this.bindListenInputSearch = config.noop;
        this.bindListenSearchButtonClick = config.noop;
        this.bindListenSuggestSearch = config.noop;

        this.elementSuggestions = null;
        this.headerProfile = null;
        this.searchButton = null;
        this.searchInput = null;
        this.catalogButton = null;
        this.dropdownContent = null;

        itemsStore.addListener(this.listenSearchSuggestion.bind(this),
            ItemCardsActionTypes.GET_SUGGESTION_SEARCH);
    }

    /**
     * Функция, обрабатывающая результат запроса на подсказки поиска.
     */
    listenSearchSuggestion() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            this.suggestionsBlock?.render(
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
        if (headerPopUp instanceof HTMLElement) {
            headerPopUp.style.display = 'block';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout.
     */
    async listenMouseOutProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        if (headerPopUp instanceof HTMLElement) {
            headerPopUp.style.display = 'none';
        }
    }

    /**
     * Функция, обрабатывающая нажатие на кнопку поиска.
     */
    listenSearchButtonClick() {
        const category = this.#isSearchContainsCategory();
        if (category) {
            router.openPage(category.href);
        } else {
            router.openWithCustomHistoryPage(config.href.search,
                `${config.href.search}?q=${this.searchInput?.value}`);
            if (this.elementSuggestions) {
                this.elementSuggestions.innerHTML = '';
                this.elementSuggestions.classList.toggle('box-shadow__suggestion');
            }
        }
    }

    /**
     * Функция, возвращающая категорию, если она содержится в строке поиска
     * @returns категория
     */
    #isSearchContainsCategory() {
        return Object.values(
            itemsStore.getContext(itemsStore._storeNames.topCategory)).find(
            (category: any) => category.nameCategory.toLowerCase()
                .includes(this.searchInput?.value.toLowerCase())) as topCategoryElement;
    }

    /**
     * Функция, обрабатывающая ввод в строку поиска.
     */
    listenInputSearch() {
        if (this.searchInput?.value) {
            const errorMessageSearch = validation.validateSearchField(this.searchInput.value, true);
            if (!errorMessageSearch) {
                const category = this.#isSearchContainsCategory();
                if (category) {
                    itemCardsAction.getSuggestionSearch(category.nameCategory, true);
                } else {
                    itemCardsAction.getSuggestionSearch(this.searchInput.value);
                }
            } else {
                errorMessage.getAbsoluteErrorMessage(errorMessageSearch);
            }
        } else {
            if (this.elementSuggestions) {
                this.elementSuggestions.innerHTML = '';
                this.elementSuggestions.classList.toggle('box-shadow__suggestion');
            }
        }
    }

    /**
     * Функция, обрабатывающая нажатие на подсказку.
     * @param target - элемент вызвавший событие
     */
    listenSuggestSearch({target}: Event) {
        if (target instanceof HTMLElement && this.searchInput) {
            this.searchInput.value = target.innerText;
            const category = this.#isSearchContainsCategory() as topCategoryElement;

            if (category) {
                router.openPage(category.href);
            } else {
                router.openWithCustomHistoryPage(config.href.search,
                    `${config.href.search}?q=${target.innerText}`);
            }
            if (this.elementSuggestions) {
                this.elementSuggestions.innerHTML = '';
                this.elementSuggestions.classList.toggle('box-shadow__suggestion');
            }
        }
    }

    /**
     * Функция, обрабатывающая нажатие на кнопку enter при вводе поискового запроса.
     * @param event - событие, вызвавшее функцию
     */
    listenEnterPressSearch(event: Event) {
        if ((event as KeyboardEvent).key === 'Enter') {
            this.listenSearchButtonClick();
        }
    }

    /**
     * Функция, обрабатывающая нажатие на всей странице и на кнопке Каталог в частности.
     * @param event - событие, вызвавшее функцию
     */
    listenClickForDropdown(event: Event) {
        this.catalogButton = document.getElementById('header__button-catalog');
        this.dropdownContent = document.getElementById('header__dropdown__content');

        if (this.catalogButton && this.dropdownContent) {
            if (event.target instanceof HTMLElement &&
                (event.target.id === this.catalogButton.id ||
                    event.target.parentElement?.id === this.catalogButton.id)) {
                this.dropdownContent.classList.add('header__dropdown__content-visible');
            } else {
                this.dropdownContent.classList.remove('header__dropdown__content-visible');
            }
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

        this.searchInput = document.getElementById('search-line__text') as HTMLInputElement;
        if (this.searchInput) {
            this.bindListenInputSearch = this.listenInputSearch.bind(this);
            this.searchInput.addEventListener('input', this.bindListenInputSearch);
            this.bindListenEnterPressSearch = this.listenEnterPressSearch.bind(this);
            this.searchInput.addEventListener('keypress', this.bindListenEnterPressSearch);
        }

        if (this.elementSuggestions) {
            this.bindListenSuggestSearch = this.listenSuggestSearch.bind(this);
            this.elementSuggestions.addEventListener('click', this.bindListenSuggestSearch);
        }

        if (config.HTMLskeleton.root) {
            config.HTMLskeleton.root.addEventListener('click', this.listenClickForDropdown);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
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
            this.searchInput?.removeEventListener('keypress', this.bindListenEnterPressSearch);
        }

        if (config.HTMLskeleton.root) {
            config.HTMLskeleton.root.removeEventListener('click', this.listenClickForDropdown);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param session - контекст отрисовки шаблона, содержащий информацию об авторизации
     */
    override render(session: boolean) {
        this._parent.innerHTML = '';
        super.render(this.prepareRenderData(session), headerTemplate);
        this.elementSuggestions = document.getElementById('search-suggestions__main');
        if (this.elementSuggestions) {
            this.suggestionsBlock = new SearchSuggestion(this.elementSuggestions);
        }
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns значение категории из контекста отрисовки
     */
    prepareRenderData(context: boolean) {
        return {
            session: context,
            categories: itemsStore.getContext(itemsStore._storeNames.topCategory),
            searchValue: (getQueryParams() as any).q ?? '',
        };
    }
}
