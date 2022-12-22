import CartPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage';
import CartItem from '../../components/CartItem/CartItem';
import ApplyPromocodeBlock from '../../components/ApplyPromocodeBlock/ApplyPromocodeBlock';
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
import {
    getDate,
    getTextContent,
    parseIntInPrice,
    setTextContent,
    truncatePrice,
} from '../../modules/sharedFunctions';
import refreshElements from '../../modules/refreshElements';
import {likesAction, LikesActionTypes} from '../../actions/likes';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    PopUpChooseAddressAndPaymentCard: PopUpChooseAddressAndPaymentCard | undefined;
    addressCart: HTMLElement | null;
    bindListenChangeCheckbox: addListenerFunction;
    bindListenClickAddressAndPaymentCardBlock: addListenerFunction;
    bindListenClickProductsBlock: addListenerFunction;
    cartContent: HTMLElement | null;
    createOrder: HTMLElement | null;
    productsContent: HTMLElement | null;

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            CartPageTemplate,
        );

        this.addressCart = null;
        this.cartContent = null;
        this.createOrder = null;
        this.productsContent = null;

        this.bindListenChangeCheckbox = config.noop;
        this.bindListenClickAddressAndPaymentCardBlock = config.noop;
        this.bindListenClickProductsBlock = config.noop;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
        cartStore.addListener(this.getCart.bind(this), CartActionTypes.DELETE_ALL);
        cartStore.addListener(this.renderTotalCost.bind(this), CartActionTypes.DELETE_BY_ID);
        cartStore.addListener(this.onMakeOrder.bind(this), CartActionTypes.MAKE_ORDER);
        userStore.addListener(this.getUserData, ProfileActionTypes.GET_DATA);
        itemsStore.addListener(this.listenLike, LikesActionTypes.LIKE);
        itemsStore.addListener(this.listenLike, LikesActionTypes.DISLIKE);
    }

    /**
     * Функция, вызывающая action функцию отрисовки при удалении товара
     * @param id - id удаленного товара
     */
    deleteItem(id: number) {
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
        router.openPage(config.href.orders);
        errorMessage.getAbsoluteNotificationMessage('Заказ успешно оформлен');
    }

    /**
     * Функция, делающая запрос за товарами корзины, адресами и картами и загружающая их
     */
    getCart() {
        this.renderCart(cartStore.getContext(cartStore._storeNames.itemsCart));
        this.renderApplyPromocodeBlock();
    }

    /**
     * Функция, считающая итоговую стоимость товаров в корине
     * @param data - данные для вычисления
     * @param context - контекст
     */
    #calcSummaryPrice(data: Array<priceData>, context: summaryPrice) {
        /*
        * мы считаем сумму товаров в корзине (sumPrice), сумму скидок (noSalePrice),
        * итоговую разницу цены со скидкой и без скидки (priceDiff), количество товаров (count).
        * Делаем это не через массив, чтобы сразу добавить данные как атрибуты context
        * и не создавать лишних переменных
        * */
        [context.sumPrice, context.noSalePrice, context.priceDiff, context.count] =
            data.reduce((sumVal: Array<number>, key: any) => {
                // sumPrice
                sumVal[0] += key.lowprice * key.count ?? key.price * key.count;
                // noSalePrice
                sumVal[1] += key.price * key.count;
                // priceDiff
                sumVal[2] = sumVal[1] - sumVal[0];
                // count
                sumVal[3] += key.count;
                return sumVal;
            }, [0, 0, 0, 0]).map((val: number) => {
                return truncatePrice(val);
            });
    }

    /**
     * Функция, отрисовывающая корзину
     * @param data - данные для заполнения
     */
    renderCart(data: Array<priceData>) {
        if (data && data.length) {
            const context: renderCart & summaryPrice = {};
            const address = userStore.getContext(userStore._storeNames.address);
            if (address) {
                address.forEach((key: addressCardObj) => {
                    if (key.priority) {
                        context.address = key;
                    }
                });
            }
            const paymentCards = userStore.getContext(userStore._storeNames.paymentMethods);
            if (paymentCards) {
                paymentCards.forEach((key: PaymentCardObj) => {
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

            this.#calcSummaryPrice(data, context);
            super.render(context);

            const checkBoxes = document.getElementById('checkboxes_cart');
            if (checkBoxes) {
                const cartItem = new CartItem(checkBoxes);
                cartItem.render(data);
                this.startEventListener();
            }
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
     * Функция, отрисовывающая блок для ввода промокода
     */
    renderApplyPromocodeBlock() {
        const promocodeBlock = document.getElementById('cart__apply-promocode-block');
        if (promocodeBlock) {
            const applyPromocodeBlock = new ApplyPromocodeBlock(promocodeBlock);
            applyPromocodeBlock.render();
        }
    }


    /**
     * Функция, загружающая данные пользователя
     */
    getUserData() {
        console.log(itemsStore.getContext(itemsStore._storeNames.responseCode));
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            cartAction.getCart();
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при получении данных пользователя');
            break;
        }
    }

    /**
     * Функция, реагирует на ответ сервера при лайке
     */
    listenLike() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при изменении избранного');
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param elementToEditID - id поля, которе надо будет изменить в попапе
     * @param context - данные для передачи в попап
     */
    #handleEditPopup(elementToEditID: string, context: object) {
        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'grid';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'grid';
            config.HTMLskeleton.body.style.overflow = 'hidden';
        }
        this.PopUpChooseAddressAndPaymentCard =
            new PopUpChooseAddressAndPaymentCard(PopUp ?? config.empyNode);
        this.PopUpChooseAddressAndPaymentCard.render(context);
        const choose = document.getElementById(elementToEditID);
        if (choose) {
            choose.classList.add('choice');
        }
    }

    /**
     * Функция, Выбирающая какие данные надо отобразить в корзине
     * при выборе способа оплаты или адреса доставаки в попапе
     * @param choiceIdWithType - название поля для изменения
     * @param choiceId - id карты для отображения
     * @param data - данные для отображения в корзине
     */
    #choiceIdType(choiceIdWithType: string, choiceId: string, data: string) {
        switch (choiceIdWithType) {
        case 'address': {
            const addressField = document.querySelector('.addressID');
            if (addressField) {
                addressField.textContent = data;
                addressField.id = `address/${choiceId}`;
            }
            break;
        }
        case 'paymentCard': {
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
            const summaryPayment = document.getElementById('final-paymentmethod');
            if (summaryPayment) {
                summaryPayment.textContent = 'Картой';
            }
            break;
        }
        case 'payment-upon-receipt': {
            const paymentReceipt = document.querySelectorAll('.card-number');
            if (paymentReceipt) {
                paymentReceipt.forEach((key) => {
                    key.textContent = data;
                });
            }
            const summaryPayment = document.getElementById('final-paymentmethod');
            if (summaryPayment) {
                summaryPayment.textContent = 'При получении';
            }
        }
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param event - контекст события для обработки
     */
    async listenClickAddressAndPaymentCardBlock(event: Event) {
        if (event.target instanceof HTMLElement) {
            let elementId = event.target.id;
            if (elementId) {
                if (elementId.includes('/')) {
                    [elementId] = elementId.split('/');
                }
                switch (elementId) {
                case 'edit-address': {
                    const addressCard = document.querySelector('.address-cart__main');
                    if (addressCard) {
                        this.#handleEditPopup(addressCard.id,
                            {
                                address: userStore.getContext(userStore._storeNames.address),
                                isAddress: true,
                            },
                        );
                    }
                    break;
                }
                case 'edit-payment-card': {
                    const paymentCard = document.querySelector('.payment-method__cart');
                    if (paymentCard) {
                        this.#handleEditPopup(paymentCard.id,
                            {
                                paymentCard: userStore.getContext(userStore._storeNames.paymentMethods),
                            },
                        );
                    }
                    break;
                }
                case 'cart-popup-form__apply': {
                    event.preventDefault();
                    const choice = document.querySelector('.choice');
                    if (choice) {
                        const data = choice.getAttribute('value');
                        let choiceId = choice.id;
                        let choiceIdWithType = choice.id;
                        if (choiceIdWithType) {
                            if (choiceIdWithType.includes('/')) {
                                [choiceIdWithType, choiceId] = choiceIdWithType.split('/');
                            } else {
                                choiceId = choiceIdWithType;
                            }
                            this.#choiceIdType(choiceIdWithType, choiceId, data ?? '');
                        }
                        const popUp = document.getElementById('popUp');
                        const popUpFade = document.getElementById('popUp-fade');
                        if (popUp) {
                            popUp.style.display = 'none';
                            popUp.replaceChildren();
                        }
                        if (popUpFade) {
                            popUpFade.style.display = 'none';
                            config.HTMLskeleton.body.style.overflow = 'visible';
                        }
                    }
                    break;
                }
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая выбор даты и времени доставки
     * @param target - элемент, на который нажали
     */
    async listenChangeDateAndTime({target}: Event) {
        if (target instanceof HTMLInputElement) {
            let elementId = target.id;
            let itemId;
            if (elementId) {
                if (elementId.includes('/')) {
                    [elementId, itemId] = elementId.split('/');
                }
                switch (elementId) {
                case 'delivery-date':
                    setTextContent(document.getElementById('date-delivery'),
                        getTextContent(document.getElementById(`delivery-date-value/${itemId}`)));
                    break;
                case 'delivery-time':
                    setTextContent(document.getElementById('time-delivery'),
                        getTextContent(document.getElementById(`delivery-time-value/${itemId}`)));
                    break;
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая клики в блоке товаров
     * @param event - событие, вызвавшее обработчик
     */
    async listenClickProductsBlock(event: Event) {
        const target = event.target;
        if (target instanceof HTMLElement) {
            let elementId = target.id;
            let itemId;
            if (target.id.includes('/')) {
                [elementId, itemId] = target.id.split('/');
            }
            switch (elementId) {
            case 'empty-cart':
                cartAction.deleteAll();
                break;
            case 'delete-cart-item':
                this.deleteItem(parseInt(itemId ?? ''));
                break;
            case 'button-minus_cart': {
                const amountItem = document.getElementById(`count-product/${itemId}`);
                if (amountItem) {
                    const count = parseInt(amountItem.textContent ?? '');
                    if (count === 1) {
                        this.deleteItem(parseInt(itemId ?? '')); // удаление элемента из корзины
                    } else {
                        cartAction.decreaseNumber(parseInt(itemId ?? ''));
                        amountItem.textContent = (count - 1).toString();
                        this.renderTotalCost();
                    }
                }
                break;
            }
            case 'button-plus_cart': {
                const itemAmount = document.getElementById(`count-product/${itemId}`);
                if (itemAmount) {
                    cartAction.increaseNumber(parseInt(itemId ?? ''));
                    const count = parseInt(itemAmount.textContent ?? '');
                    itemAmount.textContent = (count + 1).toString();
                    this.renderTotalCost();
                }
                break;
            }
            case 'favourite-opt_cart':
                if (target instanceof HTMLInputElement &&
                    userStore.getContext(userStore._storeNames.isAuth)) {
                    target.checked ?
                        likesAction.like(
                            Number(itemId)) :
                        likesAction.dislike(
                            Number(itemId));
                } else {
                    event.preventDefault();
                    errorMessage.
                        getAbsoluteNotificationMessage(
                            'Чтобы добавить в избранное войдите');
                }
                break;
            }
        }
    }

    /**
     * Функция, перерисовывающая итоговую стоимость
     */
    renderTotalCost() {
        const data: Array<priceData> = [];
        const itemsCart = document.getElementsByClassName('cart-item__cart');
        if (itemsCart) {
            Array.from(itemsCart).forEach((child) => {
                const check = child.getElementsByClassName('checkbox-opt')[0];
                const itemId = check.id.split('/')[1];
                if (check instanceof HTMLInputElement && check.checked) {
                    const priceEl = document.getElementById(`price/${itemId}`);
                    const salePriceEl = document.getElementById(`sale-price/${itemId}`);
                    const countProductsEl = document.getElementById(`count-product/${itemId}`);
                    if (priceEl && salePriceEl && countProductsEl) {
                        const lowprice = parseIntInPrice(priceEl.textContent ?? '');
                        let price = parseIntInPrice(salePriceEl.textContent ?? '');
                        const count = parseIntInPrice(countProductsEl.textContent ?? '');
                        if (Number.isNaN(price)) {
                            price = lowprice;
                        }
                        data.push({
                            lowprice: lowprice,
                            price: price,
                            count: count,
                        });
                    }
                }
            });
        }
        // Подсчет итоговой стоимости товаров в корзине для отрисовки
        const summary: summaryPrice = {};
        this.#calcSummaryPrice(data, summary);
        // Изменение итоговых сумм
        setTextContent(document.getElementById('total-price'), summary.sumPrice + ' ₽');
        setTextContent(document.getElementById('products-number'), 'Товары, ' + summary.count + ' шт.');
        setTextContent(document.getElementById('price-without-discount'), summary.noSalePrice + ' ₽');
        setTextContent(document.getElementById('discount'), summary.priceDiff + ' ₽');
    }

    /**
     * Функция, обрабатывающая событие change в блоке товаров
     * @param event - контекст события для обработки
     */
    async listenChangeCheckbox(event: Event) {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            let elementId = target.id;
            if (elementId) {
                if (elementId.includes('/')) {
                    [elementId] = elementId.split('/');
                }
                switch (elementId) {
                case 'item_cart__select-all': {
                    // Установка и снятие галочек у товаров
                    const checkedItems = document.getElementsByName('itemCart');
                    if (checkedItems) {
                        checkedItems.forEach((key) => {
                            if (key instanceof HTMLInputElement) {
                                key.checked = target.checked;
                            }
                        });
                        this.renderTotalCost();
                    }
                    break;
                }
                case 'item_cart__select': {
                    const selectAll = document.getElementById('item_cart__select-all');
                    if (selectAll instanceof HTMLInputElement) {
                        if (!target.checked) {
                            // Снятие галочки выбрать все
                            selectAll.checked = false;
                        } else {
                            // Установление галочки выбрать все
                            const selectItems = document.getElementsByName('itemCart');
                            if ([...selectItems].every((key) => {
                                return (key as HTMLInputElement).checked;
                            })) {
                                selectAll.checked = true;
                            }
                        }
                    }
                    this.renderTotalCost();
                    break;
                }
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая клик на кнопку создания заказа
     */
    async listenClickCreateOrder() {
        const orderData: OrderDataObj = {
            items: [],
        };
        const checkedItems = document.getElementsByName('itemCart');
        if (checkedItems) {
            checkedItems.forEach((key) => {
                const itemId = key.id.split('/')[1];
                if (key instanceof HTMLInputElement && key.checked) {
                    orderData.items.push(parseInt(itemId));
                }
            });
        } else {
            console.log('elements not found', checkedItems);
        }
        if (orderData.items.length) {
            const address = document.querySelector('.addressID');
            if (address) {
                orderData.address = parseInt(address.id.split('/', 2)[1]);
            }
            if (orderData.address !== -1) {
                const dateElement = document.getElementById('date-delivery');
                const timeElement = document.getElementById('time-delivery');
                if (dateElement && timeElement) {
                    const date = dateElement.textContent?.trim().split(' / ');
                    const time = timeElement.textContent?.trim().split(' - ');
                    if (date && time) {
                        orderData.deliveryDate =
                            new Date(Date.UTC(Number(date[2]), Number(date[1]), Number(date[0]),
                                (Number(time[1].split(':')[0]) +
                                    Number(time[0].split(':')[0])) / 2 % 24, 0)).toJSON();
                        const paymentMethodsCard = document.querySelector('.payment-method__cart');
                        if (paymentMethodsCard) {
                            orderData.card =
                                parseInt(paymentMethodsCard.id.split('/')[1]);
                            orderData.card =
                                orderData.card ? orderData.card : 1;
                            cartAction.makeOrder(orderData);
                        }
                    }
                }
            } else {
                errorMessage.getAbsoluteErrorMessage('Выберите адрес');
            }
        } else {
            errorMessage.getAbsoluteErrorMessage('Корзина пуста');
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
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
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
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
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        profileAction.getData();
        this.addListener();
    }
}
