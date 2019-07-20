$(function () {
    var charactersArray = [
        {
            nickName: "luke",
            name: "Luke Skywalker",
            firstImg: "assets/images/first Luke.jpg",
            fighterImg: "assets/images/fighter Luke.jpg",
            defenderImg: "assets/images/defender Luke.jpg",
            healthPoints: 150,
            attackPower: 18,
            counterPower: 15
        },
        {
            nickName: "rey",
            name: "Rey",
            firstImg: "assets/images/first Rey.jpg",
            fighterImg: "assets/images/fighter Rey.jpg",
            defenderImg: "assets/images/defender Rey.jpg",
            healthPoints: 200,
            attackPower: 14,
            counterPower: 20
        },
        {
            nickName: "ren",
            name: "Kylo Ren",
            firstImg: "assets/images/first Kylo Ren.jpg",
            fighterImg: "assets/images/fighter Kylo Ren.jpg",
            defenderImg: "assets/images/defender Kylo Ren.jpg",
            healthPoints: 250,
            attackPower: 12,
            counterPower: 10
        },
        {
            nickName: "snoke",
            name: "Snoke",
            firstImg: "assets/images/first Snoke.jpeg",
            fighterImg: "assets/images/fighter Snoke.jpg",
            defenderImg: "assets/images/defender Snoke.jpg",
            healthPoints: 300,
            attackPower: 10,
            counterPower: 5
        }
    ];
    
    var fighterProfile;
    var fighterHP; //Check for lose
    var fighterAP;
    var fighterPower;

    var defenderProfile;
    var defenderHP;
    var defenderAP;
    
    var attackButton;
    var againButton;
    var enemyCount; //Check for win
    
    newGame();

    function newGame() {
        enemyCount = charactersArray.length -1;//Check for WIN
        fighterProfile = "";
        defenderProfile = "";
        fighterHP = 0;
        fighterAP = 0;
        fighterPower = 0;
        defenderHP = 0;
        defenderAP = 0;

        //Create attack button and hide it
        attackButton = $("#attack").append($("<button>").addClass("btn attack").attr("type","button").text("ATTACK!"));
        attackButton.hide();

        //Create play again button
        againButton = $("<button>").addClass("btn playagain").attr("type","button").text("Play Again");

        //Create guidance mgs board 
        $("#characters_list").before($("<h2>").attr("id","characterOptions").text("Available Characters"));

        //Loop thru objects to create profile for each character
        $.each(charactersArray, function (){
            var divCharacter = $("<div>").addClass("col-3 character").attr({
                //store all data in attribute to use later
                "id" : this.nickName,
                "data_name" : this.name,
                "data_hp" : this.healthPoints,
                "data_ap" : this.attackPower,
                "data_cp" : this.counterPower,
                "data_fightimg" : this.fighterImg,
                "data_defendimg" : this.defenderImg,
            })
            $("#characters_list").append(divCharacter);
        
            //Display character profiles
            divCharacter.append($("<h3>").text(this.name));
            divCharacter.append($("<img>").addClass("img-fluid").attr("src",this.firstImg));
            divCharacter.append($("<p>").text("HP:\xa0"+this.healthPoints)); //\xa0 is whitespace
        })
    }

    //User pick a fighter then a defender
    $(".character").on("click", function () {
        if (fighterProfile == "") {
            fighterAP = $(this).attr("data_ap");
            fighterAP = parseInt(fighterAP,10);
            console.log("fighter: " + fighterAP);
            fighterHP = $(this).attr("data_hp");

            fighterProfile = [
                $("<h3>").text($(this).attr("data_name")),
                $("<img>").addClass("img-fluid").attr("src", $(this).attr("data_fightimg")),
                $("<h5>").attr("id","fighterhealth")
            ];
            $("#vsFighter").append(fighterProfile); //Move chosen character to fighter
            $(this).remove(); //Remove chosen fighter old profile 
            attackButton.show(); //Show attack button
            $("#msg").text("Please pick a defender"); //Msg tell user to pick next
            $("#characterOptions").text("Available Enemies"); //Change character options tittle
            updateDisplay();
        } else {
            if (defenderProfile == "") {
                defenderAP = $(this).attr("data_cp");
                defenderAP = parseInt(defenderAP,10);
                console.log("defender: " + defenderAP);
                defenderHP = $(this).attr("data_hp");

                defenderProfile = [
                    $("<h3>").text($(this).attr("data_name")),
                    $("<img>").addClass("img-fluid").attr("src", $(this).attr("data_defendimg")),
                    $("<h5>").attr("id","defenderhealth")
                ];
                $("#vsDefender").append(defenderProfile);//Character becomes defender
                $(this).remove(); //Remove defender old profile
                $("#msg").text(""); //No msg
                updateDisplay();
            }
        }
    });

    function updateDisplay () {
        $("#fighterhealth").text("HP:\xa0" + fighterHP);
        $("#defenderhealth").text("HP:\xa0" + defenderHP);
    }

    //Attack button -- win/lose logic
    $(".attack").on("click",function () {
        fighterPower += fighterAP; //fighter attack power increases by its base
        console.log("fighter Total: " + fighterPower);

        fighterHP -= defenderAP; //defender attack power doesn't change
        console.log("hp" + fighterHP)

        defenderHP -=fighterPower;
        updateDisplay();

        if (defenderHP <= 0){ //defender loses
            $("#vsDefender").empty(); //remove 
            $("#msg").text("Please pick another defender"); //msg: ask user to pick another defender
            defenderProfile = ""; //allow user to pick another defender
            enemyCount--;//check for WIN
            if (enemyCount === 0){ //user wins
                $("#vsDefender").append(againButton);
            }

        }
    });

    $(".playagain").on("click", function(){
        newGame();
    });

    
});
