import HeaderComponent from './components/Header/Header.js';
import FooterComponent from './components/Footer/Footer.js';

const root = document.getElementById('root');
const page = document.createElement('div');
page.classList.add('page');
root.appendChild(page);

const headerElement = document.createElement('header');
const mainElement = document.createElement('main');
const footerElement = document.createElement('footer');
headerElement.classList.add('header');
mainElement.classList.add('paint-background');

page.appendChild(headerElement);
page.appendChild(mainElement);
page.appendChild(footerElement);

const config = {
    header: {
        main: {
            href: '/main',
            name: 'Главная',
            // render: renderMain,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            // render: renderLogin,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            // render: renderSignup,
        },
    },
};

window.addEventListener("DOMContentLoaded", () => {

    function renderHeader() {
        const header = new HeaderComponent(headerElement, config.header);
        header.render();
    }

    renderHeader();
    function renderFooter() {
        const footer = new FooterComponent(footerElement, config.header);
        footer.render();
    }

    renderFooter();
});
