// ==UserScript==
// @name        Twitch.tv Prime Pop-up Remover
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Amazon%20Prime%20Pop-up%20Remover.js
// @match       https://www.twitch.tv/*
// @grant       none
// @version     1.3
// @author      mirbyte
// @description Removes Amazon Prime overlay ad on Twitch streams. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==

(function () {
    'use strict';

    const HANDLED_ATTR = 'data-prime-removed';
    const PRIME_EXT_ID = 'd4uvtfdr04uq6raoenvj7m86gdk16v';

    function removePrimeCard() {
        // Dock card — target by extension ID in image src
        document.querySelectorAll(`img[src*="${PRIME_EXT_ID}"]:not([${HANDLED_ATTR}])`).forEach(img => {
            img.setAttribute(HANDLED_ATTR, '1');
            const card = img.closest('.extensions-dock-card') ?? img.closest('[class*="extensions-dock"]');
            if (card) {
                card.setAttribute(HANDLED_ATTR, '1');
                card.style.setProperty('display', 'none', 'important');
                console.debug('[PrimeRemover] Hidden dock card');
            }
        });

        // Collapsed + expanded overlay button — single overlay container confirmed safe to hide
        document.querySelectorAll(`.extensions-video-overlay-size-container:not([${HANDLED_ATTR}])`).forEach(el => {
            el.setAttribute(HANDLED_ATTR, '1');
            el.style.setProperty('display', 'none', 'important');
            console.debug('[PrimeRemover] Hidden video overlay container');
        });

        // Iframe variant fallback
        document.querySelectorAll(`iframe[src*="${PRIME_EXT_ID}"]:not([${HANDLED_ATTR}])`).forEach(iframe => {
            iframe.setAttribute(HANDLED_ATTR, '1');
            const container = iframe.closest('[class*="extensions-dock"]') ?? iframe.parentElement;
            if (container) {
                container.setAttribute(HANDLED_ATTR, '1');
                container.style.setProperty('display', 'none', 'important');
                console.debug('[PrimeRemover] Hidden iframe fallback');
            }
        });
    }

    removePrimeCard();

    let debounce;
    const observer = new MutationObserver(() => {
        clearTimeout(debounce);
        debounce = setTimeout(removePrimeCard, 150);
    });

    observer.observe(document.body ?? document.documentElement, {
        subtree: true,
        childList: true
    });
})();
