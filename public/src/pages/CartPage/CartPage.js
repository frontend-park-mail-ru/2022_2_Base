import CartPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage.js';
import CartItem from '../../components/CartItem/CartItem.js';
import './CartPage.scss';
import mirIcon from '../../../img/mir-pay.png';
import sharedFunctions from '../../modules/sharedFunctions.js';
import PopUpChooseAddressAndPaymentCard
    from '../../components/PopUpChooseAddressAndPaymentCard/PopUpChooseAddressAndPaymentCard.js';
import cartStore from '../../stores/CartStore.js';
import userStore from '../../stores/UserStrore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';
import {profileAction, ProfileActionTypes} from '../../actions/profile.js';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    // #data = {
    //     addressID: 1111,
    //     city: 'Москва',
    //     street: 'Мира',
    //     house: 15,
    //     flat: 4,
    //     deliveryPrice: 'Бесплатно',

    //     date: new Date('2022-11-25'),

    //     paymentMethodProvider: mirIcon,

    //     avatar: './img/Smartphone.png',
    //     username: 'Джахар',
    //     phone: '+7 (872) 234-23-65',

    //     deliveryDate: this.#getDate(1),
    //     // deliveryTime: '18:00 - 23:00',
    //     cardNumber: '8765432143212546',
    //     cardExpiryDate: '05 / 24',
    //     paymentCardId: 1,
    // };

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
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.DELETE_ALL);
        cartStore.addListener(this.renderTotalCost.bind(this), CartActionTypes.DELETE_BY_ID);
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.MAKEORDER);
    }

    /**
     * Функция, вызывающая action функцию отрисовки при удалении товара
     * @param {number} id - id удаленного товара
     */
    deleteItem(id) {
        cartAction.deleteById(id);
        const deleteElement = document.getElementById(`cart-item_cart/${id}`);
        deleteElement.remove();
        this.renderTotalCost();
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
        let context = {};
        const address = userStore.getContext(userStore._storeNames.address);
        if (address) {
            Object.values(address).forEach((key) => {
                if (key.priority) {
                    context.address = key;
                }
            });
        }
        const paymentCards = userStore.getContext(userStore._storeNames.paymentMethods);
        if (paymentCards) {
            Object.values(paymentCards).forEach((key) => {
                if (key.priority) {
                    context.paymentCard = key;
                }
            });
            if (context.paymentCard.type === 'MIR') {
                context.paymentCard.type = mirIcon;
            }
        }
        context.isAuth = userStore.getContext(userStore._storeNames.isAuth);
        context.isAuth = true // FIX
        if (context.isAuth) {
            context.avatar = userStore.getContext(userStore._storeNames.avatar);
            context.username = userStore.getContext(userStore._storeNames.name) + userStore.getContext(userStore._storeNames.surname);
            context.phone = userStore.getContext(userStore._storeNames.phone);
        }
        context.deliveryPrice = 'Бесплатно';
        context.deliveryDate = this.#getDate(1);

        // Подсчет итоговой стоимости товаров в корзине для отрисовки
        let [sumPrice, noSalePrice, priceDiff, amount] =
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
        context.sumPrice = sumPrice;
        context.noSalePrice = noSalePrice;
        context.priceDiff = priceDiff;
        context.amount = amount;
        super.render(context);
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
                    context = {
                        address: userStore.getContext(userStore._storeNames.address),
                    }
                } else {
                    if (elementId === 'edit-payment-card') {
                        const choice = Array.from(document.getElementsByClassName('payment-method_cart'))[0];
                        choiseItemId = choice.getAttribute('id');

                        context = {
                            paymentCard: userStore.getContext(userStore._storeNames.paymentMethods),
                        }
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
                const choose = document.getElementById(choiseItemId);
                if (choose) {
                    choose.style.border = '1px solid #6369D1';
                    choose.classList.add('choice');
                }
                break;
            case 'cart-popup-form__apply':
                event.preventDefault();
                const choice = document.querySelector('.choice');
                const data = choice.getAttribute('value');
                let choiseIdWithType = choice.getAttribute('id');
                let choiceId;
                if (choiseIdWithType) {
                    if (choiseIdWithType.includes('/')) {
                        [choiseIdWithType, choiceId] = choiseIdWithType.split('/');
                    }
                    switch (choiseIdWithType) {
                        case 'address':
                            const addressField = document.querySelector('.addressID');
                            addressField.textContent = data;
                            addressField.setAttribute('id', `address/${choiceId}`);
                            break;
                        case 'paymentCard':
                            const cardType = document.querySelectorAll('.payment-method-provider');
                            if (cardType) {
                                cardType.forEach((key) => {
                                    key.style.display = 'block';
                                });
                            }
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
                                    key.style.display = 'block';
                                    key.textContent = data.split(' ').slice(1).join(' ').trim();
                                });
                            }
                            const choice = document.querySelectorAll('.payment-method_cart');
                            if (choice) {
                                choice.forEach((key) => {
                                    key.setAttribute('id', `paymentCard/${choiceId}`);
                                });
                            }
                            document.getElementById('final-paymentmethod').textContent = 'Картой'
                            break;
                        case 'payment-upon-receipt':
                            const paymentReceipt = document.querySelectorAll('.card-number');
                            if (paymentReceipt) {
                                paymentReceipt.forEach((key) => {
                                    key.textContent = data;
                                });
                            }
                            const expiryDate = document.querySelectorAll(
                                '.payment-method_cart__expiry');
                            if (expiryDate) {
                                expiryDate.forEach((key) => {
                                    key.style.display = 'none';
                                });
                            }
                            const typeCard = document.querySelectorAll('.payment-method-provider');
                            if (typeCard) {
                                typeCard.forEach((key) => {
                                    key.style.display = 'none';
                                });
                            }
                            const choiceMethtod = document.querySelectorAll('.payment-method_cart');
                            if (choiceMethtod) {
                                choiceMethtod.forEach((key) => {
                                    key.setAttribute('id', 'payment-upon-receipt');
                                });
                            }
                            document.getElementById('final-paymentmethod').textContent = 'При получении'
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
            }
        }
    }

    /**
     * Функция, обрабатывающая выбор даты и времени доставки
     * @param {Event} event контекст события для обработки
     */
    async listenChangeDateAndTime(event) {
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
            }
            switch (elementId) {
                case 'delivery-date':
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
                    break;
                case 'delete-cart-item':
                    this.deleteItem(parseInt(itemId));
                    break;
                case 'button-minus_cart':
                    const amountItem = document.getElementById(`amount-product/${itemId}`);
                    if (amountItem) {
                        const amount = parseInt(amountItem.textContent);
                        if (amount === 1) {
                            this.deleteItem(parseInt(itemId)); // удаление элемента из корзины
                        } else {
                            cartAction.decreaseNumber(parseInt(itemId));
                            amountItem.textContent = (amount - 1).toString();
                            this.renderTotalCost();
                        }
                    }
                    break;
                case 'button-plus_cart':
                    const itemAmount = document.getElementById(`amount-product/${itemId}`);
                    if (itemAmount) {
                        cartAction.increaseNumber(parseInt(itemId));
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
        const chackedItems = document.getElementsByName('itemCart');
        if (chackedItems) {
            chackedItems.forEach((key) => {
                const itemId = key.getAttribute('id').split('/')[1];
                if (key.checked) {
                    orderData.items.push(
                       parseInt(itemId));
                }
            });
        } else {
            console.log('elements not found', chackedItems);
        }
        if (orderData.items.length === 0) {
            console.log("Выберите товары для заказа") 
            // Выводить попап
        } else {
            const addressID = parseInt(document.getElementsByClassName('addressID')[0].getAttribute(
                'id').split('/', 2)[1]);
            orderData.addressid = addressID;
            orderData.datedelivery = document.getElementById('date-delivery').textContent.trim();
            orderData.timedelivery = document.getElementById('time-delivery').textContent.trim();
            orderData.paymentcardid = parseInt(document.getElementsByClassName('payment-method_cart')[0]
                .getAttribute('id').split('/', 2)[1]);
            cartAction.makeOrder(orderData);
        }
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

        const cartContent = document.getElementById('cart');
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
        // profileAction.getData();
        cartAction.getCart();
    }
}
