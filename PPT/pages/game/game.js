// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/game/game.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.
            document.getElementById("players").innerText =
                WinJS.Application.sessionState.player + " vs Windows8: play your turn using the buttons from the first row";

            document.getElementById("buttonrock1").addEventListener("click", this.ButtonRockClickHandler, false);
            document.getElementById("buttonpaper1").addEventListener("click", this.ButtonPaperClickHandler, false);
            document.getElementById("buttonscissors1").addEventListener("click", this.ButtonScissorsClickHandler, false);

            WinJS.Application.sessionState.playCount = 0;
            WinJS.Application.sessionState.playerCount = 0;
            WinJS.Application.sessionState.win8Count = 0;
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            // TODO: Respond to changes in viewState.
        },

        ButtonRockClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("myGameOutput").innerText = "My Choice: Rock";
            document.getElementById("buttonrock1").className = "red";
            document.getElementById("buttonpaper1").className = "div1";
            document.getElementById("buttonscissors1").className = "div1";

            document.getElementById("buttonrock2").className = "div1";
            document.getElementById("buttonpaper2").className = "div1";
            document.getElementById("buttonscissors2").className = "div1";

            var win8Game = Math.floor((Math.random() * 3) + 1);
            switch (win8Game)
            {
                case 1:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Rock";
                    document.getElementById("buttonrock2").className = "red";
                    document.getElementById("result").innerText = "Rock - Rock = tie";
                    break;

                case 2:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Paper";
                    document.getElementById("buttonpaper2").className = "red";
                    document.getElementById("result").innerText = "Paper covers Rock = windows8 wins";
                    var i = WinJS.Application.sessionState.win8Count + 1;
                    WinJS.Application.sessionState.win8Count = i;
                    break;

                case 3:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Scissors";
                    document.getElementById("buttonscissors2").className = "red";
                    document.getElementById("result").innerText = "Rock breaks Scissors = player wins";
                    var i = WinJS.Application.sessionState.playerCount + 1;
                    WinJS.Application.sessionState.playerCount = i;
                    break;
            }
            document.getElementById("playerCount").innerText = WinJS.Application.sessionState.playerCount;
            document.getElementById("win8Count").innerText = WinJS.Application.sessionState.win8Count;
        },

        ButtonPaperClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("myGameOutput").innerText = "My Choice: Paper";
            document.getElementById("buttonrock1").className = "div1";
            document.getElementById("buttonpaper1").className = "red";
            document.getElementById("buttonscissors1").className = "div1";

            document.getElementById("buttonrock2").className = "div1";
            document.getElementById("buttonpaper2").className = "div1";
            document.getElementById("buttonscissors2").className = "div1";

            var win8Game = Math.floor((Math.random() * 3) + 1);
            switch (win8Game) {
                case 1:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Rock";
                    document.getElementById("buttonrock2").className = "red";
                    document.getElementById("result").innerText = "Paper covers Rock = player wins";
                    var i = WinJS.Application.sessionState.playerCount + 1;
                    WinJS.Application.sessionState.playerCount = i;
                    break;

                case 2:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Paper";
                    document.getElementById("buttonpaper2").className = "red";
                    document.getElementById("result").innerText = "Paper - Paper = tie";
                    break;

                case 3:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Scissors";
                    document.getElementById("buttonscissors2").className = "red";
                    document.getElementById("result").innerText = "Scissors cut Paper = windows8 wins";
                    var i = WinJS.Application.sessionState.win8Count + 1;
                    WinJS.Application.sessionState.win8Count = i;
                    break;
            }
            document.getElementById("playerCount").innerText = WinJS.Application.sessionState.playerCount;
            document.getElementById("win8Count").innerText = WinJS.Application.sessionState.win8Count;
        },

        ButtonScissorsClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("myGameOutput").innerText = "My Choice: Scissors";
            document.getElementById("buttonrock1").className = "div1";
            document.getElementById("buttonpaper1").className = "div1";
            document.getElementById("buttonscissors1").className = "red";

            document.getElementById("buttonrock2").className = "div1";
            document.getElementById("buttonpaper2").className = "div1";
            document.getElementById("buttonscissors2").className = "div1";

            var win8Game = Math.floor((Math.random() * 3) + 1);
            switch (win8Game) {
                case 1:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Rock";
                    document.getElementById("buttonrock2").className = "red";
                    document.getElementById("result").innerText = "Rock breaks Scissors = windows8 wins";
                    var i = WinJS.Application.sessionState.win8Count + 1;
                    WinJS.Application.sessionState.win8Count = i;
                    break;

                case 2:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Paper";
                    document.getElementById("buttonpaper2").className = "red";
                    document.getElementById("result").innerText = "Scissors cut Paper = player wins";
                    var i = WinJS.Application.sessionState.playerCount + 1;
                    WinJS.Application.sessionState.playerCount = i;
                    break;

                case 3:
                    document.getElementById("winGameOutput").innerText = "Win8 Choice: Scissors";
                    document.getElementById("buttonscissors2").className = "red";
                    document.getElementById("result").innerText = "Scissors - Scissors = tie";
                    break;
            }
            document.getElementById("playerCount").innerText = WinJS.Application.sessionState.playerCount;
            document.getElementById("win8Count").innerText = WinJS.Application.sessionState.win8Count;
        }
    });
})();
