import HeaderComponent from './components/Header/Header.js';

const root = document.getElementById('root');
const page = document.createElement('div');
page.classList.add('page');
root.appendChild(page);

const headerElement = document.createElement('header');
const mainElement = document.createElement('main');
headerElement.classList.add('header');
mainElement.classList.add('paint-background');

page.appendChild(headerElement);
page.appendChild(mainElement);

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
        const header = new HeaderComponent(headerElement);
        header.items = config.header;
        header.render();
    }

    renderHeader();
});
