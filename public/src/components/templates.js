!function(){var n=Handlebars.template,t=Handlebars.templates=Handlebars.templates||{};t["Footer.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,t,e,o,a){return'<link rel="stylesheet" href="./src/components/Footer/Footer.css" type="text/css">\n\n<div class="footer__grid">\n    <div>\n        <img src="img/Logo.png" alt="FooterLogo">\n    </div>\n    <div class="footer__members">\n        <div class="footer__team-member">\n            <div class="footer__member-name">Артем Колесников</div>\n            <div class="footer__member-contact">\n                <a href="https://vk.com/sunbringer"><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href="https://t.me/EuphoriaAbsorber"><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href="https://github.com/EuphoriaAbsorber"><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Елизавета Максимова</div>\n            <div class="footer__member-contact">\n                <a href="https://vk.com/liza1040"><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href="https://t.me/liza1040"><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href="https://github.com/Liza1040"><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Владислав Пиневич</div>\n            <div class="footer__member-contact">\n                <a href="https://vk.com/tunknownlegend"><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href="https://t.me/tUnknownLegend"><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href="https://github.com/tUnknownLegend"><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Александр Федоров</div>\n            <div class="footer__member-contact">\n                <a href="https://vk.com/thelvv"><img src="img/VK_logo.png" class="footer__contact-logo " alt="VKLogo"></a>\n                <a href="https://t.me/thelvv"><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href="https://github.com/thelvv"><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n    </div>\n</div>\n'},useData:!0}),t["Form.hbs"]=n({1:function(n,t,e,o,a){var l=n.lambda,r=n.escapeExpression,n=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'        <div class="form__field">\n            <div class="form__name text-normal-default">\n                '+r(l(null!=t?n(t,"title"):t,t))+'\n            </div>\n            <input class="form__input" type='+r(l(null!=t?n(t,"type"):t,t))+" name="+r(l(null!=t?n(t,"name"):t,t))+" placeholder='"+r(l(null!=t?n(t,"placeholder"):t,t))+"'\n                maxlength="+r(l(null!=t?n(t,"maxlenght"):t,t))+" id="+r(l(null!=t?n(t,"name"):t,t))+">\n        </div>\n"},compiler:[8,">= 4.3.0"],main:function(n,t,e,o,a){var l,r=null!=t?t:n.nullContext||{},s=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<link rel="stylesheet" href="./src/components/Form/Form.css" type="text/css">\n\n<form action="#" method="post" class="form">\n'+(null!=(l=s(e,"each").call(r,null!=t?s(t,"field"):t,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:4,column:4},end:{line:12,column:13}}}))?l:"")+'    <input type="submit" class="button-default form__submit" value='+n.escapeExpression("function"==typeof(l=null!=(l=s(e,"button")||(null!=t?s(t,"button"):t))?l:n.hooks.helperMissing)?l.call(r,{name:"button",hash:{},data:a,loc:{start:{line:13,column:67},end:{line:13,column:77}}}):l)+' id="submit-result">\n</form>\n'},useData:!0}),t["Header.hbs"]=n({1:function(n,t,e,o,a){return'            <a href="/logout">\n                <img src="./img/Profile.svg" alt="LOGO">\n            </a>\n            <div class="profile__pop-up">\n                <a href="/logout" class="link">\n                    <span>Выйти</span>\n                </a>\n            </div>\n'},3:function(n,t,e,o,a){return'            <a href="/login">\n                <img src="./img/Profile.svg" alt="LOGO">\n            </a>\n'},compiler:[8,">= 4.3.0"],main:function(n,t,e,o,a){var l=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<link rel="stylesheet" href="./src/components/Header/Header.css" type="text/css">\n\n<div class="header__left">\n    <div class="header__logotip">\n        <a href="/main">\n            <img src="img/Logo.png" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__catalog">\n        <a href="" class="button-default header__button-catalog paint-purple-disabled">\n            <img type="image" src="./img/Catalog.svg" class="header__catalog-img" alt="CAT">\n            Каталог\n        </a>\n    </div>\n    <div class="header__search-line">\n        <input type="search" class="header__form-search" name="search-line"\n               placeholder="Что Вас интересует?" maxlength="75">\n        <a href="" class="header__button-search disabled paint-purple ">\n            <img type="image" src="./img/Search.svg" alt="Search">\n        </a>\n    </div>\n</div>\n<div class="header__right">\n    <div class="header__order">\n        <a href="" class="disabled">\n            <img src="./img/Orders.svg" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__favourites">\n        <a href="" class="disabled">\n            <img src="./img/Favourites.svg" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__card">\n        <a href="" class="disabled">\n            <img src="img/Cart.svg" alt="LOGO">\n        </a>\n    </div>\n\n    <div class="header__profile">\n'+(null!=(e=l(e,"if").call(null!=t?t:n.nullContext||{},null!=t?l(t,"session"):t,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a,loc:{start:{line:41,column:8},end:{line:54,column:15}}}))?e:"")+"    </div>\n</div>"},useData:!0}),t["ItemCard.hbs"]=n({1:function(n,t,e,o,a){return'            <div class="content__sales-value">\n                12%\n            </div>\n'},3:function(n,t,e,o,a){var l=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'            <span class="text-normal-default item-card__text-strikethrough">\n                    '+n.escapeExpression("function"==typeof(e=null!=(e=l(e,"salePrice")||(null!=t?l(t,"salePrice"):t))?e:n.hooks.helperMissing)?e.call(null!=t?t:n.nullContext||{},{name:"salePrice",hash:{},data:a,loc:{start:{line:19,column:20},end:{line:19,column:33}}}):e)+"₽\n                </span>\n"},compiler:[8,">= 4.3.0"],main:function(n,t,e,o,a){var l,r=null!=t?t:n.nullContext||{},s=n.escapeExpression,i=n.hooks.helperMissing,c="function",m=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<link rel="stylesheet" href="./src/components/ItemCard/ItemCard.css" type="text/css">\n\n<a href="" class="item-card__top disabled">\n    <div class="text-normal-small content__sales-image">\n        <img src="./img/items_photo/iPhone.png" alt="iPhone 13">\n'+(null!=(l=m(e,"if").call(r,null!=t?m(t,"salePrice"):t,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:6,column:8},end:{line:10,column:15}}}))?l:"")+'    </div>\n\n    <div class="item-card__textbox">\n                <span class="text-normal-large">\n                    '+s(n.lambda(null!=t?m(t,"price"):t,t))+"₽\n                </span>\n"+(null!=(l=m(e,"if").call(r,null!=t?m(t,"salePrice"):t,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:17,column:8},end:{line:21,column:15}}}))?l:"")+'        <span class="text-normal-default item-card__title">\n            '+s(typeof(n=null!=(n=m(e,"cardTitle")||(null!=t?m(t,"cardTitle"):t))?n:i)==c?n.call(r,{name:"cardTitle",hash:{},data:a,loc:{start:{line:23,column:12},end:{line:23,column:25}}}):n)+'\n        </span>\n    </div>\n</a>\n\n<div class="item-card__bottom">\n    <button type="button" class="button-default button_add-to-card paint-purple-disabled" >В корзину\n    </button>\n    <button type="button" class="item-card__rating" disabled>\n        <img src="img/Star.svg" alt="S" class="rating-icon">\n        <span class="text-normal-default-bold">\n            '+s(typeof(n=null!=(n=m(e,"rating")||(null!=t?m(t,"rating"):t))?n:i)==c?n.call(r,{name:"rating",hash:{},data:a,loc:{start:{line:34,column:12},end:{line:34,column:22}}}):n)+"\n        </span>\n    </button>\n</div>"},useData:!0}),t["TopCategory.hbs"]=n({1:function(n,t,e,o,a){var l=n.lambda,r=n.escapeExpression,n=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'    <a class="item-top-cards text-normal-default disabled" href="" >\n        <img src='+r(l(null!=t?n(t,"img"):t,t))+" alt="+r(l(null!=t?n(t,"key"):t,t))+">\n        <p>"+r(l(null!=t?n(t,"nameCategory"):t,t))+"</p>\n    </a>\n"},compiler:[8,">= 4.3.0"],main:function(n,t,e,o,a){var l=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<link rel="stylesheet" href="./src/components/TopCategory/TopCategory.css" type="text/css">\n\n'+(null!=(e=l(e,"each").call(null!=t?t:n.nullContext||{},null!=t?l(t,"category"):t,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:3,column:0},end:{line:8,column:9}}}))?e:"")},useData:!0})}();