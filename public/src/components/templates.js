!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e["Footer.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,o,t,a){return'<link rel="stylesheet" href="./src/components/Footer/Footer.css" type="text/css">\n\n<div class="footer__grid">\n    <div class="text-footer-team">Команда Base</div>\n    <div>\n        <img src="img/Logo.png" alt="FooterLogo">\n    </div>\n    <div class="footer__members">\n        <div class="footer__team-member">\n            <div class="footer__member-name">Артем Колесников</div>\n            <div class="footer__member-contact">\n                <a href=""><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href=""><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href=""><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Елизавета Максимова</div>\n            <div class="footer__member-contact">\n                <a href=""><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href=""><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href=""><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Владислав Пиневич</div>\n            <div class="footer__member-contact">\n                <a href=""><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href=""><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href=""><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n        <div class="footer__team-member">\n            <div class="footer__member-name">Александр Федоров</div>\n            <div class="footer__member-contact">\n                <a href=""><img src="img/VK_logo.png" class="footer__contact-logo" alt="VKLogo"></a>\n                <a href=""><img src="img/TG_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="TGLogo"></a>\n                <a href=""><img src="img/Github_logo.png" class="footer__contact-logo footer__margin-contact-logo" alt="GitHubLogo"></a>\n            </div>\n        </div>\n    </div>\n</div>\n'},useData:!0}),e["Form.hbs"]=n({1:function(n,e,o,t,a){var l=n.lambda,r=n.escapeExpression,n=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'        <div class="form__field">\n            <div class="form__name text-normal-default">\n                '+r(l(null!=e?n(e,"title"):e,e))+'\n            </div>\n            <input class="form__input" type='+r(l(null!=e?n(e,"type"):e,e))+" name="+r(l(null!=e?n(e,"name"):e,e))+" placeholder='"+r(l(null!=e?n(e,"placeholder"):e,e))+"'\n                maxlength="+r(l(null!=e?n(e,"maxlenght"):e,e))+" id="+r(l(null!=e?n(e,"name"):e,e))+">\n        </div>\n"},compiler:[8,">= 4.3.0"],main:function(n,e,o,t,a){var l,r=null!=e?e:n.nullContext||{},s=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<link rel="stylesheet" href="./src/components/Form/Form.css" type="text/css">\n\n<form action="#" method="post" class="form">\n'+(null!=(l=s(o,"each").call(r,null!=e?s(e,"field"):e,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:4,column:4},end:{line:12,column:13}}}))?l:"")+'    <input type="submit" class="button-default form__submit" value='+n.escapeExpression("function"==typeof(l=null!=(l=s(o,"button")||(null!=e?s(e,"button"):e))?l:n.hooks.helperMissing)?l.call(r,{name:"button",hash:{},data:a,loc:{start:{line:13,column:67},end:{line:13,column:77}}}):l)+">\n</form>"},useData:!0}),e["Header.hbs"]=n({1:function(n,e,o,t,a){return'            <a href="#">\n                <img src="./img/Profile.svg" alt="LOGO">\n            </a>\n            <div class="profile__pop-up">\n                <a href="/logout">\n                    <span>Выйти</span>\n                </a>\n            </div>\n'},3:function(n,e,o,t,a){return'            <a href="/login">\n                <img src="./img/Profile.svg" alt="LOGO">\n            </a>\n'},compiler:[8,">= 4.3.0"],main:function(n,e,o,t,a){var l=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<link rel="stylesheet" href="./src/components/Header/Header.css" type="text/css">\n\n<div class="header__left">\n    <div class="header__logotip">\n        <a href="/main">\n            <img src="img/Logo.png" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__catalog">\n        <a href="" class="button-default header__button-catalog paint-purple">\n            <img type="image" src="./img/Catalog.svg" class="header__catalog-img" alt="CAT">\n            Каталог\n        </a>\n    </div>\n    <div class="header__search-line">\n        <input type="search" class="header__form-search" name="search-line"\n               placeholder="Что Вас интересует?" maxlength="75">\n        <a href="" class="header__button-search paint-purple">\n            <img type="image" src="./img/Search.svg" alt="Search">\n        </a>\n    </div>\n</div>\n<div class="header__right">\n    <div class="header__order">\n        <a href="">\n            <img src="./img/Orders.svg" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__favourites">\n        <a href="">\n            <img src="./img/Favourites.svg" alt="LOGO">\n        </a>\n    </div>\n    <div class="header__card">\n        <a href="">\n            <img src="img/Cart.svg" alt="LOGO">\n        </a>\n    </div>\n\n    <div class="header__profile">\n'+(null!=(o=l(o,"if").call(null!=e?e:n.nullContext||{},null!=e?l(e,"session"):e,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a,loc:{start:{line:41,column:8},end:{line:54,column:15}}}))?o:"")+"    </div>\n</div>"},useData:!0}),e["ItemCard.hbs"]=n({1:function(n,e,o,t,a){return'            <div class="content__sales-value">\n                12%\n            </div>\n'},3:function(n,e,o,t,a){var l=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'            <span class="text-normal-default item-card__text-strikethrough">\n                    '+n.escapeExpression("function"==typeof(o=null!=(o=l(o,"salePrice")||(null!=e?l(e,"salePrice"):e))?o:n.hooks.helperMissing)?o.call(null!=e?e:n.nullContext||{},{name:"salePrice",hash:{},data:a,loc:{start:{line:19,column:20},end:{line:19,column:33}}}):o)+"₽\n                </span>\n"},compiler:[8,">= 4.3.0"],main:function(n,e,o,t,a){var l,r=null!=e?e:n.nullContext||{},s=n.escapeExpression,c=n.hooks.helperMissing,i="function",m=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<link rel="stylesheet" href="./src/components/ItemCard/ItemCard.css" type="text/css">\n\n<a href="" class="item-card__top">\n    <div class="text-normal-small content__sales-image">\n        <img src="./img/items_photo/iPhone.png" alt="iPhone 13">\n'+(null!=(l=m(o,"if").call(r,null!=e?m(e,"salePrice"):e,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:6,column:8},end:{line:10,column:15}}}))?l:"")+'    </div>\n\n    <div class="item-card__textbox">\n                <span class="text-normal-large">\n                    '+s(n.lambda(null!=e?m(e,"price"):e,e))+"₽\n                </span>\n"+(null!=(l=m(o,"if").call(r,null!=e?m(e,"salePrice"):e,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:17,column:8},end:{line:21,column:15}}}))?l:"")+'        <span class="text-normal-default item-card__title">\n            '+s(typeof(n=null!=(n=m(o,"cardTitle")||(null!=e?m(e,"cardTitle"):e))?n:c)==i?n.call(r,{name:"cardTitle",hash:{},data:a,loc:{start:{line:23,column:12},end:{line:23,column:25}}}):n)+'\n        </span>\n    </div>\n</a>\n\n<div class="item-card__bottom">\n    <button type="button" class="button-default button_add-to-card">В корзину\n    </button>\n    <button type="button" class="item-card__rating">\n        <img src="img/Star.svg" alt="S" class="rating-icon">\n        <span class="text-normal-default-bold">\n            '+s(typeof(n=null!=(n=m(o,"rating")||(null!=e?m(e,"rating"):e))?n:c)==i?n.call(r,{name:"rating",hash:{},data:a,loc:{start:{line:34,column:12},end:{line:34,column:22}}}):n)+"\n        </span>\n    </button>\n</div>"},useData:!0}),e["TopCategory.hbs"]=n({1:function(n,e,o,t,a){var l=n.lambda,r=n.escapeExpression,n=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'    <a class="item-top-cards text-normal-default" href="">\n        <img src='+r(l(null!=e?n(e,"img"):e,e))+" alt="+r(l(null!=e?n(e,"key"):e,e))+">\n        <p>"+r(l(null!=e?n(e,"nameCategory"):e,e))+"</p>\n    </a>\n"},compiler:[8,">= 4.3.0"],main:function(n,e,o,t,a){var l=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<link rel="stylesheet" href="./src/components/TopCategory/TopCategory.css" type="text/css">\n\n'+(null!=(o=l(o,"each").call(null!=e?e:n.nullContext||{},null!=e?l(e,"category"):e,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:3,column:0},end:{line:8,column:9}}}))?o:"")},useData:!0})}();