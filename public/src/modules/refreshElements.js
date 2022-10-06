'use strict';

import HeaderComponent from "../components/Header/Header";

export default class RefreshEl {

    refreshHeader = (context) => {
        const header = document.getElementById('header');
        header.innerHTML = '';
        context.headerComponent = new HeaderComponent(header);
        context.headerComponent.render(context.authorised);
    }
}