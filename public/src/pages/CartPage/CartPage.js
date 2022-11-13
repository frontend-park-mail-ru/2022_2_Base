import CartPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage.js';
import CartItem from '../../components/CartItem/CartItem.js';
import './CartPage.scss';
import mirIcon from '../../../img/mir-pay.png';
import sharedFunctions from '../../modules/sharedFunctions.js';
import PopUpChooseAddressAndPaymentCard
    from '../../components/PopUpChooseAddressAndPaymentCard/PopUpChooseAddressAndPaymentCard.js';
import cartStore from '../../stores/CartStore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    #data = {
        addressID: 1111,
        city: 'Москва',
        street: 'Мира',
        house: 15,
        flat: 4,
        address: `Республика , ул. Территория, изъятая из земель подсобного хозяйства Всесоюзного
         центрального совета профессиональных союзов для организации крестьянского хозяйства`,
        deliveryPrice: 'Бесплатно',
        date: new Date('2022-11-25'),
        paymentMethodProvider: mirIcon,
        avatar: './img/Smartphone.png',
        username: 'Джахар',
        phone: '+7 (872) 234-23-65',
        deliveryDate: this.#getDate(1),
        deliveryTime: '18:00 - 23:00',
        cardNumber: '8765432143212546',
        cardExpiryDate: '05 / 24',
        paymentCardId: 1,
    };

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            CartPageTemplate,
        );
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
        cartStore.addListener(this.deleteItem.bind(
            this, cartStore.getContext(cartStore._storeNames.itemsCart)),
        CartActionTypes.DELETE_BY_ID);
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.DELETE_ALL);
    }

    /**
     * Функция, вызывающая функцию отрисовки при удалении товара
     * @param {object} data - данные для заполнения
     */
    deleteItem(data) {
        data.forEach((key) => {
            key.count = parseInt(document.getElementById(`amount-product/${key.item.id}`).textContent);
        });
        this.renderCart(data);
    }

    /**
     * Функция, делающая запрос за товарами корзины, адресами и картами и загружающая их
     */
    getCart() {
        this.renderCart(cartStore.getContext(cartStore._storeNames.itemsCart));
    }

    /**
     * Функция, отрисовывающая карзину
     * @param {object} data - данные для заполнения
     */
    renderCart(data) {
        this.#data.auth = true; // config.auth.authorised;

        // Подсчет итоговой стоимости товаров в корзине для отрисовки
        [this.#data.sumPrice, this.#data.noSalePrice, this.#data.priceDiff, this.#data.amount] =
            data.reduce((sumVal, key, it) => {
                // sumPrice
                sumVal[0] += (key.item.lowprice ?? key.item.price) *
                key.count;
                // noSalePrice
                sumVal[1] += key.item.price * key.count;
                // priceDiff
                sumVal[2] = sumVal[1] - sumVal[0];
                // amount
                sumVal[3] += key.count;
                return sumVal;
            }, [0, 0, 0, 0]).map((val) => {
                return sharedFunctions._truncate(val);
            });
        super.render(this.#data);
        const cartItem = new CartItem(document.getElementById('checkboxes_cart'));
        cartItem.render(data);
        this.startEventListener();
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    async listenClickAddressAndPaymentCardBlock(event) {
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
            }
            switch (elementId) {
            case 'edit-address':
            case 'edit-payment-card':
                let context;
                let choiseItemId;
                if (elementId === 'edit-address') {
                    const choice = Array.from(document.getElementsByClassName('addressID'))[0];
                    choiseItemId = choice.getAttribute('id');

                    // Загрузить адреса
                    context = {
                        address: {
                            address1: {
                                id: 1111,
                                city: 'Москва',
                                street: 'Мира',
                                house: 15,
                                flat: 4,
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
                        const choice = Array.from(document.getElementsByClassName('payment-method_cart'))[0];
                        choiseItemId = choice.getAttribute('id');

                        // Загрузить банковские карты
                        context = {
                            paymentCard: {
                                paymentCard1: {
                                    id: 1,
                                    cardNumber: '8765432143212546',
                                    code: 910,
                                    cardExpiryDate: '05 / 24',
                                },
                                paymentCard2: {
                                    id: 2,
                                    cardNumber: '1234567812345678',
                                    code: 910,
                                    cardExpiryDate: '06 / 23',
                                },
                                paymentCard3: {
                                    id: 3,
                                    cardNumber: '1694257931658879',
                                    code: 910,
                                    cardExpiryDate: '12 / 25',
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
                const chooseAddress = document.getElementById(choiseItemId);
                if (chooseAddress) {
                    chooseAddress.style.border = '1px solid #6369D1';
                    chooseAddress.classList.add('choice');
                }
                break;
            case 'cart-popup-form__apply':
                console.log(event)
                event.preventDefault();
                const choice = document.querySelector('.choice');
                const data = choice.getAttribute('value');
                const choiseIdWithType = choice.getAttribute('id');
                let type;
                let choiceId;
                if (choiseIdWithType.includes('/')) {
                    [type, choiceId] = choiseIdWithType.split('/');
                    if (type === 'address') {
                        const addressField = document.querySelector('.addressID');
                        addressField.textContent = data;
                        addressField.setAttribute('id', `address/${choiceId}`);
                    } else {
                        const cardNumber = document.querySelectorAll('.card-number');
                        if (cardNumber) {
                            cardNumber.forEach((key) => {
                                key.textContent = data.split(' ', 1);
                            });
                        }
                        const cardExpiryDate = document.querySelectorAll(
                            '.payment-method_cart__expiry');
                        if (cardExpiryDate) {
                            cardExpiryDate.forEach((key) => {
                                key.textContent = data.split(' ').slice(1).join(' ').trim();
                            });
                        }
                        const choice = document.querySelectorAll('.payment-method_cart');
                        if (choice) {
                            choice.forEach((key) => {
                                key.setAttribute('id', `paymentCard/${choiceId}`);
                            });
                        }
                    }
                }
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
                console.log(elementId);
            }
        }
    }

    /**
     * Функция, обрабатывающая выбор даты и времени доставки
     * @param {Event} event контекст события для обработки
     */
    async listenChangeDateAndTime(event) {
        const target = event.target;
        console.log(target)
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
            }
            switch (elementId) {
                case 'delivery-date':
                    console.log('hi')
                    document.getElementById('date-delivery').textContent = document.getElementById(`delivery-date-value/${itemId}`).textContent;
                    break;
                case 'delivery-time':
                    document.getElementById('time-delivery').textContent = document.getElementById(`delivery-time-value/${itemId}`).textContent;
                    break;
            }
        }
    }

    /**
     * Функция, обрабатывающая клики в блоке товаров
     * @param {Event} event контекст события для обработки
     */
    async listenClickProductsBlock(event) {
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
            }
            switch (elementId) {
                case 'empty-cart':
                    cartAction.deleteAll();
                    // вызов action для очищения корзины  и перерисовать итого в корзине
                    break;
                case 'delete-cart-item':
                    cartAction.deleteById(parseInt(itemId));
                    break;
                case 'button-minus_cart':
                    const amountItem = document.getElementById(`amount-product/${itemId}`);
                    if (amountItem) {
                        const amount = parseInt(amountItem.textContent);
                        if (amount === 1) {
                            cartAction.deleteById(parseInt(itemId)); // удаление элемента из корзины
                        } else {
                            amountItem.textContent = (amount - 1).toString();
                            this.renderTotalCost();
                        }
                    }
                    break;
                case 'button-plus_cart':
                    const itemAmount = document.getElementById(`amount-product/${itemId}`);
                    if (itemAmount) {
                        const amount = parseInt(itemAmount.textContent);
                        itemAmount.textContent = (amount + 1).toString();
                        this.renderTotalCost();
                    }
                    break;
            }
        }
    }

    /**
     * Функция, перерисовывающая итоговую стоимость
     */
    renderTotalCost() {
        const data = [];
        const itemsCart = document.getElementsByClassName('cart-item_cart');
        if (itemsCart) {
            Array.from(itemsCart).forEach((child) => {
                const check = child.getElementsByClassName('checkbox-opt')[0];
                const itemId = check.getAttribute('id').split('/')[1];
                if (check.checked) {
                    const lowprice = sharedFunctions._parseInt(document.getElementById(`price/${itemId}`).textContent);
                    let price = sharedFunctions._parseInt(document.getElementById(`sale-price/${itemId}`).textContent);
                    const count = sharedFunctions._parseInt(document.getElementById(`amount-product/${itemId}`).textContent);
                    if (isNaN(price)) {
                        price = lowprice;
                    }
                    data.push({
                        lowprice: lowprice,
                        price: price,
                        count: count,
                    });
                }
            });
        }
        console.log(data)
        // Подсчет итоговой стоимости товаров в корзине для отрисовки
        let [sumPrice, noSalePrice, priceDiff, count] =
            data.reduce((sumVal, key, it) => {
                // sumPrice
                sumVal[0] += (key.lowprice ?? key.price) *
                key.count;
                // noSalePrice
                sumVal[1] += key.price * key.count;
                // priceDiff
                sumVal[2] = sumVal[1] - sumVal[0];
                // coount
                sumVal[3] += key.count;
                return sumVal;
            }, [0, 0, 0, 0]).map((val) => {
                return sharedFunctions._truncate(val);
            });
        // Изменение итоговых сумм
        const totalPrice = document.getElementById('total-price');
        totalPrice.textContent = sumPrice + ' ₽';
        const productsNumber = document.getElementById('products-number');
        productsNumber.textContent = 'Товары, ' + count  + ' шт.';
        const priceWithoutDiscount = document.getElementById('price-without-discount');
        priceWithoutDiscount.textContent = noSalePrice + ' ₽';
        const discount = document.getElementById('discount');
        discount.textContent = priceDiff + ' ₽';
    }

    /**
     * Функция, обрабатывающая событие change в блоке товаров
     * @param {Event} event контекст события для обработки
     */
    async listenChangeCheckbox(event) {
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
            }
            switch (elementId) {
                case 'item_cart__select-all':
                    // Установка и снятие галочек у товаров
                    const chackedItems = document.getElementsByName('itemCart');
                    chackedItems.forEach((key) => {
                        key.checked = target.checked;
                    });
                    this.renderTotalCost();
                    break;
                case 'item_cart__select':
                    const selectAll = document.getElementById('item_cart__select-all')
                    if (!target.checked) {
                        // Снятие галочки выбрать все
                        selectAll.checked = false;
                    } else {
                        // Установление галочки выбрать все
                        const selectItems = document.getElementsByName('itemCart');
                        if ([...selectItems].every((key) => {
                            return key.checked;
                        })) {
                            selectAll.checked = true;
                        }
                    }
                    this.renderTotalCost();
                    break;
            }
        }
    }

    /**
     * Функция, обрабатывающая клик на кнопку создания заказа
     */
    async listenClickCreateOrder() {
        const orderData = {
            items: [

            ],
        };
        const itemsInCart = document.querySelectorAll('.cart-item_cart__id');
        if (itemsInCart) {
            itemsInCart.forEach((item) => {
                const itemInCartId = item.getAttribute('id');
                const itemInCartCount = parseInt(document.getElementById(
                    `amount-product/${itemInCartId}`).textContent);
                orderData.items.push({
                    id: itemInCartId,
                    amount: itemInCartCount,
                });
            });
        } else {
            console.log('element not found', itemsInCart);
        }
        const addressID = parseInt(document.querySelector('.addressID').getAttribute(
            'id').split('/', 2)[1]);
        orderData.addressID = addressID;
        orderData.dateDelivery = document.getElementById('date-delivery').textContent;
        orderData.timeDelivery = document.getElementById('time-delivery').textContent;
        orderData.paymentCardId = parseInt(document.querySelector('.payment-method_cart')
            .getAttribute('id').split('/', 2)[1]);
        // нужно передавать данные из orderData на сервер для оформления заказа
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        // Обработчик блока товаров
        const productsContent = document.getElementById('block-products');
        if (productsContent) {
            productsContent.addEventListener('click', this.listenClickProductsBlock.bind(this));
            productsContent.addEventListener('change',this.listenChangeCheckbox.bind(this));
        }

        // Обработчик создания заказа
        const createOrder = document.getElementById('summary_cart__create-order-button');
        if (createOrder) {
            createOrder.addEventListener('click', this.listenClickCreateOrder);
        }

        const cartContent = document.getElementById('content_cart');
        if (cartContent) {
            cartContent.addEventListener('click', this.listenClickAddressAndPaymentCardBlock);
        }

        const addressCart = document.getElementById('address-cart');
        if (addressCart) {
            addressCart.addEventListener('change', this.listenChangeDateAndTime);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const productsContent = document.getElementById('block-products');
        if (productsContent) {
            productsContent.removeEventListener('click', this.listenClickProductsBlock.bind(this));
            productsContent.removeEventListener('change',this.listenChangeCheckbox.bind(this));
        }

        const createOrder = document.getElementById('summary_cart__create-order-button');
        if (createOrder) {
            createOrder.removeEventListener('click', this.listenClickCreateOrder);
        }

        const cartContent = document.getElementById('content_cart');
        if (cartContent) {
            cartContent.removeEventListener('click', this.listenClickAddressAndPaymentCardBlock);
        }

        const addressCart = document.getElementById('address-cart');
        if (addressCart) {
            addressCart.removeEventListener('change', this.listenChangeDateAndTime);
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
        cartAction.getCart();
    }
}
