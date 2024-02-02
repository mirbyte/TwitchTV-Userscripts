// ==UserScript==
// @name        Twitch.tv Frontpage Autoplay Off
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/
// @grant       none
// @version     1.0
// @author      mirbyte (https://github.com/mirbyte)
// @description Pauses Twitch.tv frontpage carousel video that autoplays recommended streams.
// @icon         https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==

(function() {
    'use strict';

    function fuckoffautoplay() {
        var videoElement = document.querySelector('.Layout-sc-1xcs6mc-0.hTjsXl.front-page-carousel video');
        if (videoElement) {
            videoElement.pause();
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
        fuckoffautoplay();
    });
    // watch for changes in the DOM
    var observerFuckOffAutoplay = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            fuckoffautoplay();
        });
    });
    observerFuckOffAutoplay.observe(document.body, { subtree: true, childList: true });
})();