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
import itemsStore from '../../stores/ItemsStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            CartPageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.DELETE_ALL);
        cartStore.addListener(this.renderTotalCost.bind(this), CartActionTypes.DELETE_BY_ID);
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.MAKEORDER);
        userStore.addListener(this.getUserData, ProfileActionTypes.GET_DATA);
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
     * Функция, отрисовывающая корзину
     * @param {object} data - данные для заполнения
     */
    renderCart(data) {
        if (data) {
            const context = {};
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
                switch (context.paymentCard?.type) {
                case 'MIR':
                    context.paymentCard.type = mirIcon;
                    break;
                default:
                    break;
                }
            }
            context.isAuth = userStore.getContext(userStore._storeNames.isAuth);
            context.isAuth = true; // FIX
            if (context.isAuth) {
                context.avatar = userStore.getContext(userStore._storeNames.avatar) ?? null;
                context.username = userStore.getContext(userStore._storeNames.name) ?? null;
                context.phone = userStore.getContext(userStore._storeNames.phone) ?? null;
            }
            context.deliveryPrice = 'Бесплатно';
            context.deliveryDate = this.#getDate(1);

            // Подсчет итоговой стоимости товаров в корзине для отрисовки
            const [sumPrice, noSalePrice, priceDiff, count] =
                data.reduce((sumVal, key, it) => {
                    // sumPrice
                    sumVal[0] += (Number(key.lowprice) ?? Number(key.price)) *
                        key.count;
                    // noSalePrice
                    sumVal[1] += Number(key.price) * Number(key.count);
                    // priceDiff
                    sumVal[2] = sumVal[1] - sumVal[0];
                    // count
                    sumVal[3] += key.count;
                    return sumVal;
                }, [0, 0, 0, 0]).map((val) => {
                    return sharedFunctions._truncate(val);
                });
            context.sumPrice = sumPrice;
            context.noSalePrice = noSalePrice;
            context.priceDiff = priceDiff;
            context.count = count;
            super.render(context);
            const cartItem = new CartItem(document.getElementById('checkboxes_cart'));
            cartItem.render(data);
            this.startEventListener();
        } else {
            document.getElementById('main').innerHTML = `
            <div class="paint-background"></div>
            <div id="content-cart"
                <span class="text-normal-large-normal" 
                style="display:flex; justify-content: center;  align-items: center; height: 60vh">
                Корзина пуста. Случайно не нужен&nbsp
                <a href="${config.href.category}/phones" class="link">телефон</a>
                ?
                </span>
            </div>
            <div class="paint-background"></div>`;
        }
    }


    /**
     * Функция, обрабатывающая клики на данной странице
     */
    getUserData() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            break;
        case config.responseCodes.code401:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage();
            break;
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    async listenClickAddressAndPaymentCardBlock(event) {
        const target = event.target;
        let elementId = target.id;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId] = elementId.split('/');
            }
            switch (elementId) {
            case 'edit-address':
            case 'edit-payment-card':
                let context;
                let choiseItemId;
                if (elementId === 'edit-address') {
                    const choice = document.querySelector('.address_cart__main');
                    choiseItemId = choice.id;
                    context = {
                        address: userStore.getContext(userStore._storeNames.address),
                    };
                } else {
                    if (elementId === 'edit-payment-card') {
                        const choice = document.querySelector('.payment-method_cart');
                        choiseItemId = choice.id;
                        context = {
                            paymentCard: userStore.getContext(userStore._storeNames.paymentMethods),
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
                const choose = document.getElementById(choiseItemId);
                if (choose) {
                    choose.classList.add('choice');
                }
                break;
            case 'cart-popup-form__apply':
                event.preventDefault();
                const choice = document.querySelector('.choice');
                const data = choice.getAttribute('value');
                let choiseIdWithType = choice.id;
                let choiceId;
                if (choiseIdWithType) {
                    if (choiseIdWithType.includes('/')) {
                        [choiseIdWithType, choiceId] = choiseIdWithType.split('/');
                    }
                    switch (choiseIdWithType) {
                    case 'address':
                        const addressField = document.querySelector('.addressID');
                        addressField.textContent = data;
                        addressField.id = `address/${choiceId}`;
                        break;
                    case 'paymentCard':
                        console.log(data);
                        const cardNumber = document.querySelectorAll('.card-number');
                        if (cardNumber) {
                            cardNumber.forEach((key) => {
                                key.textContent = data;
                            });
                        }
                        // const cardExpiryDate = document.querySelectorAll(
                        //     '.payment-method_cart__expiry');
                        // if (cardExpiryDate) {
                        //     cardExpiryDate.forEach((key) => {
                        //         key.textContent = data.split(' ').slice(1).join(' ').trim();
                        //     });
                        // }
                        const choice = document.querySelectorAll('.payment-method_cart');
                        if (choice) {
                            choice.forEach((key) => {
                                key.setAttribute('id', `paymentCard/${choiceId}`);
                            });
                        }
                        document.getElementById('final-paymentmethod').textContent = 'Картой';
                        break;
                    case 'payment-upon-receipt':
                        const paymentReceipt = document.querySelectorAll('.card-number');
                        if (paymentReceipt) {
                            paymentReceipt.forEach((key) => {
                                key.textContent = data;
                            });
                        }
                        document.getElementById('final-paymentmethod').textContent = 'При получении';
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
                document.getElementById('date-delivery').textContent =
                    document.getElementById(`delivery-date-value/${itemId}`).textContent;
                break;
            case 'delivery-time':
                document.getElementById('time-delivery').textContent =
                    document.getElementById(`delivery-time-value/${itemId}`).textContent;
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
                const amountItem = document.getElementById(`count-product/${itemId}`);
                if (amountItem) {
                    const count = parseInt(amountItem.textContent);
                    if (count === 1) {
                        this.deleteItem(parseInt(itemId)); // удаление элемента из корзины
                    } else {
                        cartAction.decreaseNumber(parseInt(itemId));
                        amountItem.textContent = (count - 1).toString();
                        this.renderTotalCost();
                    }
                }
                break;
            case 'button-plus_cart':
                const itemAmount = document.getElementById(`count-product/${itemId}`);
                if (itemAmount) {
                    cartAction.increaseNumber(parseInt(itemId));
                    const count = parseInt(itemAmount.textContent);
                    itemAmount.textContent = (count + 1).toString();
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
                    const lowprice = sharedFunctions._parseInt(
                        document.getElementById(`price/${itemId}`).textContent);
                    let price = sharedFunctions._parseInt(
                        document.getElementById(`sale-price/${itemId}`).textContent);
                    const count = sharedFunctions._parseInt(
                        document.getElementById(`count-product/${itemId}`).textContent);
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
        const [sumPrice, noSalePrice, priceDiff, count] =
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
        productsNumber.textContent = 'Товары, ' + count + ' шт.';
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
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId] = elementId.split('/');
            }
            switch (elementId) {
            case 'item_cart__select-all':
                // Установка и снятие галочек у товаров
                const checkedItems = document.getElementsByName('itemCart');
                checkedItems.forEach((key) => {
                    key.checked = target.checked;
                });
                this.renderTotalCost();
                break;
            case 'item_cart__select':
                const selectAll = document.getElementById('item_cart__select-all');
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
        const checkedItems = document.getElementsByName('itemCart');
        if (checkedItems) {
            checkedItems.forEach((key) => {
                const itemId = key.id.split('/')[1];
                if (key.checked) {
                    orderData.items.push(
                        parseInt(itemId));
                }
            });
        } else {
            console.log('elements not found', checkedItems);
        }
        if (orderData.items.length) {
            const address = document.querySelector('.addressID');
            if (address) {
                orderData.address = parseInt(address.getAttribute('id')
                    .split('/', 2)[1]);
            } else {
                errorMessage.getAbsoluteErrorMessage('Выберите адрес');
            }
            let date = document.getElementById('date-delivery').textContent.trim();
            let time = document.getElementById('time-delivery').textContent.trim();
            date = date.split(' / ');
            time = time.split(' - ');
            orderData.deliveryDate = new Date(Date.UTC(date[2], date[1], date[0],
                (Number(time[1].split(':')[0]) + Number(time[0].split(':')[0])) / 2 % 24,
                0)).toJSON();

            orderData.card = parseInt(document.querySelector('.payment-method_cart')
                .id.split('/', 2)[1]);
            orderData.card = orderData.card ? orderData.card : null;
            cartAction.makeOrder(orderData);
        } else {
            errorMessage.getAbsoluteErrorMessage('Корзина пуста');
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
            productsContent.addEventListener('change', this.listenChangeCheckbox.bind(this));
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
            productsContent.removeEventListener('change', this.listenChangeCheckbox.bind(this));
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
     */
    render() {
        this.addListener();
        cartAction.getCart();
        profileAction.getData();
    }
}
