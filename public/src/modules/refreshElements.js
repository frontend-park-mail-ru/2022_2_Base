import HeaderComponent from '../components/Header/Header.js';

/**
 * Класс, реализующий перерендеринг элементов
 */
export default class RefreshEl {
    /**
     * Метод, реализующий перерендеринг компонента Header
     * @param {object} context - контекст отрисовки компонента
     */
    refreshHeader = (context) => {
        const header = document.getElementById('header');
        header.innerHTML = '';
        context.headerComponent = new HeaderComponent(header);
        context.headerComponent.render(context.authorised);

        if (context.authorised === true) {
            const headerProfile = document.querySelector('.header__profile');
            headerProfile.addEventListener('mouseover', async (event) => {
                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'block';
            });

            headerProfile.addEventListener('mouseout', async (event) => {
                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'none';
            });
        }
    };
}
