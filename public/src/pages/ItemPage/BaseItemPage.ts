import BasePage from '../BasePage';
import itemsStore from '../../stores/ItemsStore';
import cartStore from '../../stores/CartStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';
import AddToCartButton from '../../components/AddToCartButton/AddToCartButton';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import router from '../../modules/Router';
import {getDate} from '../../modules/sharedFunctions';

/**
 * Класс, реализующий страницу BaseItemPage.
 */
export default class BaseItemPage extends BasePage {
    getItemAction: any;
    getItemTypeAction: any;
    pageName: any;
    /**
     * Конструктор, создающий конструктор базовой страницы BaseItemPage с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     * @param {HandlebarsTemplateDelegate} template HTML-шаблон, в который будет осуществлена отрисовка
     * @param {array} childClassData данные дочернего класса
     */
    constructor(parent: any, template: any, childClassData: any) {
        super(
            parent,
            template,
        );
        [this.getItemAction, this.getItemTypeAction, this.pageName] = childClassData;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        itemsStore.addListener(this.loadItem.bind(this), this.getItemTypeAction);

        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
    }

    /**
     * Функция, загружающая дополнительные данные
     * @param {object} data объект для добавления данных
     */
    loadMoreData(data: any) {
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (cartStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            this.getItemAction();
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при получении товаров из корзины');
            break;
        }
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     */
    loadItem() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            const data = itemsStore.getContext(itemsStore._storeNames.itemData);
            if (data) {
                data.delveryDate = getDate(1)[0];
                super.render(data);
                this.loadMoreData(data);
                const pageProduct = new ProductHeader(
                    document.getElementById(`${this.pageName}-page__header-product`));
                pageProduct.render(data);
                const addToCartButton = new AddToCartButton(
                    document.getElementById(`${this.pageName}-block-button-add-to-cart`));
                addToCartButton.render(data);
                this.startEventListener();
            } else {
                router.openNotFoundPage();
            }
            break;
        default:
            router.openNotFoundPage();
            break;
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        cartAction.getCart();
        this.addListener();
    }
}
