// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var articlesList;

    //crear variables para botones de navegacion.
    var homeButton, startGameButton;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("C9Data", publicMembers);

            downloadC9BlogFeed();

            args.setPromise(WinJS.UI.processAll().then(x));
        }
    });

    function x() {

        //devolver appbar
        var appbar = document.getElementById("appbar").winControl;

        //adjuntar event handler
        homeButton = appbar.getCommandById("homeButton");
        homeButton.addEventListener("click", goToHome, false);

        if (nav.location) {
            nav.history.current.initialPlaceholder = true;
            return nav.navigate(nav.location, nav.state);
        }
        else {
            return nav.navigate(Application.navigator.home);
        }
    }

    function goToHome(eventInfo) {
        WinJS.Navigation.navigate("/pages/home/home.html");
    }

    function startGame(eventInfo) {
        WinJS.Navigation.navigate("/pages/game/game.html");
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();

function downloadC9BlogFeed() {
    WinJS.xhr({ url: "http://www.pwop.com/feed.aspx?show=dotnetrocks&filetype=master&tags=HTML+5" }).then(function (rss) {
        var items = rss.responseXML.querySelectorAll("item");

        for (var n = 0; n < items.length; n++) {
            var article = {};
            article.title = items[n].querySelector("title").textContent;
            var thumbs = items[n].querySelectorAll("thumbnail");
            if (thumbs.length > 1) {
                article.thumbnail = thumbs[1].attributes.getNamedItem("url").textContent;
                article.content = items[n].textContent;
                articlesList.push(article);
            }
        }
    });
}