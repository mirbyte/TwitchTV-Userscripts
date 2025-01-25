// ==UserScript==
// @name        Twitch.tv Frontpage Autoplay Off
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Frontpage%20Autoplay%20Off.js
// @match       https://www.twitch.tv/
// @grant       none
// @version     1.0
// @author      mirbyte
// @description Pauses Twitch.tv frontpage carousel video that autoplays recommended streams. Check GitHub page for the demonstration image.
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
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            fuckoffautoplay();
        });
    });
    observer.observe(document.body, { subtree: true, childList: true });
})();
