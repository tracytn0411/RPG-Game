$(function () {
  var charactersArray = [{
      nickName: "luke",
      name: "Luke Skywalker",
      fighterImg: "assets/images/luke.jpg",
      healthPoints: 150,
      attackPower: 18,
      counterPower: 15
    },
    {
      nickName: "rey",
      name: "Rey",
      fighterImg: "assets/images/rey.jpg",
      healthPoints: 200,
      attackPower: 14,
      counterPower: 20
    },
    {
      nickName: "ren",
      name: "Kylo Ren",
      fighterImg: "assets/images/kylo.jpg",
      healthPoints: 250,
      attackPower: 12,
      counterPower: 25,
    },
    {
      nickName: "snoke",
      name: "Snoke",
      fighterImg: "assets/images/snoke.png",
      healthPoints: 300,
      attackPower: 10,
      counterPower: 50,
    }
  ];

  var fighterProfile;
  var fighterHP; //Check for lose
  var fighterAP;
  var fighterPower;

  var defenderProfile;
  var defenderHP;
  var defenderAP;

  var enemyCount; //Check for win

  //Wait until all html content (include imgages) to fully load
  $(window).on("load", function(){
    newGame();
  });

  function newGame() {
    enemyCount = charactersArray.length - 1; //Check for WIN
    characterCount = charactersArray.length; //Check to display characterBoard
    fighterProfile = "";
    defenderProfile = "";
    fighterHP = 0;
    fighterAP = 0;
    fighterPower = 0;
    defenderHP = 0;
    defenderAP = 0;

    //Clear all content from previous fight
    $("#vsFighter").empty();
    $("#vsDefender").empty();

    //Display all html rows
    $("#battleRow").show();
    $("#infoRow").show();

    //Hide attack and playgain button at the beginning of game
    $("#attackBtn").hide();
    $(".againBtn").hide();

    buildCharacters();
  }

  function buildCharacters() {
    //character board
    $("#characterBoard").text("Available Characters");

    //msg
    $("#msg").html("<h2 class='animated flash slow'>Please pick your character</h2>");

    //Loop thru objects to create profile for each character
    $.each(charactersArray, function () {
      var divCharacter = $("<div>").addClass("character col-md-3 col-6").attr({
        //store all data in attribute to use later
        "id": this.nickName,
        "data_name": this.name,
        "data_hp": this.healthPoints,
        "data_ap": this.attackPower,
        "data_cp": this.counterPower,
        "data_fightimg": this.fighterImg,
        "data_defendimg": this.defenderImg,
      })

      var divCard = $("<div>").addClass("card");
      divCard.append([
        $("<img>").addClass("card-img-top").attr("src", this.fighterImg),
        $("<div>").addClass("card-body").append([
          $("<h5>").addClass("card-title").text(this.name),
          $("<h5>").addClass("card-text").text("HP: " + this.healthPoints)
        ])
      ])

      //Display character profiles
      $("#charactersRow").append(divCharacter);
      divCharacter.append(divCard);
    })
  }

  //User first pick a fighter then pick a defender
  $(document).on("click", ".character", function () {
    characterCount--;
    if (characterCount === 0) {
      $("#characterBoard").empty();
    }
    if (fighterProfile === "") {
      fighterAP = $(this).attr("data_ap");
      fighterAP = parseInt(fighterAP, 10);
      console.log("fighter: " + fighterAP);
      fighterHP = $(this).attr("data_hp");

      fighterProfile = [
        $("<img>").addClass("card-img-top").attr("src", $(this).attr("data_fightimg")),
        $("<div>").addClass("card-body").append([
          $("<h5>").addClass("card-title").text($(this).attr("data_name")),
          $("<h5>").addClass("card-text").attr("id", "fighterhealth")
        ])
      ];
      var divCard = $("<div>").addClass("card");
      divCard.append(fighterProfile);
      $("#vsFighter").append(divCard); //Move chosen character to fighter
      $(this).remove(); //Remove chosen fighter old profile 
      $("#msg").html("<h2 class='animated flash slow'>Please pick a defender</h2>");//Msg tell user to pick next

      $("#characterBoard").text("Available Enemies"); //Update character options board
      updateStats();

    } else if (defenderProfile === "") {
      defenderAP = $(this).attr("data_cp");
      defenderAP = parseInt(defenderAP, 10);
      console.log("defender: " + defenderAP);
      defenderHP = $(this).attr("data_hp");
      if (enemyCount === 0) {
        $("#characterBoard").empty();
      }

      defenderProfile = [
        $("<img>").addClass("card-img-top").attr("src", $(this).attr("data_fightimg")),
        $("<div>").addClass("card-body").append([
          $("<h5>").addClass("card-title").text($(this).attr("data_name")),
          $("<h5>").addClass("card-text").attr("id", "defenderhealth")
        ])
      ];
      var divCard = $("<div>").addClass("card");
      divCard.append(defenderProfile);
      $("#vsDefender").append(divCard); //Character becomes defender
      $(this).remove(); //Remove defender old profile
      
      $("#msg").html("<h2 class='animated fadeIn delay-1s'>May the force be with you</h2>"); //good luck
      $("#attackBtn").show();
      updateStats();
    }
  });

  //function to update stats after each attack
  function updateStats() {
    $("#fighterhealth").text("HP:\xa0" + fighterHP);
    $("#defenderhealth").text("HP:\xa0" + defenderHP);
  }

  //function to ask user to play again after lose or win
  function gameFinished() {
    $(".againBtn").show();
    $("#battleRow").hide();
    $("#charactersRow").empty();
    $("#characterBoard").text("");
  }

  //Attack button -- win/lose logic
  $(".attack").on("click", function () {

    fighterPower += fighterAP; //fighter attack power increases by its base
    console.log("fighter Total: " + fighterPower);

    fighterHP -= defenderAP; //defender attack power doesn't change
    console.log("hp" + fighterHP)

    defenderHP -= fighterPower;
    updateStats();

    if (fighterHP <= 0) { //lose
      $("#msg").text("You have defeated :(")
      gameFinished();

    } else if (defenderHP <= 0) { //win
      $("#vsDefender").empty(); //remove 
      defenderProfile = ""; //allow user to pick another defender
      $("#msg").html("<h2 class='animated flash slow'>Please pick a defender</h2>");
      //attackButton.hide(); //turn off attack button click function
      $("#attackBtn").hide();
      enemyCount--; //check for WIN
      if (enemyCount === 0) { //user wins
        $("#msg").text("You are the last Jedi!!");
        gameFinished();
      }
    }
  });

  //Play again button
  $(".againBtn").on("click", function () {
    newGame();
  });

});