/**
 * Класс, реализующий базовое хранилище.
 */
export default class BaseStore {
    /**
     * @constructor
     */
    constructor() {
        this._changed = false;
        this._storage = new Map();
        this._events = new Map();

        Dispatcher.register(this._invokeOnDispatch.bind(this));
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
     * Метод, добавляющий нового слушателя.
     * @param {function} callback функция-обработчик
     * @param {String?} changeEvent наименование события
     */
    addListener(callback, changeEvent) {
        this._events.has(changeEvent) ? this._events.get(changeEvent).callbacks.add(callback) :
            this._events.set(changeEvent, {
                callbacks: new Set(),
                promise: null,
            });
    }

    /**
     * Метод, проверяющий, изменилось ли хранилище
     * @return {boolean} результат проверки
     */
    hasChanged() {
        if (Dispatcher.isDispatching()) {
            return this._changed;
        }

        throw new Error('Store: метод hasChanged должен быть вызван при работающем Dispatcher');
    }

    /**
     * Метод, устанавливающий статус "изменено".
     * @param {Array.<string>} events произошедшие события
     */
    _emitChange(events) {
        if (Dispatcher.isDispatching()) {
            if (events.every((val) =>
                this._events.get(val).promise = Promise.resolve(val))) {
                this._changed = true;
            } else {
                throw new Error('Store: метод _emitChange должен быть вызван при работающем Dispatcher');
            }
        } else {
            throw new Error('Store: метод _emitChange должен быть вызван при работающем Dispatcher');
        }
    }

    /**
     * Метод, реализующий обертку под _onDispatch.
     * @param {Object} payload полезная нагрузка
     */
    async _invokeOnDispatch(payload) {
        this._changed = false;
        await this._onDispatch(payload);

        if (this.hasChanged()) {
            this._events.forEach((value, key) => {
                value.promise?.then(
                    (changeEvent) => {
                        value.callbacks.forEach((callback) => callback());
                        this._events.get(key).promise = null;
                    })
                    .catch((error) => console.log('_invokeOnDispatch:', error));
            });
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
