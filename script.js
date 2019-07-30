// ==UserScript==
// @name         Simple Cinema Mode
// @namespace    https://greasyfork.org/users/313414
// @version      0.1
// @description  Easily dim all background elements while watching a video.
// @author       Matt-RJ
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    var cinemaDiv;
    createCinemaDiv();

    // Your code here...
    GM_registerMenuCommand("Cinema Mode", function() {
        console.log("Cinema mode enabled.");
        enableCinemaMode();
    }, 'r');

    function enableCinemaMode() {
        // Create div that covers the entire page, and a selected element (the video) is over this div.
        document.body.appendChild(cinemaDiv);

    }

    function createCinemaDiv() {
        cinemaDiv = document.createElement("div");
        cinemaDiv.style.opacity = "0.95";
        cinemaDiv.style.position = "fixed";
        cinemaDiv.style.width = "100%";
        cinemaDiv.style.height = "100%";
        cinemaDiv.style.zIndex = "1000";
        cinemaDiv.style.top = "0px";
        cinemaDiv.style.left = "0px";
        cinemaDiv.style.backgroundColor = "#000000";

        cinemaDiv.addEventListener("click", function(e) {
            e.target.remove();
        })
    }

})();
