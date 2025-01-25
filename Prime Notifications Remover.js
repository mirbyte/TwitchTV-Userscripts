// ==UserScript==
// @name        Twitch.tv Amazon Prime Ad Remover
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Prime%20Notifications%20Remover.js
// @match       https://www.twitch.tv/*
// @grant       none
// @version     1.2
// @author      mirbyte
// @description Removes amazon prime ad/button on twitch.tv. Check GitHub page for the demonstration image.
// @icon         https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==


(function() {
    'use strict';
    function removePrime() {
        var primeOffersDiv = document.querySelector('.Layout-sc-1xcs6mc-0.cwtKyw.prime-offers');
        if (primeOffersDiv) {
            primeOffersDiv.remove();
        }
    }
    document.addEventListener('DOMContentLoaded', removePrime);
    // watch for changes in the DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            removePrime();
        });
    });
    observer.observe(document.body, { subtree: true, childList: true });
})();
