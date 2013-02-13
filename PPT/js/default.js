(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var startGameButton;
    var articlesList;
    var scoresList;

    //WinJS.Application.sessionState.playCount = 0;
    //WinJS.Application.sessionState.myCount = 0;
    //WinJS.Application.sessionState.winCount = 0;
    var playCount = 0;
    var myCount = 0;
    var winCount = 0;
    var playerName = "";

    var client = new Microsoft.WindowsAzure.MobileServices.MobileServiceClient(
        "https://ppt.azure-mobile.net/",
        "wzhdZgoHeMrXrVWTakUBKpgJaZgSue26"
    );

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

            //document.getElementById("articlelist").addEventListener("iteminvoked", itemInvoked);
            //backbutton.addEventListener("click", backButtonClick);

            articlesList = new WinJS.Binding.List();
            scoresList = new WinJS.Binding.List();
            var publicMembers = {
                ItemList: articlesList,
                ScoresList: scoresList
            };
            WinJS.Namespace.define("C9Data", publicMembers);

            articlecontent.style.display = "none";
            articlelist.style.display = "";

            document.getElementById("startNewGameButton").addEventListener("click", startNewGame, false);

            args.setPromise(WinJS.UI.processAll().then(downloadC9BlogFeed).then(downloadScoresList));
        }
    };

    //function goToHome(eventInfo) {
    //    WinJS.Navigation.navigate("/pages/home/home.html");
    //}

    //function startGame(eventInfo) {
    //    WinJS.Navigation.navigate("/pages/game/game.html");
    //}

    function ButtonRockClickHandler(eventInfo) {
        eventInfo.preventDefault();
        playMyGame("Rock");
    }

    function ButtonPaperClickHandler(eventInfo) {
        eventInfo.preventDefault();
        playMyGame("Paper");
    }

    function ButtonScissorsClickHandler(eventInfo) {
        eventInfo.preventDefault();
        playMyGame("Scissors");
    }

    function playMyGame(myChoice) {
        document.getElementById("myChoiceResult").innerText = "My Choice: " + myChoice;
        document.getElementById("buttonrock1").className = myChoice == "Rock" ? "red" : "div1";
        document.getElementById("buttonpaper1").className = myChoice == "Paper" ? "red" : "div1";
        document.getElementById("buttonscissors1").className = myChoice == "Scissors" ? "red" : "div1";

        var win8Game = Math.floor((Math.random() * 3) + 1);
        var winChoice;
        switch (win8Game) {
            case 1:
                winChoice = "Rock";
                break;
            case 2:
                winChoice = "Paper";
                break;
            case 3:
                winChoice = "Scissors";
                break;
        }

        document.getElementById("winChoiceResult").innerText = "Win8 Choice: " + winChoice;
        document.getElementById("buttonrock2").className = winChoice == "Rock" ? "red" : "div1";
        document.getElementById("buttonpaper2").className = winChoice == "Paper" ? "red" : "div1";
        document.getElementById("buttonscissors2").className = winChoice == "Scissors" ? "red" : "div1";

        if (myChoice == "Rock" && winChoice == "Scissors") {
            document.getElementById("resultMessage").innerText = "Rock breaks Scissors = " + playerName + " wins";
            myCount++;
        }
        else if (myChoice == "Scissors" && winChoice == "Rock") {
            document.getElementById("resultMessage").innerText = "Rock breaks Scissors = windows8 wins";
            winCount++;
        }
        else if (myChoice == "Scissors" && winChoice == "Paper") {
            document.getElementById("resultMessage").innerText = "Scissors cuts Paper = " + playerName + " wins";
            myCount++;
        }
        else if (myChoice == "Paper" && winChoice == "Scissors") {
            document.getElementById("resultMessage").innerText = "Scissors cuts Paper = windows8 wins";
            winCount++;
        }
        else if (myChoice == "Rock" && winChoice == "Paper") {
            document.getElementById("resultMessage").innerText = "Rock wraps Paper = " + playerName + " wins";
            myCount++;
        }
        else if (myChoice == "Paper" && winChoice == "Rock") {
            document.getElementById("resultMessage").innerText = "Rock wraps Paper = windows8 wins";
            winCount++;
        }
        if (myChoice == "Rock" && winChoice == "Rock") {
            document.getElementById("resultMessage").innerText = "Rock - Rock = tie";
        }
        if (myChoice == "Paper" && winChoice == "Paper") {
            document.getElementById("resultMessage").innerText = "Paper - Paper = tie";
        }
        if (myChoice == "Scissors" && winChoice == "Scissors") {
            document.getElementById("resultMessage").innerText = "Scissors - Scissors = tie";
        }

        document.getElementById("myCount").innerText = myCount;
        document.getElementById("winCount").innerText = winCount;

        if (myCount >= 5) {
            var score = {
                playerName: playerName,
                score: myCount + "-" + winCount,
                date: new Date()
            };
            client.getTable("Scores").insert(score);

            showGameOverFlyout(playerName + " wins the Game " + myCount + " to " + winCount);
        }
        if (winCount >= 5) {
            showGameOverFlyout("Windows8 wins the Game " + winCount + " to " + myCount);
        }
    }

    function showGameOverFlyout(text) {
        //showFlyout(gameOverFlyout, startNewGameButton, "auto");

        var messagedialogpopup = new Windows.UI.Popups.MessageDialog(text, "Game Over");
        messagedialogpopup.commands.append(new Windows.UI.Popups.UICommand("new", startNewGame()));
        messagedialogpopup.showAsync();
    }

    function startNewGame() {
        myCount = 0;
        winCount = 0;
        document.getElementById("myChoiceResult").innerText = "";
        document.getElementById("winChoiceResult").innerText = "";
        document.getElementById("resultMessage").innerText = "";

        document.getElementById("buttonrock1").className = "div1";
        document.getElementById("buttonpaper1").className = "div1";
        document.getElementById("buttonscissors1").className = "div1";
        document.getElementById("buttonrock2").className = "div1";
        document.getElementById("buttonpaper2").className = "div1";
        document.getElementById("buttonscissors2").className = "div1";

        document.getElementById("myCount").innerText = "";
        document.getElementById("winCount").innerText = "";

        //document.getElementById("gameOverFlyout").winControl.hide();
    }

    function showFlyout(flyout, anchor, placement) {
        flyout.winControl.show(anchor, placement);
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
            playerName = nameInput.value;
            eventInfo.preventDefault();

            document.getElementById("playersLabel").innerText =
                playerName + " vs Windows8: play your turn using the buttons from the first row";

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
        var feed2 = "http://ppt-rockpaperscissors.blogspot.com/feeds/posts/default";

        WinJS.xhr({ url: feed2 }).then(function (rss) {
            var items = rss.responseXML.querySelectorAll("entry");
            for (var n = 0; n < items.length; n++) {
                var article = {};
                article.title = items[n].querySelector("title").textContent + ' - ' + items[n].querySelector("content").textContent;
                //article.content = items[n].querySelector("description").textContent;
                article.url = items[n].querySelectorAll("link");

                articlesList.push(article);
            }
        });
    }

    function downloadScoresList() {
        var scoresTable = client.getTable("Scores");
        //scoresTable.read().done(function (results) {
        //    for (var i = 0; i <= results.length - 1; i++) {

        //        var s = {};
        //        s.info = results[i].playerName + " " + results[i].score;

        //        scoresList.push(s);
        //    }
        //});

        scoresTable.where({ })
            .take(5)
            .read()
            .done(function (results) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var s = {};
                    s.info = results[i].playerName + " " + results[i].score;
                    scoresList.push(s);
                }
            });
    }

    function downloadOK(rss) {
        //var items = rss.responseXML.querySelectorAll("item");

        //for (var n = 0; n < items.length; n++) {
        //    var article = {};
        //    article.title = items[n].querySelector("title").textContent;
        //    article.content = items[n].querySelector("description").textContent;
        //    articlesList.push(article);
        //}

        var items = rss.responseXML.querySelectorAll("entry");
        for (var n = 0; n < items.length; n++) {
            var article = {};
            article.title = items[n].querySelector("title").textContent + ' - ' + items[n].querySelector("content").textContent;
            //article.content = items[n].querySelector("description").textContent;
            article.url = items[n].querySelectorAll("link");

            articlesList.push(article);
        }

        //var jsonData = JSON.parse(rss.responseText);
        //var list = new WinJS.Binding.List(jsonData.responseData.feed.entries);
        //dataControl.itemDataSource = list.dataSource
    }

    function downloadError() {
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.onsettings = function (e) {
        e.detail.applicationcommands =
              { "about": { title: "About", href: "/about.html" } };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    app.start();
})();
