/**
 * Класс, реализующий работу с запросами.
 */
class Request {
    #baseURL = 'https://www.reazon.ru';
    #headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Origin': 'https://www.reazon.ru',
    };

    /**
     * Метод, реализующий http-запрос.
     * @param {string} url - адрес, на который будет посылаться запрос
     * @param {object} options - параметры запроса
     * @return {Promise<Response>} промис запроса
     */
    makeRequest = (url, options) => {
        return fetch(url, options).then((response) => response.ok ?
            response.json().then((data) => [response.status, data]) :
            [response.status, response.body]).catch((error) => [500, error]);
    };

    /**
     * Метод, реализующий запрос GET.
     * @param {string} url - путь URL
     * @return {Promise<Response>} - промис запроса
     */
    makeGetRequest = async (url) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURL}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос POST.
     * @param {string} url - путь URL
     * @param {object} data - полезная нагрузка запроса
     * @return {Promise<Response>} промис запроса
     */
    makePostRequest = async (url, data) => {
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${this.#baseURL}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос POST.
     * @param {string} url - путь URL
     * @param {object} data - полезная нагрузка запроса
     * @return {Promise<Response>} промис запроса
     */
     makePostRequestSendAva = async (url, data) => {
        const headers = this.#headers;
        headers['Content-Type'] = 'multipart/form-data';
        let formData = new FormData(data); 
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: headers,
            body: formData,
        };
        return this.makeRequest(`${this.#baseURL}/${url}`, options);
    };

    /**
     * Метод, реализующий запрос DELETE
     * @param {string} url - путь URL
     * @return {Promise<Response>} промис запроса
     */
    makeDeleteRequest = async (url) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURL}/${url}`, options);
    };
}

export default new Request();
