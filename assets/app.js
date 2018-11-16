$( document ).ready(function() {
    console.log( "ready!" );

    // <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKtVNXrPIO8Sy2Gy7b8UgX3_ZiCxn4ADA",
    authDomain: "rps-multiplayer-4779b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-4779b.firebaseio.com",
    projectId: "rps-multiplayer-4779b",
    storageBucket: "rps-multiplayer-4779b.appspot.com",
    messagingSenderId: "689450562520"
  };
  firebase.initializeApp(config);
  // VARIABLES
  // --------------------------------------------------------------------------------

  var database = firebase.database();
  var clickCounter = 0;
  var test = "test"

  // FUNCTIONS + EVENTS
  // --------------------------------------------------------------------------------
  //event listener for click from user
  $("#click-button").on("click", function() {
    clickCounter++;
    //updates number of clicks to database
    database.ref().set({
      clickCount: clickCounter
    });
    
  });

  



  // MAIN PROCESS + INITIAL CODE
  // --------------------------------------------------------------------------------
//              lisents for value event
  database.ref().on("value", function(snapshot) {
    // snapshot.val has value from database
    console.log(snapshot.val());
    $("#click-value").text(snapshot.val().clickCount);
    clickCounter = snapshot.val().clickCount;
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  let red = "";
  let blue = "";
  let redWins = 0;
  let blueWins = 0;
  let redTeam = "";
  let blueTeam = "";

 $("#redTeam").on("click", function(){
  redTeam = $("#playingField").append("<div>");
  redTeam.addClass("red");
  $(".red").text("ROCK, PAPER, SCISSORS");
  $("#arenaRed").show();
  $("#teamPick").hide();

 });

 $("#blueTeam").on("click", function(){
  blueTeam = $("#playingField").append("<div>");
  blueTeam.addClass("blue");
  $(".blue").text("ROCK, PAPER, SCISSORS");
  $("#arenaBlue").show();
  $("#teamPick").hide();


 });

 function hider(){
   $("#arenaRed").hide();
   $("#arenaBlue").hide();

 };
 hider();


 /////////rock paper scissors logic
 var options = ["r", "p", "s"];
        var wins = 0;
        var losses = 0;
        var ties = 0;

        let redGuess = "";
        let blueGuess = "";
        $(".selectionRed").on("click", function() {
            redGuess = $(this).attr("data-value");
            console.log("clickworking");
            //updates number of clicks to database
            database.ref().update({
              RedInput: redGuess
            });
            
          });
          ///////////////////////////////////
          $(".selectionBlue").on("click", function() {
            blueGuess = $(this).attr("data-value");
            console.log("clickworking");
            //updates number of clicks to database
            database.ref().update({
              BlueInput: blueGuess
            });
            
          });
          


        // This function is run whenever the user presses a key.
        // creates variable called userGuess with value equal to key that has just been released,
        // set that value equal to keycode that has just been released, 
        // take that character, and turn it into a string.
        database.ref().on("value", function(snapshot) {
            var rojoGuess = snapshot.val().RedInput;
            console.log("red is " + rojoGuess);

            var azulGuess = snapshot.val().BlueInput;
            console.log("blue is " + azulGuess)

        if (rojoGuess =='r' || rojoGuess =='p' || rojoGuess =='s' && azulGuess =='r' || azulGuess =='p' || azulGuess =='s' ) {
            if ((rojoGuess=='r') && (azulGuess=='s')) {
                redWins++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
            if ((rojoGuess=='r') && (azulGuess=='p')) {
                blueWins++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
            if ((rojoGuess=='s') && (azulGuess=='p')) {
                redWins++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
            if ((rojoGuess=='s') && (azulGuess=='r')) {
                blueWins++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
            if ((rojoGuess=='p') && (azulGuess=='r')) {
                redWins++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
            if ((rojoGuess=='p') && (azulGuess=='s')) {
            }
            if ((rojoGuess==azulGuess)) {
                ties++;
                database.ref().update({
                    RedInput: 0,
                    BlueInput: 0
                  });
            }
        } else {
            // alert("Please choose, r, p, or s.");
        }
        

        database.ref().update({
            blueWins: blueWins,
            redWins: redWins,
            ties: ties,
            // RedInput: 0,
            // BlueInput: 0
          });

  

       
          if(redWins++ || blueWins++ || ties++){
        var html = "<p>Press r, p, or s to start playing<p>" +
        "<p>red: " + snapshot.val().redWins + "</p>" +
        "<p>blue: " + snapshot.val().blueWins + "</p>" +
        "<p>ties: " + snapshot.val().ties + "</p>";

        document.querySelector('#game').innerHTML = html;
          } else {};
    });
    //////////////////////////////

    // function trashMan(snapshot){
    //     $(snapshot.RedInput).empty();
    //     $(snapshot.BlueInput).empty();

    // };









});