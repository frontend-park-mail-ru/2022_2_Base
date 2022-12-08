import Dispatcher from '../modules/dispatcher';
import {baseStoreObject} from '../../../types/interfaces';

/**
 * Класс, реализующий базовое хранилище.
 */
export default class BaseStore {
    _changed: boolean;
    _events: Map<string, baseStoreObject>;
    _storage: Map<string, any>;
    /**
     * constructor
     */
    constructor() {
        this._changed = false;
        this._storage = new Map();
        this._events = new Map();
        Dispatcher.register(this._invokeOnDispatch.bind(this));
    }

    /**
     * Метод, возвращающий текущее состояние (контекст) хранилища.
     * @param field - возвращаемое поле
     * @returns контекст хранилища
     */
    getContext(field: string) {
        return (field ? this._storage.get(field) : this._storage);
    }

    /**
     * Метод, добавляющий нового слушателя.
     * @param callback - функция-обработчик
     * @param changeEvent - наименование события
     */
    addListener(callback: emptyCallback, changeEvent: string) {
        this._events.set(changeEvent, {
            callbacks: callback,
            promise: null,
        });
    }

    /**
     * Метод, проверяющий, изменилось ли хранилище
     * @returns результат проверки
     */
    hasChanged() {
        return this._changed;
    }

    /**
     * Метод, устанавливающий статус "изменено".
     * @param events - произошедшие события
     */
    _emitChange(events: Array<string>) {
        if (events.every((val: string) => this._events.get(val)!.promise = Promise.resolve(val))) {
            this._changed = true;
        } else {
            throw new Error('Store: метод _emitChange должен вызывать существующие события');
        }
    }

    /**
     * Метод, реализующий обертку под _onDispatch.
     * @param payload - полезная нагрузка
     */
    async _invokeOnDispatch(payload: object) {
        this._changed = false;
        await this._onDispatch(payload);

        if (this.hasChanged()) {
            this._events.forEach((value: baseStoreObject, key: string) => {
                value.promise?.then(
                    (changeEvent) => {
                        value.callbacks();
                        this._events.get(key)!.promise = null;
                    })
                    .catch((error: any) => console.log('_invokeOnDispatch:', error));
            });
        }
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param payload - полезная нагрузка запроса
     */
    async _onDispatch(payload: object) {
        throw new Error('Store: метод _onDispatch должен быть реализован в подклассе');
    }
}
