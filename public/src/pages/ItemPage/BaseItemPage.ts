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
import {itemPageTuple} from '../../../../types/tuples';

/**
 * Класс, реализующий страницу BaseItemPage.
 */
export default class BaseItemPage extends BasePage {
    getItemAction;
    getItemTypeAction;
    pageName;
    /**
     * Конструктор, создающий конструктор базовой страницы BaseItemPage с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     * @param template - HTML-шаблон, в который будет осуществлена отрисовка
     * @param childClassData - данные дочернего класса
     */
    protected constructor(parent: HTMLElement, template: HandlebarsTemplateDelegate,
        childClassData: itemPageTuple) {
        super(
            parent,
            template,
        );
        [this.getItemAction, this.getItemTypeAction, this.pageName] = childClassData;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        itemsStore.addListener(this.loadItem.bind(this), this.getItemTypeAction);

        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
    }

    /**
     * Функция, загружающая дополнительные данные
     * @param data - объект для добавления данных
     */
    loadMoreData(data: unknown) {}

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
        case config.responseCodes.code200: {
            const data = itemsStore.getContext(itemsStore._storeNames.itemData);
            if (data) {
                document.title = data.name + ' ' + document.title;
                data.delveryDate = getDate(1)[0];
                super.render(data);
                this.loadMoreData(data);
                const headerProduct = document.getElementById(
                    `${this.pageName}-page__header-product`);
                if (headerProduct) {
                    const pageProduct = new ProductHeader(headerProduct);
                    pageProduct.render(data);
                }
                const addToCard =document.getElementById(
                    `${this.pageName}-block-button-add-to-cart`);
                if (addToCard) {
                    const addToCartButton = new AddToCartButton(addToCard);
                    addToCartButton.render(data);
                }
                this.startEventListener();
            } else {
                router.openNotFoundPage();
            }
            break;
        }
        default:
            router.openNotFoundPage();
            break;
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        cartAction.getCart();
        this.addListener();
    }
}
