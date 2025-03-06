// ==UserScript==
// @name        Turbo Subscription Button Remover
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Turbo%20Subscription%20Button%20Remover.js
// @match       *://www.twitch.tv/*
// @grant       none
// @version     1.9
// @author      mirbyte
// @description Edits the Turbo ad banner to be a transparent placeholder. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// @downloadURL https://update.greasyfork.org/scripts/524848/Turbo%20Subscription%20Button%20Remover.user.js
// @updateURL https://update.greasyfork.org/scripts/524848/Turbo%20Subscription%20Button%20Remover.meta.js
// ==/UserScript==

(function() {
    'use strict';

    function editAdBanner() {
        const adButtons = document.querySelectorAll('[data-a-target="tw-core-button-label-text"]');
        const adButtonTexts = [
            "Go Ad-Free for Free",
            "Poista mainokset ilmaiseksi",
            "Poista mainokset",
            "Get Ad-Free",
            "Go Ad-Free",
            // add more here
        ];

        let bannerReplaced = false;

        adButtons.forEach(adButton => {
            if (adButton && adButtonTexts.includes(adButton.textContent.trim())) {
                const adContainer = adButton.closest('.InjectLayout-sc-1i43xsx-0.kBtJDm');
                if (adContainer) {
                    adContainer.innerHTML = `
                        <div style="background: transparent; border: none; padding: 0; margin: 0; width: 100%; height: 100%;"></div>
                    `;
                    console.log("Turbo Subscription Banner found.");
                    bannerReplaced = true;
                } else {
                    // console.warn("Turbo Subscription Banner container not found.");
                }
            }
        });

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
