// ==UserScript==
// @name        Turbo Subscription Button Remover
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Turbo%20Subscription%20Button%20Remover.js
// @match       *://www.twitch.tv/*
// @grant       none
// @version     1.6
// @author      mirbyte
// @description Edits the Turbo ad banner to be a transparent placeholder. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==

(function() {
    'use strict';

    function editAdBanner() {
        // Target button
        var adButton = document.querySelector('.Layout-sc-1xcs6mc-0.hatIYF [data-a-target="tw-core-button-label-text"]');
        var adButtonTexts = [
            "Go Ad-Free for Free",
            "Slip gratis for reklamer",
            "Kostenlos werbefrei zuschauen",
            "Dile adiós a publicidad de forma gratuita",
            "Regardez sans publicité gratuitement",
            "Poista mainokset ilmaiseksi",
            // add more languages here
        ];

        if (adButton && adButtonTexts.includes(adButton.textContent.trim())) {
            var adContainer = adButton.closest('.Layout-sc-1xcs6mc-0.hatIYF');
            if (adContainer) {
                adContainer.innerHTML = `
                    <button class="ScCoreButton-sc-ocjdkq-0 kIbAir ScButtonIcon-sc-9yap0r-0 eSFFfM" aria-label="Placeholder" style="background: transparent; border: none; padding: 0; margin: 0;">
                        <div class="ButtonIconFigure-sc-1emm8lf-0 buvMbr">
                            <div class="ScIconLayout-sc-1q25cff-0 cASLMj">
                                <div class="ScAspectRatio-sc-18km980-1 doeqbO tw-aspect">
                                    <div class="ScAspectSpacer-sc-18km980-0 bIDIFh"></div>
                                </div>
                            </div>
                        </div>
                    </button>
                `;

                //adContainer.style.width = 'auto';
                //adContainer.style.height = 'auto';
                //adContainer.style.padding = '0';
                //adContainer.style.margin = '0';
                //adContainer.style.backgroundColor = 'transparent';
                //adContainer.style.border = 'none';
            }
        }
    }

    editAdBanner();

    // Observer to handle dynamic changes in the DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            editAdBanner();
        });
    });
    observer.observe(document.body, { subtree: true, childList: true });
})();
