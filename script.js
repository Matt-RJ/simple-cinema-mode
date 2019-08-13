// ==UserScript==
// @name         Simple Cinema Mode for YouTube
// @namespace    https://greasyfork.org/users/313414
// @version      1.0
// @description  Dim the background while watching a YouTube video.
// @author       Matt-RJ
// @match        *://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    var cinemaDiv;
    var videoContainer = null;
    var videoContainerOriginalZIndex;
    var countRenderer = null;

    start();

    function start() {
        waitForCountRendererToLoad(function() {
            waitForVideoToLoad(function() {
                createCinemaButton();
            });
        });
    }

    // Ensures that the count renderer (Where the cinema mode button is placed) has loaded.
    function waitForCountRendererToLoad(callback) {
        let countRendererCheck = setInterval(checkIfLoaded, 100);

        function checkIfLoaded() {
            countRenderer = document.getElementById("info-text");
            if (countRenderer !== null) {
                clearInterval(countRendererCheck);
                countRenderer = countRenderer.firstElementChild;
                callback();
            }
        }
    }

    // Ensures that all the relevant DOM elements for the video are loaded before cinema mode is enabled.
    function waitForVideoToLoad(callback) {
        let videoLoadCheck = setInterval(ytdPlayerIsLoaded, 100);

        function ytdPlayerIsLoaded() {
            let ytdPlayer = document.getElementById("ytd-player");
            if (ytdPlayer !== null) {
                clearInterval(videoLoadCheck);
                videoContainer = ytdPlayer.firstElementChild.firstElementChild;
                videoContainerOriginalZIndex = videoContainer.style.zIndex;
                callback();
            }
        }
    }

    function enableCinemaMode() {

        // Creates div that covers the entire page, and a selected element (the video) is pushed in front this div.
        cinemaDiv = document.createElement("div");
        cinemaDiv.classList.add("cinemaDiv");
        cinemaDiv.style.opacity = "0.95";
        cinemaDiv.style.position = "fixed";
        cinemaDiv.style.width = "100%";
        cinemaDiv.style.height = "100%";
        let zIndex = "1000000";
        cinemaDiv.style.zIndex = zIndex.toString();
        cinemaDiv.style.top = "0px";
        cinemaDiv.style.left = "0px";
        cinemaDiv.style.backgroundColor = "#000000";

        // When clicking outside of the video to go back to normal.
        cinemaDiv.addEventListener("click", function(e) {
            e.target.remove();
            // Video div reset to its original z-index once cinema mode is disabled again.
            videoContainer.style.zIndex = videoContainerOriginalZIndex;
        });

        document.body.appendChild(cinemaDiv);

        pushToFront(videoContainer);
    }

    // Returns the highest Z-index out of all the elements on the page.
    function getHighestZIndexOnPage() {
        let highestZIndex = Number.MIN_VALUE;

        let allElements = document.getElementsByTagName("*");

        for (let i = 0; i < allElements.length; i++) {
            let currentZIndex = allElements[i].style.zIndex;
            if (!isNaN(currentZIndex) && currentZIndex > highestZIndex) {
                highestZIndex = currentZIndex;
            }
        }
        return highestZIndex;
    }

    // Sets the z-index of elemToPush to the highest value on the page.
    function pushToFront(elemToPush) {
        elemToPush.style.zIndex = getHighestZIndexOnPage() + 1;
    }

    // Adds a button near the view counter to enable cinema mode.
    function createCinemaButton() {
        let button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Cinema Mode";
        button.style.marginLeft = "10px";
        button.style.color = "#FFFFFF";
        button.style.border = "none";
        button.style.backgroundColor = "#777777";

        button.addEventListener("click", function() {
            enableCinemaMode();
        }, false);

        countRenderer.appendChild(button);
    }

})();
