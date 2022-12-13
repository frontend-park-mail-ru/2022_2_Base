import ApplyPromocodeBlockTemplate from './ApplyPromocodeBlock.hbs';
import BaseComponent from '../BaseComponent';
import './ApplyPromocodeBlock.scss';
import {config} from '../../config';
import cartStore from '../../stores/CartStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import userStore from '../../stores/UserStore';
import router from '../../modules/Router';

/**
 * Класс для реализации компонента ApplyPromocodeBlock
 */
export default class ApplyPromocodeBlock extends BaseComponent {
    bindListenClickApplyPromocode: addListenerFunction | emptyCallback;
    applyPromocodeButton: HTMLElement | null;

    /**
     * Конструктор, создающий класс компонента ApplyPromocodeBlock
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
        this.bindListenClickApplyPromocode = config.noop;

        cartStore.addListener(this.onApplyPromocode.bind(this), CartActionTypes.APPLY_PROMOCODE);
        cartStore.addListener(this.onCancelPromocode.bind(this), CartActionTypes.CANCEL_PROMOCODE);
        this.applyPromocodeButton = null;
    }

    /**
     * Функция, реагирующая на применение промокода
     */
    onApplyPromocode() {
        router.refresh();

        const promocode = cartStore.getContext(cartStore._storeNames.promocode);
        const promocodeStatusText = document.getElementById('cart-promocode-status');
        if (promocodeStatusText) {
            if (cartStore.getContext(cartStore._storeNames.responseCode) ===
                config.responseCodes.code200) {
                if (promocode) {
                    this.showPromocodeTryResult(true, 'Промокод применён');

                    const applyPromocodeButton = document.getElementById('cart-promocode-submit-button');
                    if (applyPromocodeButton) {
                        applyPromocodeButton.textContent = 'Удалить';
                    }

                    const promocodeField = document.getElementById('cart-promocode-field');
                    if (promocodeField) {
                        promocodeField.classList.add(
                            'apply-promocode-block__input-submit-block__input-field-disabled');
                    }
                } else {
                    this.showPromocodeTryResult(false, 'Промокод недействителен');
                }
            } else {
                this.showPromocodeTryResult(false, 'Повторите попытку позже');
            }
        }
    }

    /**
     * Функция, выводящая строку с результатом действия с промокодом
     * @param result - результат действия с промокодом,
     * false - отрицательный, true - положительный
     * @param message - сообщение, поясняющее результат
     */
    showPromocodeTryResult(result: boolean, message: string) {
        const promocodeStatusText = document.getElementById('cart-promocode-status');
        if (promocodeStatusText) {
            (result) ? promocodeStatusText.classList.add('paint-text-green-correct') :
                promocodeStatusText.classList.add('paint-text-background-red');

            promocodeStatusText.textContent = message;
        }
    }

    /**
     * Функция, реагирующая на отмену промокода
     */
    onCancelPromocode() {
        router.refresh();

        const promocodeStatusText = document.getElementById('cart-promocode-status');
        if (promocodeStatusText) {
            if (cartStore.getContext(cartStore._storeNames.responseCode) ===
                config.responseCodes.code200) {
                this.showPromocodeTryResult(true, 'Промокод удалён');

                const applyPromocodeButton = document.getElementById('cart-promocode-submit-button');
                if (applyPromocodeButton) {
                    applyPromocodeButton.textContent = 'Применить';
                }

                const promocodeField = document.getElementById('cart-promocode-field');
                if (promocodeField) {
                    promocodeField.classList.remove(
                        'apply-promocode-block__input-submit-block__input-field-disabled');
                }
            } else {
                this.showPromocodeTryResult(false, 'Повторите попытку позже');
            }
        }
    }

    /**
     * Функция, обрабатывающая клик на кнопку создания заказа
     */
    async listenClickApplyPromocode() {
        const promocodeStr = document.getElementById('cart-promocode-field');
        if (promocodeStr && promocodeStr instanceof HTMLInputElement) {
            if (cartStore.getContext(cartStore._storeNames.promocode)) {
                cartAction.cancelPromocode();
            } else if (promocodeStr.value) {
                if (!/^[a-z0-9 а-яА-ЯёЁ!?()_-]+$/i
                    .test(promocodeStr.value)) {
                    this.showPromocodeTryResult(false, 'Введены недопустимые символы');
                } else {
                    cartAction.applyPromocode(promocodeStr.value);
                }
            }
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        // Обработчик применения промокода
        this.applyPromocodeButton = document.getElementById('cart-promocode-submit-button');
        if (this.applyPromocodeButton) {
            this.bindListenClickApplyPromocode = this.listenClickApplyPromocode.bind(this);
            this.applyPromocodeButton.addEventListener('click', this.bindListenClickApplyPromocode);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.applyPromocodeButton) {
            this.applyPromocodeButton.removeEventListener('click', this.bindListenClickApplyPromocode);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     */
    override render() {
        super.render(this.prepareRenderData(), ApplyPromocodeBlockTemplate);
        this.startEventListener();
    }

    /**
     * Метод, подготавливавающий наполнение для блока, исходя из данных в сторах
     * @returns контекст отрисовки
     */
    prepareRenderData() {
        return {
            isAuth: userStore.getContext(userStore._storeNames.isAuth),
            promocode: cartStore.getContext(cartStore._storeNames.promocode),
        };
    }
}
