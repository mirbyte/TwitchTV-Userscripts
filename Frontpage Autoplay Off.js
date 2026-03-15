// ==UserScript==
// @name        Twitch.tv Frontpage Autoplay Off
// @namespace   https://github.com/mirbyte/TwitchTV-Userscripts/edit/main/Frontpage%20Autoplay%20Off.js
// @match       https://www.twitch.tv/
// @grant       none
// @version     1.3
// @author      mirbyte
// @description Pauses Twitch.tv frontpage carousel video that autoplays recommended streams. Check GitHub page for the demonstration image.
// @icon        https://banner2.cleanpng.com/20180513/xie/kisspng-twitch-computer-icons-logo-5af8037d689af0.0981376915262032614285.jpg
// ==/UserScript==


(function () {
    'use strict';

    const HANDLED_ATTR = 'data-autoplay-stopped';

    function isFrontPage() {
        return window.location.pathname === '/' || window.location.pathname === '';
    }

    function interceptVideo(video) {
        if (video.hasAttribute(HANDLED_ATTR)) return;
        video.setAttribute(HANDLED_ATTR, '1');

        video.muted = true;
        video.autoplay = false;
        video.removeAttribute('autoplay');

        if (!video.paused) video.pause();

        video.addEventListener('play', () => {
            // Only block playback if still on front page
            if (isFrontPage()) {
                video.pause();
                console.debug('[AutoplayOff] Intercepted play attempt on front page');
            }
        });

        console.debug('[AutoplayOff] Video intercepted');
    }

    function scanVideos() {
        if (!isFrontPage()) return;
        document.querySelectorAll(`video:not([${HANDLED_ATTR}])`).forEach(interceptVideo);
    }

    scanVideos();

    let debounce;
    const observer = new MutationObserver(() => {
        clearTimeout(debounce);
        debounce = setTimeout(scanVideos, 100);
    });

    observer.observe(document.body ?? document.documentElement, {
        subtree: true,
        childList: true
    });
})();
