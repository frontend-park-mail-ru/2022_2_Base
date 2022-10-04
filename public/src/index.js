// import HeaderComponent from './components/Header/Header.js';
// import FooterComponent from './components/Footer/Footer.js';
// import TopCategory from './components/TopCategory/TopCategory.js';
// import ItemCardComponent from './components/ItemCard/ItemCard.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';

const root = document.getElementById('root');

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
    itemCardsSales: {
        salesCard1: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        salesCard2: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        salesCard3: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        salesCard4: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        salesCard5: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        salesCard6: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
    },
    itemCardsPopular: {
        popularCard1: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        popularCard2: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        popularCard3: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        popularCard4: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        popularCard5: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
        popularCard6: {
            salePrice: 505169,
            price: 420420,
            cardTitle: "iPhone 13 64Gb",
            rating: "2.3",
        },
    },
    topcategory: {
        Smartphone: {
            nameCategory: 'Телефоны',
            img: './img/Smartphone.png',
        },
        Computer: {
            nameCategory: 'Компьютеры',
            img: './img/Computer.png',
        },
        Headphones: {
            nameCategory: 'Наушники',
            img: './img/Headphones.png',
        },
        TV: {
            nameCategory: 'Телевизоры',
            img: './img/TV.png',
        },
        Watch: {
            nameCategory: 'Часы',
            img: './img/Watch.png',
        },
        Tablet: {
            nameCategory: 'Планшеты',
            img: './img/Tablet.png',
        },
        Accessories: {
            nameCategory: 'Аксессуары',
            img: './img/Accessories.png',
        },
    },
    forms: {
        signin: {
            fields: {
                email: {
                    title: 'Почта',
                    type: 'email',
                    name: 'email',
                    placeholder: 'mail@website.com',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Введите пароль',
                    maxlenght: '16',
                },
            },
            button: {
                buttonValue: 'Войти',
            },
        },
        signup: {
            fields: {
                name: {
                    title: 'Имя',
                    type: 'text',
                    name: 'name',
                    placeholder: 'Введите имя',
                    maxlenght: '30',
                },
                email: {
                    title: 'Почта',
                    type: 'email',
                    name: 'email',
                    placeholder: 'mail@website.com',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Придумайте пароль',
                    maxlenght: '16',
                },
                repeatPassword: {
                    title: 'Повторить пароль',
                    type: 'password',
                    name: 'repeat_password',
                    placeholder: 'Повторите пароль',
                    maxlenght: '16',
                },
            },
            button: {
                buttonValue: 'Зарегистрироваться',
            },
        },
    },
};


// function renderHeader() {
//     const header = new HeaderComponent(headerElement, config.header);
//     header.render();
// }

// function renderFooter() {
//     const footer = new FooterComponent(footerElement, config.header);
//     footer.render();
// }

// function renderTopCategory(topcategory) {
//     const topCategory = new TopCategory(content, config.header);
//     topCategory.render(topcategory);
// }

// function renderItemCard() {
//     const itemCard = new ItemCardComponent(content, config.itemCard);
//     itemCard.render();
// }

function renderLoginPage(context) {
    const loginPage = new LoginPage(root);
    loginPage.render(context);
}

function renderMainPage(context) {
    const mainPage = new MainPage(root);
    mainPage.render(context);
}

function renderRegisterPage(context) {
    const registerPage = new RegisterPage(root);
    registerPage.render(context);
}

window.addEventListener("DOMContentLoaded", () => {

    // renderHeader();
    // renderLoginPage(config.forms.signin);
    renderMainPage(config);
    // renderRegisterPage(config.forms.signup);
    // renderTopCategory(config.topcategory);
    // renderItemCard();
    // renderFooter();
});
