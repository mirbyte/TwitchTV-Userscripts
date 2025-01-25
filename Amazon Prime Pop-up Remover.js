// ==UserScript==
// @name        Twitch.tv Prime Pop-up Remover
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/*
// @grant       none
// @version     1.0
// @author      mirbyte (https://github.com/mirbyte)
// @description Removes Amazon Prime overlay ad on Twitch streams. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==

(function() {
    'use strict';
    function fuckPrime() {
        var primeOffersDiv = document.querySelector('.Layout-sc-1xcs6mc-0.bHAUON');
        if (primeOffersDiv) {
            primeOffersDiv.remove();
        }
    }
    document.addEventListener('DOMContentLoaded', fuckPrime);

    // Watch for changes in the DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            fuckPrime();
        });
    });
    observer.observe(document.body, { subtree: true, childList: true });
})();
