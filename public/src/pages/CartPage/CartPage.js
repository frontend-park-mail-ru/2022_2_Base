import CartPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage';
import CartItem from '../../components/CartItem/CartItem';
import './CartPage.scss';
import PopUpChooseAddressAndPaymentCard
    from '../../components/PopUpChooseAddressAndPaymentCard/PopUpChooseAddressAndPaymentCard';
import cartStore from '../../stores/CartStore';
import userStore from '../../stores/UserStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import {profileAction, ProfileActionTypes} from '../../actions/profile';
import itemsStore from '../../stores/ItemsStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';
import router from '../../modules/Router';
import {getDate, parseIntInPrice, truncatePrice} from '../../modules/sharedFunctions';
import refreshElements from '../../modules/refreshElements';

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
        cartStore.addListener(this.onMakeOrder.bind(this), CartActionTypes.MAKE_ORDER);
        userStore.addListener(this.getUserData, ProfileActionTypes.GET_DATA);
        cartStore.addListener(this.onApplyPromocode.bind(this), CartActionTypes.APPLY_PROMOCODE);
    }

    /**
     * Функция, вызывающая action функцию отрисовки при удалении товара
     * @param {number} id - id удаленного товара
     */
    deleteItem(id) {
        cartAction.deleteById(id);
        const deleteElement = document.getElementById(`cart-item_cart/${id}`);
        if (deleteElement) {
            deleteElement.remove();
        }
        this.renderTotalCost();
    }

    /**
     * Функция, реагирующая на успешное создание заказа
     */
    onMakeOrder() {
        this.getCart();
        router.refresh();
    }

    /**
     * Функция, реагирующая на применение промокода
     */
    onApplyPromocode() {
        const promocode = cartStore.getContext(cartStore._storeNames.promocode);
        const promocodeStatusText = document.getElementById('cart-promocode-status');

        if (promocodeStatusText) {
            if (cartStore.getContext(cartStore._storeNames.responseCode) ===
                config.responseCodes.code200) {
                if (promocode) {
                    promocodeStatusText.classList.add('paint-text-green-correct');
                    promocodeStatusText.textContent = 'Промокод применён';
                } else {
                    promocodeStatusText.classList.add('paint-text-background-red');
                    promocodeStatusText.textContent = 'Повторите попытку позже';
                }
            } else {
                promocodeStatusText.classList.add('paint-text-background-red');
                promocodeStatusText.textContent = 'Повторите попытку позже';
            }
        }

        this.renderTotalCost();
    }

    /**
     * Функция, делающая запрос за товарами корзины, адресами и картами и загружающая их
     */
    getCart() {
        this.renderCart(cartStore.getContext(cartStore._storeNames.itemsCart));
    }

    /**
     * Функция, считающая итоговую стоимость товаров в корине
     * @param {array} data
     * @param {object} context
     */
    #calcSummaryPrice(data, context) {
        /*
        * мы считаем сумму товаров в корзине (sumPrice), сумму скидок (noSalePrice),
        * итоговую разницу цены со скидкой и без скидки (priceDiff), количество товаров (count).
        * Делаем это не через массив, чтобы сразу добавить данные как атрибуты context
        * и не создавать лишних переменных
        * */
        [context.sumPrice, context.noSalePrice, context.priceDiff, context.count] =
            data.reduce((sumVal, key) => {
                // sumPrice
                sumVal[0] += key.lowprice * key.count ?? key.price * key.count;
                // noSalePrice
                sumVal[1] += key.price * key.count;
                // priceDiff
                sumVal[2] = sumVal[1] - sumVal[0];
                // count
                sumVal[3] += key.count;
                return sumVal;
            }, [0, 0, 0, 0]).map((val) => {
                return truncatePrice(val);
            });

        // const promocodeStr = cartStore.getContext(cartStore._storeNames.promocode);
        /* Функция для парсинга скидки из промокода */
        // promocodeDiscount = ...
        // context.sumPrice *= promocodeDiscount;
        // context.priceDiff = context.noSalePrice - context.sumPrice;
    }

    /**
     * Функция, отрисовывающая корзину
     * @param {object} data - данные для заполнения
     */
    renderCart(data) {
        if (data && data.length) {
            const context = {};
            const address = userStore.getContext(userStore._storeNames.address);
            if (address) {
                address.forEach((key) => {
                    if (key.priority) {
                        context.address = key;
                    }
                });
            }
            const paymentCards = userStore.getContext(userStore._storeNames.paymentMethods);
            if (paymentCards) {
                paymentCards.forEach((key) => {
                    if (key.priority) {
                        context.paymentCard = key;
                    }
                });
            }
            context.isAuth = userStore.getContext(userStore._storeNames.isAuth);
            if (context.isAuth) {
                context.avatar = userStore.getContext(userStore._storeNames.avatar);
                context.username = userStore.getContext(userStore._storeNames.name);
                context.phone = userStore.getContext(userStore._storeNames.phone);
            }
            context.deliveryPrice = 'Бесплатно';
            context.deliveryDate = getDate(1);

            const promocode = cartStore.getContext(cartStore._storeNames.promocode);
            context.promocode = promocode;

            this.#calcSummaryPrice(data, context);
            super.render(context);
            const cartItem = new CartItem(document.getElementById('checkboxes_cart'));
            cartItem.render(data);
            this.startEventListener();
        } else {
            refreshElements.showUnAuthPage({
                text: 'Корзина пуста. Случайно не нужен',
                linkToPage: config.href.category + '/phones',
                linkText: 'телефон',
                textAfterLink: '?',
            });
        }
    }


    /**
     * Функция, загружающая данные пользователя
     */
    getUserData() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при получении данных пользователя');
            break;
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {string} elementToEditID - id поля, которе надо будет изменить в попапе
     * @param {object} context - данные для передачи в попап
     */
    #handleEditPopup(elementToEditID, context) {
        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'grid';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'grid';
            document.getElementById('body').style.overflow = 'hidden';
        }
        this.PopUpChooseAddressAndPaymentCard = new PopUpChooseAddressAndPaymentCard(PopUp);
        this.PopUpChooseAddressAndPaymentCard.render(context);
        const choose = document.getElementById(elementToEditID);
        if (choose) {
            choose.classList.add('choice');
        }
    }

    /**
     * Функция, Выбирающая какие данные надо отобразить в корзине
     * при выборе способа оплаты или адреса доставаки в попапе
     * @param {string} choiceIdWithType название поля для изменения
     * @param {string} choiceId id карты для отображения
     * @param {string} data данные для отображения в корзине
     */
    #choiceIdType(choiceIdWithType, choiceId, data) {
        switch (choiceIdWithType) {
        case 'address':
            const addressField = document.querySelector('.addressID');
            addressField.textContent = data;
            addressField.id = `address/${choiceId}`;
            break;
        case 'paymentCard':
            const cardNumber = document.querySelectorAll('.card-number');
            if (cardNumber) {
                cardNumber.forEach((key) => {
                    key.textContent = data;
                });
            }
            const choice = document.querySelectorAll('.payment-method__cart');
            if (choice) {
                choice.forEach((key) => {
                    key.id = `paymentCard/${choiceId}`;
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

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {HTMLElement} event контекст события для обработки
     */
    async listenClickAddressAndPaymentCardBlock(event) {
        let elementId = event.target.id;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId] = elementId.split('/');
            }
            switch (elementId) {
            case 'edit-address':
                this.#handleEditPopup(document.querySelector('.address-cart__main').id,
                    {
                        address: userStore.getContext(userStore._storeNames.address),
                        isAddress: true,
                    });
                break;
            case 'edit-payment-card':
                this.#handleEditPopup(document.querySelector('.payment-method__cart').id,
                    {
                        paymentCard: userStore.getContext(userStore._storeNames.paymentMethods),
                    });
                break;
            case 'cart-popup-form__apply':
                event.preventDefault();
                const choice = document.querySelector('.choice');
                const data = choice.getAttribute('value');
                let choiceId = choice.id;
                let choiceIdWithType = choice.id;
                if (choiceIdWithType) {
                    if (choiceIdWithType.includes('/')) {
                        [choiceIdWithType, choiceId] = choiceIdWithType.split('/');
                    } else {
                        choiceId = choiceIdWithType;
                    }
                    this.#choiceIdType(choiceIdWithType, choiceId, data);
                }
                const popUp = document.getElementById('popUp');
                const popUpFade = document.getElementById('popUp-fade');
                if (popUp) {
                    popUp.style.display = 'none';
                    popUp.replaceChildren();
                }
                if (popUpFade) {
                    popUpFade.style.display = 'none';
                    document.getElementById('body').style.overflow = 'visible';
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
        const itemsCart = document.getElementsByClassName('cart-item__cart');
        if (itemsCart) {
            Array.from(itemsCart).forEach((child) => {
                const check = child.getElementsByClassName('checkbox-opt')[0];
                const itemId = check.getAttribute('id').split('/')[1];
                if (check.checked) {
                    const lowprice = parseIntInPrice(
                        document.getElementById(`price/${itemId}`).textContent);
                    let price = parseIntInPrice(
                        document.getElementById(`sale-price/${itemId}`).textContent);
                    const count = parseIntInPrice(
                        document.getElementById(`count-product/${itemId}`).textContent);
                    if (Number.isNaN(price)) {
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
        const summary = {};
        this.#calcSummaryPrice(data, summary);
        // Изменение итоговых сумм

        const totalPrice = document.getElementById('total-price');
        totalPrice.textContent = summary.sumPrice + ' ₽';
        const productsNumber = document.getElementById('products-number');
        productsNumber.textContent = 'Товары, ' + summary.count + ' шт.';
        const priceWithoutDiscount = document.getElementById('price-without-discount');
        priceWithoutDiscount.textContent = summary.noSalePrice + ' ₽';
        const discount = document.getElementById('discount');
        discount.textContent = summary.priceDiff + ' ₽';
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
            items: [],
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
            orderData.address = parseInt(address.getAttribute('id')
                .split('/', 2)[1]);
            if (orderData.address !== -1) {
                let date = document.getElementById('date-delivery').textContent.trim();
                let time = document.getElementById('time-delivery').textContent.trim();
                date = date.split(' / ');
                time = time.split(' - ');
                orderData.deliveryDate = new Date(Date.UTC(date[2], date[1], date[0],
                    (Number(time[1].split(':')[0]) + Number(time[0].split(':')[0])) / 2 % 24,
                    0)).toJSON();
                orderData.card = parseInt(document.querySelector('.payment-method__cart')
                    .id.split('/')[1]);
                orderData.card = orderData.card ? orderData.card : 1;
                cartAction.makeOrder(orderData);
            } else {
                errorMessage.getAbsoluteErrorMessage('Выберите адрес');
            }
        } else {
            errorMessage.getAbsoluteErrorMessage('Корзина пуста');
        }
    }

    /**
     * Функция, обрабатывающая клик на кнопку создания заказа
     */
    async listenClickApplyPromocode() {
        const promocodeStr = document.getElementById('cart-promocode-field');
        if (promocodeStr && promocodeStr.value &&
            (cartStore.getContext(cartStore._storeNames.promocode) !== promocodeStr.value)) {
            cartAction.applyPromocode(promocodeStr.value);
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        // Обработчик блока товаров
        this.productsContent = document.getElementById('block-products');
        if (this.productsContent) {
            this.bindListenClickProductsBlock = this.listenClickProductsBlock.bind(this);
            this.bindListenChangeCheckbox = this.listenChangeCheckbox.bind(this);
            this.productsContent.addEventListener('click', this.bindListenClickProductsBlock);
            this.productsContent.addEventListener('change', this.bindListenChangeCheckbox);
        }

        // Обработчик создания заказа
        this.createOrder = document.getElementById('summary_cart__create-order-button');
        if (this.createOrder) {
            this.createOrder.addEventListener('click', this.listenClickCreateOrder);
        }

        this.cartContent = document.getElementById('cart');
        if (this.cartContent) {
            this.bindListenClickAddressAndPaymentCardBlock =
                this.listenClickAddressAndPaymentCardBlock.bind(this);
            this.cartContent.addEventListener('click', this.bindListenClickAddressAndPaymentCardBlock);
        }

        this.addressCart = document.getElementById('address-cart');
        if (this.addressCart) {
            this.addressCart.addEventListener('change', this.listenChangeDateAndTime);
        }

        // Обработчик применения промокода
        this.applyPromocodeButton = document.getElementById('cart-promocode-submit-button');
        if (this.applyPromocodeButton) {
            this.applyPromocodeButton.addEventListener('click', this.listenClickApplyPromocode);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.productsContent) {
            this.productsContent.removeEventListener('click', this.bindListenClickProductsBlock);
            this.productsContent.removeEventListener('change', this.bindListenChangeCheckbox);
        }

        if (this.createOrder) {
            this.createOrder.removeEventListener('click', this.listenClickCreateOrder);
        }

        if (this.cartContent) {
            this.cartContent.removeEventListener('click',
                this.bindListenClickAddressAndPaymentCardBlock);
        }

        if (this.addressCart) {
            this.addressCart.removeEventListener('change', this.listenChangeDateAndTime);
        }

        if (this.applyPromocodeButton) {
            this.applyPromocodeButton.removeEventListener('click', this.listenClickApplyPromocode);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        this.addListener();
        profileAction.getData();
        cartAction.getCart();
    }
}
