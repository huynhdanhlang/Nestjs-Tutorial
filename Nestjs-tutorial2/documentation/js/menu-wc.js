'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-typescript-starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' : 'data-target="#xs-controllers-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' : 'data-target="#xs-injectables-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-984833bc63ead1ee6ef4212e0e50c9793518355be9db6daf9b6712bc97a2711492e232a2a594696efcb3bbce924894339eae3df8c85ffe65a2013f890bb04282"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationServices</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtTwoFactorStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/jwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >jwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' : 'data-target="#xs-controllers-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' :
                                            'id="xs-controllers-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' : 'data-target="#xs-injectables-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' :
                                        'id="xs-injectables-links-module-CategoryModule-b8c2bb5d00cd8d844391a6fe83c7b3e8f2bb8a019e26d285150cdd05503aef5c0a2a0bd5dd779701e8018840dccc8a73cb2645e0969491bcf04046d2d9b2c0e2"' }>
                                        <li class="link">
                                            <a href="injectables/categoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >categoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChargeModule.html" data-type="entity-link" >ChargeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ChargeModule-f9b417cdb581e0aa437efae2f03d7799f72fd90de0e1b7018ac5f36b19eb9fa1fa7fbbbc7f93f86653f79f3d4287f9dcf64e7c48fb2ca2d949c9d52a65a5baf5"' : 'data-target="#xs-controllers-links-module-ChargeModule-f9b417cdb581e0aa437efae2f03d7799f72fd90de0e1b7018ac5f36b19eb9fa1fa7fbbbc7f93f86653f79f3d4287f9dcf64e7c48fb2ca2d949c9d52a65a5baf5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChargeModule-f9b417cdb581e0aa437efae2f03d7799f72fd90de0e1b7018ac5f36b19eb9fa1fa7fbbbc7f93f86653f79f3d4287f9dcf64e7c48fb2ca2d949c9d52a65a5baf5"' :
                                            'id="xs-controllers-links-module-ChargeModule-f9b417cdb581e0aa437efae2f03d7799f72fd90de0e1b7018ac5f36b19eb9fa1fa7fbbbc7f93f86653f79f3d4287f9dcf64e7c48fb2ca2d949c9d52a65a5baf5"' }>
                                            <li class="link">
                                                <a href="controllers/ChargeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChargeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChatModule-e81ac7368f179d4161fb0200e946e352639b0502ac1a48c9e0cbca5dc618067e4f8c60a02f0fe02774fa676ebf4cce0de40715824d02475b84b98e612a4faca4"' : 'data-target="#xs-injectables-links-module-ChatModule-e81ac7368f179d4161fb0200e946e352639b0502ac1a48c9e0cbca5dc618067e4f8c60a02f0fe02774fa676ebf4cce0de40715824d02475b84b98e612a4faca4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-e81ac7368f179d4161fb0200e946e352639b0502ac1a48c9e0cbca5dc618067e4f8c60a02f0fe02774fa676ebf4cce0de40715824d02475b84b98e612a4faca4"' :
                                        'id="xs-injectables-links-module-ChatModule-e81ac7368f179d4161fb0200e946e352639b0502ac1a48c9e0cbca5dc618067e4f8c60a02f0fe02774fa676ebf4cce0de40715824d02475b84b98e612a4faca4"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreditCardsModule.html" data-type="entity-link" >CreditCardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CreditCardsModule-de7812c80e4bf5b06135f642db3d82c65db37c08878410ebbab1a7e419aafe0b78c5b507b0f7f8ce4a4d8592eadfd44a4dc6ea7743866c2d5b8e0669b0237cab"' : 'data-target="#xs-controllers-links-module-CreditCardsModule-de7812c80e4bf5b06135f642db3d82c65db37c08878410ebbab1a7e419aafe0b78c5b507b0f7f8ce4a4d8592eadfd44a4dc6ea7743866c2d5b8e0669b0237cab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CreditCardsModule-de7812c80e4bf5b06135f642db3d82c65db37c08878410ebbab1a7e419aafe0b78c5b507b0f7f8ce4a4d8592eadfd44a4dc6ea7743866c2d5b8e0669b0237cab"' :
                                            'id="xs-controllers-links-module-CreditCardsModule-de7812c80e4bf5b06135f642db3d82c65db37c08878410ebbab1a7e419aafe0b78c5b507b0f7f8ce4a4d8592eadfd44a4dc6ea7743866c2d5b8e0669b0237cab"' }>
                                            <li class="link">
                                                <a href="controllers/CreditCardsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreditCardsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailConfirmationModule.html" data-type="entity-link" >EmailConfirmationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' : 'data-target="#xs-controllers-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' :
                                            'id="xs-controllers-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' }>
                                            <li class="link">
                                                <a href="controllers/EmailConfirmationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' : 'data-target="#xs-injectables-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' :
                                        'id="xs-injectables-links-module-EmailConfirmationModule-5341bbd5a87911cc537c294b848f26e3443cad6ea9a8d33e2404409b003225fdbed67fe55127764d828626c18d0f4c8c50e094f1f2dd0362cedf9638db60e9c6"' }>
                                        <li class="link">
                                            <a href="injectables/EmailConfirmationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-f8ce8de95d4707e13d93d262fd82a9adca85413ad628d063b2cfd892c72fcda8fd821ec6e49e18b6fd9c245c9c5e1e0baa31462f8cf6a4ff7f3592ce19a22998"' : 'data-target="#xs-injectables-links-module-EmailModule-f8ce8de95d4707e13d93d262fd82a9adca85413ad628d063b2cfd892c72fcda8fd821ec6e49e18b6fd9c245c9c5e1e0baa31462f8cf6a4ff7f3592ce19a22998"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-f8ce8de95d4707e13d93d262fd82a9adca85413ad628d063b2cfd892c72fcda8fd821ec6e49e18b6fd9c245c9c5e1e0baa31462f8cf6a4ff7f3592ce19a22998"' :
                                        'id="xs-injectables-links-module-EmailModule-f8ce8de95d4707e13d93d262fd82a9adca85413ad628d063b2cfd892c72fcda8fd821ec6e49e18b6fd9c245c9c5e1e0baa31462f8cf6a4ff7f3592ce19a22998"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSchedulingModule.html" data-type="entity-link" >EmailSchedulingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailSchedulingModule-d4dfcb2a2fc246881597803391ce31710297d4e1dcd797c7f0e630484b9cc35de9047087adc4965d8171e37436a61a462b96136b3928335e2f7a5ad9cc215c43"' : 'data-target="#xs-injectables-links-module-EmailSchedulingModule-d4dfcb2a2fc246881597803391ce31710297d4e1dcd797c7f0e630484b9cc35de9047087adc4965d8171e37436a61a462b96136b3928335e2f7a5ad9cc215c43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailSchedulingModule-d4dfcb2a2fc246881597803391ce31710297d4e1dcd797c7f0e630484b9cc35de9047087adc4965d8171e37436a61a462b96136b3928335e2f7a5ad9cc215c43"' :
                                        'id="xs-injectables-links-module-EmailSchedulingModule-d4dfcb2a2fc246881597803391ce31710297d4e1dcd797c7f0e630484b9cc35de9047087adc4965d8171e37436a61a462b96136b3928335e2f7a5ad9cc215c43"' }>
                                        <li class="link">
                                            <a href="injectables/EmailSchedulingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSchedulingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileModule.html" data-type="entity-link" >FileModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FileModule-cda51c8b9fdd8db9f45296e73ca0351101bcf0a2db8788e79eb0c2c4e25c8823b0f967cc2a19881e074d8f03cd258ec4f59b12cd970a1a9fb11c98332e88e3fc"' : 'data-target="#xs-injectables-links-module-FileModule-cda51c8b9fdd8db9f45296e73ca0351101bcf0a2db8788e79eb0c2c4e25c8823b0f967cc2a19881e074d8f03cd258ec4f59b12cd970a1a9fb11c98332e88e3fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileModule-cda51c8b9fdd8db9f45296e73ca0351101bcf0a2db8788e79eb0c2c4e25c8823b0f967cc2a19881e074d8f03cd258ec4f59b12cd970a1a9fb11c98332e88e3fc"' :
                                        'id="xs-injectables-links-module-FileModule-cda51c8b9fdd8db9f45296e73ca0351101bcf0a2db8788e79eb0c2c4e25c8823b0f967cc2a19881e074d8f03cd258ec4f59b12cd970a1a9fb11c98332e88e3fc"' }>
                                        <li class="link">
                                            <a href="injectables/FileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleAuthenticationModule.html" data-type="entity-link" >GoogleAuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' : 'data-target="#xs-controllers-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' :
                                            'id="xs-controllers-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' }>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' : 'data-target="#xs-injectables-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' :
                                        'id="xs-injectables-links-module-GoogleAuthenticationModule-c5c8ddf5e9ba9d049fac6b3861f00b2469419338d5efe968242a400525465d06432a08b84fb20560f7cccc3674167090b5175331ca4ceb3431c5ac9a9b428517"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-f08d388c62aa70102f264e4e22e147fe52b06719965aebd53064058fc6b440a0b76d6f0c44e81d7991681b9e439728caf065d9bd5c738d37694f2f30b42a6472"' : 'data-target="#xs-injectables-links-module-LoggerModule-f08d388c62aa70102f264e4e22e147fe52b06719965aebd53064058fc6b440a0b76d6f0c44e81d7991681b9e439728caf065d9bd5c738d37694f2f30b42a6472"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-f08d388c62aa70102f264e4e22e147fe52b06719965aebd53064058fc6b440a0b76d6f0c44e81d7991681b9e439728caf065d9bd5c738d37694f2f30b42a6472"' :
                                        'id="xs-injectables-links-module-LoggerModule-f08d388c62aa70102f264e4e22e147fe52b06719965aebd53064058fc6b440a0b76d6f0c44e81d7991681b9e439728caf065d9bd5c738d37694f2f30b42a6472"' }>
                                        <li class="link">
                                            <a href="injectables/CustomLogger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLogger</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OptimizeModule.html" data-type="entity-link" >OptimizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OptimizeModule-ba6df9a115c3d5115052d6840fb691b539580b859dab06b642168c26ce7c21ecc8f91c8d0a52626982bf5b6dccfe1e06fbd17b5e4fc7259817db82520ade0827"' : 'data-target="#xs-controllers-links-module-OptimizeModule-ba6df9a115c3d5115052d6840fb691b539580b859dab06b642168c26ce7c21ecc8f91c8d0a52626982bf5b6dccfe1e06fbd17b5e4fc7259817db82520ade0827"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OptimizeModule-ba6df9a115c3d5115052d6840fb691b539580b859dab06b642168c26ce7c21ecc8f91c8d0a52626982bf5b6dccfe1e06fbd17b5e4fc7259817db82520ade0827"' :
                                            'id="xs-controllers-links-module-OptimizeModule-ba6df9a115c3d5115052d6840fb691b539580b859dab06b642168c26ce7c21ecc8f91c8d0a52626982bf5b6dccfe1e06fbd17b5e4fc7259817db82520ade0827"' }>
                                            <li class="link">
                                                <a href="controllers/OptimizeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptimizeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' : 'data-target="#xs-controllers-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' :
                                            'id="xs-controllers-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' : 'data-target="#xs-injectables-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' :
                                        'id="xs-injectables-links-module-PostsModule-07cda6cc5d64c0cd23aedbfa7cf140c32f0e6d2dc77ee98842ae5e0a6989871bfb7877343a108b7581f69c5a4a4fcb4decd1e4cba45eb510b2350284e1f8d571"' }>
                                        <li class="link">
                                            <a href="injectables/PostSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostSearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivateFilesModule.html" data-type="entity-link" >PrivateFilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrivateFilesModule-976f4eeae3cb7e8af200d50631f9869dfddaf7cb699ebe20e5a297b18206c8a8b5aca3d2b81b8aab06ae2d960043317ffef6d1538c90a56fae6369c985f79643"' : 'data-target="#xs-injectables-links-module-PrivateFilesModule-976f4eeae3cb7e8af200d50631f9869dfddaf7cb699ebe20e5a297b18206c8a8b5aca3d2b81b8aab06ae2d960043317ffef6d1538c90a56fae6369c985f79643"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrivateFilesModule-976f4eeae3cb7e8af200d50631f9869dfddaf7cb699ebe20e5a297b18206c8a8b5aca3d2b81b8aab06ae2d960043317ffef6d1538c90a56fae6369c985f79643"' :
                                        'id="xs-injectables-links-module-PrivateFilesModule-976f4eeae3cb7e8af200d50631f9869dfddaf7cb699ebe20e5a297b18206c8a8b5aca3d2b81b8aab06ae2d960043317ffef6d1538c90a56fae6369c985f79643"' }>
                                        <li class="link">
                                            <a href="injectables/PrivateFileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivateFileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductCategoriesModule.html" data-type="entity-link" >ProductCategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductCategoriesModule-1c04c8856b4856fd552831bebb4cb1cad1f0c1c19a09debfd89d29f685292b22db496b2a4e6b49a5be0758813642c7811ffa3c51f133674a498376aa7e952cd8"' : 'data-target="#xs-controllers-links-module-ProductCategoriesModule-1c04c8856b4856fd552831bebb4cb1cad1f0c1c19a09debfd89d29f685292b22db496b2a4e6b49a5be0758813642c7811ffa3c51f133674a498376aa7e952cd8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductCategoriesModule-1c04c8856b4856fd552831bebb4cb1cad1f0c1c19a09debfd89d29f685292b22db496b2a4e6b49a5be0758813642c7811ffa3c51f133674a498376aa7e952cd8"' :
                                            'id="xs-controllers-links-module-ProductCategoriesModule-1c04c8856b4856fd552831bebb4cb1cad1f0c1c19a09debfd89d29f685292b22db496b2a4e6b49a5be0758813642c7811ffa3c51f133674a498376aa7e952cd8"' }>
                                            <li class="link">
                                                <a href="controllers/ProductCategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-82fe32716c68434ad00232e9aa1a26d68291334e1b37dde2b3cac3caa288183a39aff0fc213ddc52497cc0be532136a6227acdf23d66fbe7c34634f342cccca2"' : 'data-target="#xs-controllers-links-module-ProductsModule-82fe32716c68434ad00232e9aa1a26d68291334e1b37dde2b3cac3caa288183a39aff0fc213ddc52497cc0be532136a6227acdf23d66fbe7c34634f342cccca2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-82fe32716c68434ad00232e9aa1a26d68291334e1b37dde2b3cac3caa288183a39aff0fc213ddc52497cc0be532136a6227acdf23d66fbe7c34634f342cccca2"' :
                                            'id="xs-controllers-links-module-ProductsModule-82fe32716c68434ad00232e9aa1a26d68291334e1b37dde2b3cac3caa288183a39aff0fc213ddc52497cc0be532136a6227acdf23d66fbe7c34634f342cccca2"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SmsModule.html" data-type="entity-link" >SmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' : 'data-target="#xs-controllers-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' :
                                            'id="xs-controllers-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' }>
                                            <li class="link">
                                                <a href="controllers/SmsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' : 'data-target="#xs-injectables-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' :
                                        'id="xs-injectables-links-module-SmsModule-4627844163e4fd5bdaf7925c76d6d2eaa674a33423362704404c0938ac1e14c358b6ab43a98043b6c414498332250883b82bc3faf9a272412fbc544962733a57"' }>
                                        <li class="link">
                                            <a href="injectables/SmsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeModule.html" data-type="entity-link" >StripeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StripeModule-73540bdc937a22305cb3cf8f77e513334dceb33eaadb045102899df906b2c7f50bf4656cb332e55f9382d98ba704acd9a33299556161c03723cdf0d75bd37b22"' : 'data-target="#xs-injectables-links-module-StripeModule-73540bdc937a22305cb3cf8f77e513334dceb33eaadb045102899df906b2c7f50bf4656cb332e55f9382d98ba704acd9a33299556161c03723cdf0d75bd37b22"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StripeModule-73540bdc937a22305cb3cf8f77e513334dceb33eaadb045102899df906b2c7f50bf4656cb332e55f9382d98ba704acd9a33299556161c03723cdf0d75bd37b22"' :
                                        'id="xs-injectables-links-module-StripeModule-73540bdc937a22305cb3cf8f77e513334dceb33eaadb045102899df906b2c7f50bf4656cb332e55f9382d98ba704acd9a33299556161c03723cdf0d75bd37b22"' }>
                                        <li class="link">
                                            <a href="injectables/StripeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeWebhookModule.html" data-type="entity-link" >StripeWebhookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StripeWebhookModule-f1328bad4159e0f9f55d9586979f37393b7abd63b8375159df68b8c35085a1098ff73daed3a9a4130c518766ce1e9b10b03b262cc2426cc880c1cac0b275301f"' : 'data-target="#xs-controllers-links-module-StripeWebhookModule-f1328bad4159e0f9f55d9586979f37393b7abd63b8375159df68b8c35085a1098ff73daed3a9a4130c518766ce1e9b10b03b262cc2426cc880c1cac0b275301f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StripeWebhookModule-f1328bad4159e0f9f55d9586979f37393b7abd63b8375159df68b8c35085a1098ff73daed3a9a4130c518766ce1e9b10b03b262cc2426cc880c1cac0b275301f"' :
                                            'id="xs-controllers-links-module-StripeWebhookModule-f1328bad4159e0f9f55d9586979f37393b7abd63b8375159df68b8c35085a1098ff73daed3a9a4130c518766ce1e9b10b03b262cc2426cc880c1cac0b275301f"' }>
                                            <li class="link">
                                                <a href="controllers/StripeWebhookController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripeWebhookController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscriptionsModule.html" data-type="entity-link" >SubscriptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SubscriptionsModule-cf0d46c128c3b05e301f1f831590f8cf4c08bb5bf15ab33ab66b96688fb40b30df46e3da412b29e4ee98869a4d7c6253ed29936a8d42096707b224ce1096b79a"' : 'data-target="#xs-controllers-links-module-SubscriptionsModule-cf0d46c128c3b05e301f1f831590f8cf4c08bb5bf15ab33ab66b96688fb40b30df46e3da412b29e4ee98869a4d7c6253ed29936a8d42096707b224ce1096b79a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscriptionsModule-cf0d46c128c3b05e301f1f831590f8cf4c08bb5bf15ab33ab66b96688fb40b30df46e3da412b29e4ee98869a4d7c6253ed29936a8d42096707b224ce1096b79a"' :
                                            'id="xs-controllers-links-module-SubscriptionsModule-cf0d46c128c3b05e301f1f831590f8cf4c08bb5bf15ab33ab66b96688fb40b30df46e3da412b29e4ee98869a4d7c6253ed29936a8d42096707b224ce1096b79a"' }>
                                            <li class="link">
                                                <a href="controllers/SubscriptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' : 'data-target="#xs-controllers-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' :
                                            'id="xs-controllers-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' : 'data-target="#xs-injectables-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' :
                                        'id="xs-injectables-links-module-UserModule-517940edccdd8ad4f8345cef843923ecc687e6ea52b6e72ed8159b29649cb00d858ac9c9e5d7f1924a74a8a84ab02643bd7cfc75c2b3ea71007c63faabb577bb"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChargeController.html" data-type="entity-link" >ChargeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CreditCardsController.html" data-type="entity-link" >CreditCardsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailModuleController.html" data-type="entity-link" >EmailModuleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductCategoriesController.html" data-type="entity-link" >ProductCategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SmsController.html" data-type="entity-link" >SmsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StripeWebhookController.html" data-type="entity-link" >StripeWebhookController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscriptionsController.html" data-type="entity-link" >SubscriptionsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Log.html" data-type="entity-link" >Log</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Message.html" data-type="entity-link" >Message</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrivateFile.html" data-type="entity-link" >PrivateFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductCategory.html" data-type="entity-link" >ProductCategory</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PublicFile.html" data-type="entity-link" >PublicFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/StripeEvent.html" data-type="entity-link" >StripeEvent</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddCreditCardDto.html" data-type="entity-link" >AddCreditCardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoriesNotFoundException.html" data-type="entity-link" >CategoriesNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckVerificationCodeDto.html" data-type="entity-link" >CheckVerificationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmEmailDto.html" data-type="entity-link" >ConfirmEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChargeDto.html" data-type="entity-link" >CreateChargeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/createPostDto.html" data-type="entity-link" >createPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductCategoryDto.html" data-type="entity-link" >CreateProductCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseLogger.html" data-type="entity-link" >DatabaseLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailScheduleDto.html" data-type="entity-link" >EmailScheduleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionsLoggerFilter.html" data-type="entity-link" >ExceptionsLoggerFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneParams.html" data-type="entity-link" >FindOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageProcessor.html" data-type="entity-link" >ImageProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectWithDto.html" data-type="entity-link" >ObjectWithDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostNotFoundException.html" data-type="entity-link" >PostNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetDefaultCreditCardDto.html" data-type="entity-link" >SetDefaultCreditCardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenVerificationDto.html" data-type="entity-link" >TokenVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorAuthenticationCodeDto.html" data-type="entity-link" >TwoFactorAuthenticationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/updatePostDto.html" data-type="entity-link" >updatePostDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomLogger.html" data-type="entity-link" >CustomLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailSchedulingService.html" data-type="entity-link" >EmailSchedulingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link" >ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link" >FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthenticationGuard.html" data-type="entity-link" >JwtAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorGuard.html" data-type="entity-link" >JwtTwoFactorGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthentication.html" data-type="entity-link" >LocalAuthentication</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsMiddleware.html" data-type="entity-link" >LogsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsService.html" data-type="entity-link" >LogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostSearchService.html" data-type="entity-link" >PostSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/productCategoriesService.html" data-type="entity-link" >productCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsService.html" data-type="entity-link" >SmsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeService.html" data-type="entity-link" >StripeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/stripeWebhookService.html" data-type="entity-link" >stripeWebhookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/subscriptionsService.html" data-type="entity-link" >subscriptionsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/emailConfirmationGuard.html" data-type="entity-link" >emailConfirmationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BookProperties.html" data-type="entity-link" >BookProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarProperties.html" data-type="entity-link" >CarProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostCountResult.html" data-type="entity-link" >PostCountResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchBody.html" data-type="entity-link" >PostSearchBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchResult.html" data-type="entity-link" >PostSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithRawBody.html" data-type="entity-link" >RequestWithRawBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/verificationTokenPayload.html" data-type="entity-link" >verificationTokenPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});