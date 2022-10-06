'use strict';

import HeaderComponent from '../components/Header/Header.js';

export default class RefreshEl {

    refreshHeader = (context) => {
        if (context.authorised === true) {
            const headerProfile = document.querySelector('.header__profile');
            headerProfile.addEventListener("mouseover", async (event) => {

                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'block';

            });

            headerProfile.addEventListener("mouseout", async (event) => {
                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'none';
            });
        }
    }
}