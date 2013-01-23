// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/game/game.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("jugadores").innerText =
                WinJS.Application.sessionState.jugador + " vs Windows8";

            document.getElementById("buttonpiedra1").addEventListener("click", this.ButtonPiedraClickHandler, false);
            document.getElementById("buttonpapel1").addEventListener("click", this.ButtonPapelClickHandler, false);
            document.getElementById("buttontijera1").addEventListener("click", this.ButtonTijeraClickHandler, false);

            WinJS.Application.sessionState.cantjugadas = 0;
            WinJS.Application.sessionState.cantJugador = 0;
            WinJS.Application.sessionState.cantWin8 = 0;
          
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            // TODO: Respond to changes in viewState.
        },

        ButtonPiedraClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("mijuegooutput").innerText = "Piedra";

            var juegowin = Math.floor((Math.random() * 3) + 1);

            var res = "";
            switch (juegowin)
            {
                case 1:
                    document.getElementById("juegowinoutput").innerText = "Piedra";
                    document.getElementById("resumen").innerText = "Piedra-Piedra=empate";
                    break;

                case 2:
                    document.getElementById("juegowinoutput").innerText = "Papel";
                    document.getElementById("resumen").innerText = "Papel envuelve Piedra=gana win";
                    var i = WinJS.Application.sessionState.cantWin8 + 1;
                    WinJS.Application.sessionState.cantWin8 = i;
                    break;

                case 3:
                    document.getElementById("juegowinoutput").innerText = "Tijera";
                    document.getElementById("resumen").innerText = "Tijera machucada con Piedra=gana jugador";
                    var i = WinJS.Application.sessionState.cantJugador + 1;
                    WinJS.Application.sessionState.cantJugador = i;
                    break;
            }
            document.getElementById("cantJugador").innerText = WinJS.Application.sessionState.cantJugador;
            document.getElementById("cantWin8").innerText = WinJS.Application.sessionState.cantWin8;
        },

        ButtonPapelClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("mijuegooutput").innerText = "Papel";

            var juegowin = Math.floor((Math.random() * 3) + 1);

            var res = "";
            switch (juegowin) {
                case 1:
                    document.getElementById("juegowinoutput").innerText = "Piedra";
                    document.getElementById("resumen").innerText = "Papel envuelve Piedra=gana jugador";
                    var i = WinJS.Application.sessionState.cantJugador + 1;
                    WinJS.Application.sessionState.cantJugador = i;
                    break;

                case 2:
                    document.getElementById("juegowinoutput").innerText = "Papel";
                    document.getElementById("resumen").innerText = "Papel-Papel=empate";
                    break;

                case 3:
                    document.getElementById("juegowinoutput").innerText = "Tijera";
                    document.getElementById("resumen").innerText = "Tijera corta papel=gana win";
                    var i = WinJS.Application.sessionState.cantWin8 + 1;
                    WinJS.Application.sessionState.cantWin8 = i;
                    break;
            }
            document.getElementById("cantJugador").innerText = WinJS.Application.sessionState.cantJugador;
            document.getElementById("cantWin8").innerText = WinJS.Application.sessionState.cantWin8;
        },

        ButtonTijeraClickHandler: function (eventInfo) {
            eventInfo.preventDefault();
            document.getElementById("mijuegooutput").innerText = "Tijera";

            var juegowin = Math.floor((Math.random() * 3) + 1);

            var res = "";
            switch (juegowin) {
                case 1:
                    document.getElementById("juegowinoutput").innerText = "Piedra";
                    document.getElementById("resumen").innerText = "Piedra machuca Tijera=gana win";
                    var i = WinJS.Application.sessionState.cantWin8 + 1;
                    WinJS.Application.sessionState.cantWin8 = i;
                    break;

                case 2:
                    document.getElementById("juegowinoutput").innerText = "Papel";
                    document.getElementById("resumen").innerText = "Tijera corta Papel=gana jugador";
                    var i = WinJS.Application.sessionState.cantJugador + 1;
                    WinJS.Application.sessionState.cantJugador = i;
                    break;

                case 3:
                    document.getElementById("juegowinoutput").innerText = "Tijera";
                    document.getElementById("resumen").innerText = "Tijera-Tijera=empate";
                    break;
            }
            document.getElementById("cantJugador").innerText = WinJS.Application.sessionState.cantJugador;
            document.getElementById("cantWin8").innerText = WinJS.Application.sessionState.cantWin8;
        }
    });
})();
