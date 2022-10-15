import HeaderComponent from '../components/Header/Header.js';
import FooterComponent from '../components/Footer/Footer.js';

/**
 * Класс, реализующий перерендеринг элементов
 */
export default class RefreshEl {
    /**
     * Метод, реализующий создание тега с id
     * @param {string} tag - тег элемента для создания
     * @param {string} id - идентификатор тега
     * @return{HTMLElement} - элемент с тегом
     */
    createElementWithId(tag, id = tag) {
        const element = document.createElement(tag);
        element.id = id;
        return element;
    }

    /**
     * Создает каркас страницы
     * @param {HTMLElement} root - корневой элемент
     */
    constructor(root) {
        const page = document.createElement('div');
        page.classList.add('page');
        page.appendChild(this.createElementWithId('header'));
        page.appendChild(this.createElementWithId('main'));
        page.appendChild(this.createElementWithId('footer'));

        root.appendChild(page);
    }

    /**
     * Метод, реализующий перерендеринг компонента Header
     * @param {object} config - контекст отрисовки компонента
     */
    refreshHeader(config) {
        const header = document.getElementById('header');
        header.innerHTML = '';
        const headerComponent = new HeaderComponent(header);
        headerComponent.render(config.auth.authorised);
        config.auth.authorised ? headerComponent.startEventListener() :
            headerComponent.stopEventListener();
    };

    /**
     * Метод, реализующий перерендеринг компонента Footer
     */
    refreshFooter() {
        const footer = document.getElementById('footer');
        footer.innerHTML = '';
        const footerComponent = new FooterComponent(footer);
        footerComponent.render();
    };
}
