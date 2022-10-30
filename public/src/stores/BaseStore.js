/**
 * Класс, реализующий базовое хранилище.
 */
export default class BaseStore {
    /**
     * @constructor
     * @param {String} channelName имя канала EventBus
     */
    constructor(channelName) {
        this._changed = false;
        this._changeEvent = 'change';
        this._storage = new Map();

        this._invokeOnDispatch = this._invokeOnDispatch.bind(this);
        // Dispatcher.register(this._invokeOnDispatch);

        EventBus.addChannel(channelName);
        this._channel = channelName;
    }

    /**
     * Метод, возвращающий текущее состояние (контекст) хранилища.
     * @param {String?} field возвращаемое поле
     * @return {String} контекст хранилища
     */
    getContext(field) {
        return field ? this._storage.get(field) : this._storage;
    }

    /**
     * Метод, добавляющий нового слушателя в EventBus.
     * @param {function} callback функция-обработчик
     * @param {String?} changeEvent наименование события
     */
    addListener(callback, changeEvent = this._changeEvent) {
        EventBus.addListener(this._channel, changeEvent, callback);
    }

    /**
     * Метод, проверяющий, изменилось ли хранилище
     * @return {boolean} результат проверки
     */
    hasChanged() {
        if (Dispatcher.isDispatching) {
            return this._changed;
        }

        throw new Error('Store: метод hasChanged должен быть вызван при работающем Dispatcher');
    }

    /**
     * Метод, устанавливающий статус "изменено".
     */
    _emitChange() {
        if (Dispatcher.isDispatching) {
            this._changed = true;
            return;
        }

        throw new Error('Store: метод _emitChange должен быть вызван при работающем Dispatcher');
    }

    /**
     * Метод, реализующий обертку под _onDispatch.
     * @param {Object} payload полезная нагрузка
     */
    async _invokeOnDispatch(payload) {
        this._changed = false;
        await this._onDispatch(payload);

        if (this.hasChanged()) {
            EventBus.emit(this._channel, this._changeEvent);
        }
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        throw new Error('Store: метод _onDispatch должен быть реализован в подклассе');
    }
}
