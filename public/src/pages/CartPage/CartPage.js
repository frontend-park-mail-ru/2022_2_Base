import СartPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage.js';
import CartItem from '../../components/CartItem/CartItem.js';
import request from '../../modules/ajax.js';
import validation from '../../modules/validation.js';
import errorMessage from '../../modules/ErrorMessage.js';
import router from '../../modules/Router.js';
import './CartPage.scss';
import mirIcon from '../../../img/mir-pay.png';
import sharedFunctions from '../../modules/sharedFunctions.js';
import PopUpChooseAddressAndPaymentCard
    from '../../components/PopUpChooseAddressAndPaymentCard/PopUpChooseAddressAndPaymentCard.js';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    #item = {
        item1: {
            title: `Apple iPhone 13 64 ГБ \\r
            gladwehaveanunderstanding, fuck out the way
yeah, all your shit lame, I feel no pain, we" "\\eof`,
            img: './img/Smartphone.png',
            vendor: 'OOO-iPhones-RUS',
            favourite: true,
            amount: 55,
            price: 123,
            salePrice: null,
            id: 1,
            vendorID: 1,
        },
        item2: {
            title: `Apple iPhone 13 64 ГБ \\r
            gladwehaveanunderstanding, fuck out the way
yeah, all your shit lame, I feel no pain, we" "\\eof`,
            img: './img/Smartphone.png',
            vendor: 'OOO-iPhones-RUS',
            favourite: true,
            amount: 55,
            price: 2000,
            salePrice: 1001,
            checked: true,
            id: '12asdaf231231',
            vendorID: '282374asdas823',
        },
    };

    #data = {
        addressID: 1,
        address: `Республика , ул. Территория, изъятая из земель подсобного хозяйства Всесоюзного
         центрального совета профессиональных союзов для организации крестьянского хозяйства`,
        deliveryPrice: null,
        date: new Date('2022-11-25'),
        paymentMethodProvider: mirIcon,
        avatar: './img/Smartphone.png',
        username: 'Джахар',
        phone: '+7 (872) 234-23-65',
        deliveryDate: this.#getDate(1),
        cardNumber: '123456******1234',
        cardExpiryDate: '09 / 27',
    };

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            СartPageTemplate,
        );
    }

    /**
     * Функция для передачи в слушателе click на значок создания заказа
     */
    async listenClickCreateOrder() {
        const orderData = {
            itemsCart: {

            },
        };

        let index = 1;
        const itemsInCart = document.querySelectorAll('.cart-item_cart');
        if (itemsInCart) {
            itemsInCart.forEach((item) => {
                const itemInCartId = item.querySelector('.cart-item_cart__id').getAttribute('id');
                const itemInCartAmount = item.querySelector('.amount-product').getAttribute('id');
                orderData.itemsCart[index] = {
                    id: itemInCartId,
                    amount: itemInCartAmount,
                };
                index++;
            });
        } else {
            console.log('element not found', itemsInCart);
        }

        const addressID = document.querySelector('.addressID').getAttribute('id');
        orderData.addressID = addressID;
        orderData.dateDelivery = document.getElementById('date-delivery').innerHTML;
        orderData.timeDelivery = document.getElementById('time-delivery').innerHTML;
        orderData.paymentCardId = document.querySelector('.card-id').getAttribute('id');
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    listenClickHandler(event) {
        event.preventDefault();
        const target = event.target;
        const elementId = target.id;
        if (elementId) {
            
            switch (elementId) {
                case 'edit-address':
                case 'edit-payment-card':
                    let context;
                    if (elementId === 'edit-address') {
                        // Загрузить адреса
                        context = {
                            address: {
                                address1: {
                                    id: 1111,
                                    city: 'Москва',
                                    street: 'Ленина',
                                    house: 5,
                                    flat: 34,
                                },
                                address2: {
                                    id: 222222,
                                    city: 'Москва',
                                    street: 'Ленина',
                                    house: 5,
                                    flat: 34,
                                },
                                // address3: {
                                //     id: 3,
                                //     city: 'Москва',
                                //     street: 'Ленина',
                                //     house: 5,
                                //     flat: 34,
                                // },
                            },
                        };
                    } else {
                        if (elementId === 'edit-payment-card') {
                            // Загрузить банковские карты
                            context = {
                                paymentCard: {
                                    paymentCard1: {
                                        id: 1,
                                        number: '1234567812345678',
                                        code: 910,
                                        month: 5,
                                        year: 24,
                                    },
                                    paymentCard2: {
                                        id: 2,
                                        number: '1234567812345678',
                                        code: 910,
                                        month: 5,
                                        year: 24,
                                    },
                                    paymentCard3: {
                                        id: 3,
                                        number: '1234567812345678',
                                        code: 910,
                                        month: 5,
                                        year: 24,
                                    },
                                },
                            };
                        }
                    }

                    const PopUp = document.getElementById('popUp');
                    const PopUpFade = document.getElementById('popUp-fade');
                    if (PopUp) {
                        PopUp.style.display = 'block';
                    }
                    if (PopUpFade) {
                        PopUpFade.style.display = 'block';
                    }
                    this.PopUpChooseAddressAndPaymentCard = new PopUpChooseAddressAndPaymentCard(PopUp);
                    this.PopUpChooseAddressAndPaymentCard.render(context);
                    break;
                case 'empty-cart':
                    // вызов action для очищения корзины
                    break;
                case 'delete-cart-item':
                    // удалить элемент из корзины по elementId
                    break;
                case 'cart-popup-form__apply':
                    const choice = document.querySelector('.choice');
                    const data = choice.getAttribute('value');
                    const choiseIdWithType = choice.getAttribute('id');
                    let type, choiceId = '';
                    if (choiseIdWithType.includes('/')) {
                        [type, choiceId] = choiseIdWithType.split('/');
                        console.log(type)
                        if (type === 'address') {
                            const addressField = document.querySelector('.addressID');
                            addressField.textContent = data;
                        } else {
                            const addressField = document.querySelector('.addressID');
                            addressField.textContent = data;
                        }
                    }
                    // По этому id нужно перерисовать элемент
                    const popUp = document.getElementById('popUp');
                    const popUpFade = document.getElementById('popUp-fade');
                    if (popUp) {
                        popUp.style.display = 'none';
                        popUp.replaceChildren();
                    }
                    if (popUpFade) {
                        popUpFade.style.display = 'none';
                    }
                    break;
                default:
                    // console.log(elementId)

            }
        }
    }

    // renderPage(context){
    //     switch (context.type) {
    //         case 'itemCart':
    //             const CartItem = new CartItem(document.getElementById('checkboxes_cart'));
    //             CartItem.render(context.value);
    //     }
    // }
 
    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cartContent = document.getElementById("cart");
        if(cartContent) {
            cartContent.addEventListener('click', this.listenClickHandler);
        }

        const createOrder = document.getElementById('summary_cart__create-order-button');
        if (createOrder) {
            createOrder.addEventListener('click', this.listenClickCreateOrder);
        } else {
            console.log('element not found', createOrder);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cartContent = document.getElementById("content_cart");
        if(cartContent) {
            cartContent.removeEventListener('click', this.listenClickHandler);
        }
    }

    /**
     * Функция, возвращающая завтрашнюю дату.
     * @param {int} firstDayIn сколько дней пропустить, считая от сегодняшнего
     * @return {object} завтрашняя дата
     */
    #getDate(firstDayIn) {
        const getDate = (next) => {
            const currDate = new Date(new Date().getTime() + next * 24 * 60 * 60 * 1000);
            return `${currDate.getDate()} / ${currDate.getMonth()} / ${currDate.getFullYear()}`;
        };
        return Array.from(Array(7).keys()).map((inDays) => getDate(inDays + firstDayIn));
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        this.#data.deliveryPrice = this.#data.deliveryPrice ?
            this.#data.deliveryPrice + ' ₽' : 'Бесплатно';
        this.#data.auth = true; // config.auth.authorised;

        [this.#data.sumPrice, this.#data.noSalePrice, this.#data.priceDiff, this.#data.amount] =
            Object.keys(this.#item).reduce((sumVal, key, it) => {
                // sumPrice
                sumVal[0] += (this.#item[key].salePrice ?? this.#item[key].price);
                // noSalePrice
                sumVal[1] += this.#item[key].price;
                // priceDiff
                sumVal[2] = sumVal[1] - sumVal[0];
                // amount
                sumVal[3] = it + 1;
                return sumVal;
            }, [0, 0, 0, 0]).map((val) => {
                return sharedFunctions._truncate(val);
            });
        super.render(this.#data);

        this.CartItem = new CartItem(document.getElementById('checkboxes_cart'));
        this.CartItem.render(this.#item);
        this.startEventListener();
    }
}
