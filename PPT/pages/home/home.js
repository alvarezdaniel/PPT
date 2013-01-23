(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //declaracion de evento correspondiente a link.
            WinJS.Utilities.query("a").listen("click", this.LinkClickEventHandler, false);

            ////devolver el div que hostea el rating control
            //var ratingControlDiv = document.getElementById("ratingControlDiv");

            ////devolver el control rating
            //var ratingControl = ratingControlDiv.winControl;

            ////registrar el evento
            //ratingControl.addEventListener("change", this.RatingChanged, false);

            //devolver el boton y registrar el evento.
            var holaButton = document.getElementById("nombreButton");
            holaButton.addEventListener("click", this.ButtonClickHandler, false);

            document.getElementById("jugarButton").addEventListener("click", this.ButtonJugarClickHandler, false);

        },
        ButtonClickHandler: function (eventInfo) {
            var nombreUsuario = document.getElementById("nombreInput").value;

            if (nombreInput.value != "") {
                var bienvenida = "Hola, " + nombreUsuario + "!, bienvenido al juego de Piedra, Papel o Tijera";
                document.getElementById("outputDiv").innerText = bienvenida;
            }
            else {
                document.getElementById("outputDiv").innerText = "";
            }
        },

        ButtonJugarClickHandler: function (eventInfo) {
            //document.getElementById("outputDiv").innerText = "Jugar";
            if (document.getElementById("nombreInput").value != "") {
                WinJS.Application.sessionState.jugador = document.getElementById("nombreInput").value;
                eventInfo.preventDefault();
                WinJS.Navigation.navigate("/pages/game/game.html");
            }
        },

        RatingChanged: function (eventInfo) {
            var ratingOutput = document.getElementById("ratingOutput");
            ratingOuput.innerText = eventInfo.detail.tentativeRating;
        },

        LinkClickEventHandler: function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.target;
            WinJS.Navigation.navigate(link.href);
        }
    });
})();
