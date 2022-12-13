/**
 * Класс, реализующий Диспетчер.
 */
class Dispatcher {
    _callbacks: Map<number, DispatcherCallbackObject>;
    _isDispatching: boolean;
    _lastId: number;
    _pendingPayload?: object;
    /**
     * constructor
     */
    constructor() {
        this._isDispatching = false;
        this._callbacks = new Map();
        this._lastId = 0;
    }

    /**
     * Метод, регистрирующий новый коллбек в диспетчере.
     * @param newCallback - функция-коллбек
     */
    register(newCallback: objectFunction) {
        this._callbacks.set(this._lastId++, {callback: newCallback, isPending: false});
    }

    /**
     * Метод, удаляющий регистрацию коллбека.
     * @param id - идентификатор коллбека
     */
    unregister(id: number) {
        if (this._callbacks.has(id)) {
            this._callbacks.delete(id);
            return;
        }
        throw new Error('Dispatcher: не существует запрошенного callback');
    }

    /**
     * Метод, организующий рассылку.
     * @param payload - данные для передачи в стор
     */
    dispatch(payload: object) {
        if (this.isDispatching()) {
            throw new Error('Dispatcher: метод dispatch должен быть запущен при выключенном Dispatcher');
        }

        this._startDispatching(payload);

        try {
            for (const [key, value] of this._callbacks) {
                if (value.isPending) {
                    continue;
                }
                this._invokeCallback(key);
            }
        } finally {
            this._stopDispatching();
        }
    }

    /**
     * Метод, возвращающий статус рассылки: активная или нет
     * @returns статус активности рассылки диспетчера
     */
    isDispatching() {
        return this._isDispatching;
    }

    /**
     * Метод, вызывающий функцию коллбека у id.
     * @param id - идентификатор коллбека
     */
    _invokeCallback(id: number) {
        this._callbacks.get(id)!.isPending = true;
        this._callbacks.get(id)!.callback(this._pendingPayload);
    }

    /**
     * Метод, инициирующий рассылку действий.
     * @param payload - данные для передачи в стор
     */
    _startDispatching(payload: object) {
        for (const value of this._callbacks.values()) {
            value.isPending = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    }

    /**
     * Метод, завершающий рассылку действий.
     */
    _stopDispatching() {
        delete this._pendingPayload;
        this._isDispatching = false;
    }
}

export default new Dispatcher();
