import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';

const root = document.getElementById('root');

const renderLoginPage = (context) => {
    const loginPage = new LoginPage(root);
    loginPage.render(context);
}

const renderMainPage = (context) => {
    const mainPage = new MainPage(root);
    mainPage.render(context);
}

const renderRegisterPage = (context) => {
    const registerPage = new RegisterPage(root);
    registerPage.render(context);
}

const config = {
    header: {
        main: {
            href: '/main',
            name: 'Главная',
            render: renderMainPage,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderLoginPage,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderRegisterPage,
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

const getErrorMessage = (target) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.appendChild(span);
    div.classList.add('input-field-error');
    span.classList.add('input-field-error__text');
    span.innerHTML = "Wrong password";
    target.after(div);
}

const createProfileIconListener = () => {
    const profileIcon = root.querySelector(`.header__profile`);
    profileIcon.addEventListener('mouseover', getProfileIconListenerHandler)
}

const getProfileIconListenerHandler = async (event) => {
    const {target} = event;

    console.log(target);
}

root.addEventListener('click', async (event) => {
    const {target} = event;

    if (root.querySelector(`[name=password]`) != null) {
        //getErrorMessage(target);
        //target.style.transform='scaleX(2)';
    }

    let href = target.getAttribute("href");
    if (href === null) {
        href = target.parentElement.getAttribute("href");
    }

    Object.keys(config.header).forEach(function (page) {
        if (config.header[page].href === href) {
            event.preventDefault();
            root.querySelector(`.header__profile`).
            removeEventListener('mouseover', getProfileIconListenerHandler);

            config.header[page].render(config)

            createProfileIconListener();
        }
    });
});

//config.header.main.render(config);
config.header.login.render(config);
createProfileIconListener();