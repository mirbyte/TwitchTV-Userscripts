// ==UserScript==
// @name        Turbo Subscription Button Remover
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Turbo%20Subscription%20Button%20Remover.js
// @match       *://www.twitch.tv/*
// @grant       none
// @version     2.1
// @author      mirbyte
// @description Edits the Turbo ad banner to be a transparent placeholder. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// @downloadURL https://update.greasyfork.org/scripts/524848/Turbo%20Subscription%20Button%20Remover.user.js
// @updateURL https://update.greasyfork.org/scripts/524848/Turbo%20Subscription%20Button%20Remover.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const HANDLED_ATTR = 'data-turbo-removed';

    const AD_TEXTS = [
        "Go Ad-Free for Free",
        "Poista mainokset ilmaiseksi",
        "Poista mainokset",
        "Get Ad-Free",
        "Go Ad-Free",
        "Try Turbo",
        "Get Turbo"
    ];

    function editAdBanner() {
        document.querySelectorAll(
            `[data-a-target="tw-core-button-label-text"]:not([${HANDLED_ATTR}])`
        ).forEach(label => {
            const text = label.textContent?.trim() ?? '';
            if (!AD_TEXTS.some(t => text.includes(t))) return;

            label.setAttribute(HANDLED_ATTR, '1');
            const button = label.closest('button');
            if (!button) return;
            button.setAttribute(HANDLED_ATTR, '1');

            let navSlot = button;
            for (let i = 0; i < 4; i++) {
                if (navSlot.parentElement && navSlot.parentElement.tagName !== 'BODY') {
                    navSlot = navSlot.parentElement;
                }
            }

            const target = navSlot.offsetWidth < 300 ? navSlot : button;
            target.style.setProperty('display', 'none', 'important');
            target.setAttribute(HANDLED_ATTR, '1');
            console.debug('[TurboRemover] Hidden:', text);
        });

        document.querySelectorAll(`button:not([${HANDLED_ATTR}])`).forEach(button => {
            const text = button.textContent?.trim() ?? '';
            if (!AD_TEXTS.some(t => text.includes(t))) return;

            button.setAttribute(HANDLED_ATTR, '1');

            let navSlot = button;
            for (let i = 0; i < 4; i++) {
                if (navSlot.parentElement && navSlot.parentElement.tagName !== 'BODY') {
                    navSlot = navSlot.parentElement;
                }
            }

            const target = navSlot.offsetWidth < 300 ? navSlot : button;
            target.style.setProperty('display', 'none', 'important');
            target.setAttribute(HANDLED_ATTR, '1');
            console.debug('[TurboRemover] Fallback hidden:', text);
        });
    }

    editAdBanner();

    let debounce;
    const observer = new MutationObserver(() => {
        clearTimeout(debounce);
        debounce = setTimeout(editAdBanner, 150);
    });

    observer.observe(document.body ?? document.documentElement, {
        subtree: true,
        childList: true
    });
})();

