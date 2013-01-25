(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.
            //declaracion de evento correspondiente a link.
            WinJS.Utilities.query("a").listen("click", this.LinkClickEventHandler, false);

            // return the button and register the event
            var nameButton = document.getElementById("nameButton");
            nameButton.addEventListener("click", this.nameButtonClickHandler, false);

            document.getElementById("playButton").addEventListener("click", this.playButtonClickHandler, false);
        },

        nameButtonClickHandler: function (eventInfo) {

            var nameInput = document.getElementById("nameInput");

            if (nameInput.value != "") {
                var welcome = "Hello, " + nameInput.value + "!, welcome to Rock, Paper, Scissors game";
                document.getElementById("outputDiv").innerText = welcome;
            }
            else {
                document.getElementById("outputDiv").innerText = "";
            }
        },

        playButtonClickHandler: function (eventInfo) {

            var nameInput = document.getElementById("nameInput");

            if (nameInput.value != "") {
                WinJS.Application.sessionState.player = nameInput.value;
                eventInfo.preventDefault();
                WinJS.Navigation.navigate("/pages/game/game.html");
            }
        },

        linkClickEventHandler: function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.target;
            WinJS.Navigation.navigate(link.href);
        }
    });
})();
