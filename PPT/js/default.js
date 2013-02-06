(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var startGameButton;
    var articlesList;

    WinJS.Application.sessionState.playCount = 0;
    WinJS.Application.sessionState.playerCount = 0;
    WinJS.Application.sessionState.win8Count = 0;

    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.


            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            document.getElementById("nameButton").addEventListener("click", nameButtonClickHandler, false);
            document.getElementById("playButton").addEventListener("click", playButtonClickHandler, false);
            //document.getElementById("showBlogButton").addEventListener("click", showBlogButtonClickHandler, false);

            document.getElementById("buttonrock1").addEventListener("click", ButtonRockClickHandler, false);
            document.getElementById("buttonpaper1").addEventListener("click", ButtonPaperClickHandler, false);
            document.getElementById("buttonscissors1").addEventListener("click", ButtonScissorsClickHandler, false);

            document.getElementById("selectPlayer").style.display = "";
            document.getElementById("game").style.display = "none";
            //document.getElementById("blogDiv").style.display = "";

            var articlelistElement = document.getElementById("articlelist");
            articlelistElement.addEventListener("iteminvoked", itemInvoked);
            //backbutton.addEventListener("click", backButtonClick);

            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("C9Data", publicMembers);

            articlecontent.style.display = "none";
            articlelist.style.display = "";

            args.setPromise(WinJS.UI.processAll().then(downloadC9BlogFeed));
        }
    };

    function goToHome(eventInfo) {
        WinJS.Navigation.navigate("/pages/home/home.html");
    }

    function startGame(eventInfo) {
        WinJS.Navigation.navigate("/pages/game/game.html");
    }

    function ButtonRockClickHandler(eventInfo) {
        eventInfo.preventDefault();
        document.getElementById("myGameOutput").innerText = "My Choice: Rock";
        document.getElementById("buttonrock1").className = "red";
        document.getElementById("buttonpaper1").className = "div1";
        document.getElementById("buttonscissors1").className = "div1";

        document.getElementById("buttonrock2").className = "div1";
        document.getElementById("buttonpaper2").className = "div1";
        document.getElementById("buttonscissors2").className = "div1";

        var win8Game = Math.floor((Math.random() * 3) + 1);
        switch (win8Game) {
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
    }

    function ButtonPaperClickHandler(eventInfo) {
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
    }

    function ButtonScissorsClickHandler(eventInfo) {
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

    function nameButtonClickHandler(eventInfo) {

        var nameInput = document.getElementById("nameInput");

        if (nameInput.value != "") {
            var welcome = "Hello, " + nameInput.value + "!, welcome to Rock, Paper, Scissors game";
            document.getElementById("outputDiv").innerText = welcome;
        }
        else {
            document.getElementById("outputDiv").innerText = "";
        }
    }

    function playButtonClickHandler(eventInfo) {

        var nameInput = document.getElementById("nameInput");

        if (nameInput.value != "") {
            WinJS.Application.sessionState.player = nameInput.value;
            eventInfo.preventDefault();

            document.getElementById("players").innerText =
                WinJS.Application.sessionState.player + " vs Windows8: play your turn using the buttons from the first row";

            document.getElementById("selectPlayer").style.display = "none";
            document.getElementById("game").style.display = "";
            //document.getElementById("blogDiv").style.display = "none";
        }
    }

    function showBlogButtonClickHandler(eventInfo) {
        document.getElementById("playerInfoDiv").style.display = "none";
        document.getElementById("gameDiv").style.display = "none";
        //document.getElementById("blogDiv").style.display = "";

        //WinJS.UI.processAll().then(downloadC9BlogFeed);
    }

    function backButtonClick(e) {
        articlecontent.style.display = "none";
        articlelist.style.display = "";
        WinJS.UI.Animation.enterPage(articlelist);
    }

    function itemInvoked(e) {
        var currentArticle = articlesList.getAt(e.detail.itemIndex);
        WinJS.Utilities.setInnerHTMLUnsafe(articlecontent, currentArticle.content);
        articlelist.style.display = "none";
        articlecontent.style.display = "";
        WinJS.UI.Animation.enterPage(articlecontent);
    }

    function downloadC9BlogFeed() {
        var feed = "https://www.microsoft.com/en-us/news/rss/rssfeed.aspx?ContentType=FeatureStories&Tags=";
        var feed2 = "view-source:http://ppt-rockpaperscissors.blogspot.com/feeds/posts/default";

        WinJS.xhr({ url: feed }).then(function (rss) {
            var items = rss.responseXML.querySelectorAll("item");

            for (var n = 0; n < items.length; n++) {
                var article = {};
                article.title = items[n].querySelector("title").textContent;
                article.content = items[n].querySelector("description").textContent;

                /*
                var contentTag = null;
                var contentTagsUsed = ["encoded", "description", "content"];
                contentTagsUsed.forEach(function (t) {
                    if (items[n].querySelector(t) != null && contentTag == null)
                        contentTag = t;
                });
                var imgInContent = /<img [^>]*src="([^"]*)"[^>]*\/>/.exec(items[n].querySelector(contentTag).textContent);
                var imageUrl;
                if (items[n].querySelector("enclosure") != null)
                    imageUrl = items[n].querySelector("enclosure").attributes.url.value;
                else if (items[n].querySelector("img") != null)
                    imageUrl = items[n].querySelector("img").attributes.src.value;
                else if (imgInContent != null)
                    imageUrl = imgInContent[1];

                article.thumbnail = imageUrl;
                */
                articlesList.push(article);
            }
        });
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
