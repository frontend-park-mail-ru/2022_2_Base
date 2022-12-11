import {config} from '../config';
import userStore from '../stores/UserStore';

/**
 * Класс, реализующий работу с запросами.
 */
class Request {
    #headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Origin': 'https://www.reazon.ru',
        'csrf': userStore.getContext(userStore._storeNames.csrf),
    };

    /**
     * Метод, реализующий http-запрос.
     * @param url - адрес, на который будет посылаться запрос
     * @param options - параметры запроса
     * @returns промис запроса
     */
    makeRequest = (url: string, options: object) => {
        return fetch(url, options).then((response) => response.ok ?
            response.json().then((data) => [response.status, data]) :
            [response.status, response.body, response.headers]).catch((error) => [500, error]);
    };

    /**
     * Метод, реализующий запрос GET.
     * @param url - путь URL
     * @returns - промис запроса
     */
    makeGetRequest = async (url: string) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${config.basePath}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос POST.
     * @param url - путь URL
     * @param data - полезная нагрузка запроса
     * @returns промис запроса
     */
    makePostRequest = async (url: string, data: object) => {
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${config.basePath}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос POST.
     * @param url - путь URL
     * @param data - полезная нагрузка запроса
     * @returns промис запроса
     */
    makePostRequestSendAvatar = async (url: string, data: Blob) => {
        const formData = new FormData();
        formData.append('file', data);
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        };
        return this.makeRequest(`${config.basePath}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос DELETE
     * @param url - путь URL
     * @returns промис запроса
     */
    makeDeleteRequest = async (url: string) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${config.basePath}/${url}`, options);
    };
}

export default new Request();
