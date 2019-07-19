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
    
    var characterNo = charactersArray.length;
    console.log(characterNo);
    var fighterID;
    var defenderID;
    var attackButton;
    newGame();

    function newGame() {
        fighterID = "";
        defenderID = "";

        //Create attack button and hide it
        attackButton = $("#attack").append($("<button>").addClass("btn").attr("type","button"));
        attackButton.hide();

        //Create guidance board 
        $("#characters_list").before($("<h2>").attr("id","characterOptions").text("Available Characters"));

        //Loop thru objects to create profile for each character
        $.each(charactersArray, function (){
            var divCharacter = $("<div>").addClass("col-3 character").attr({
                //store all data in attribute to use later
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

    $(".character").on("click", function () {
        if (fighterID == "") {
            fighterID = [
                $("<h3>").text($(this).attr("data_name")),
                $("<img>").addClass("img-fluid").attr("src", $(this).attr("data_fightimg")),
                $("<h5>").text("HP:\xa0" + $(this).attr("data_hp"))
            ];
            $("#vsFighter").append(fighterID); //Move chosen character to fighter
            $(this).remove(); //Remove chosen fighter old profile 
            attackButton.show(); //Show attack button
            $("#characterOptions").text("Available Enemies"); //Change character options tittle

        } else {
            if (defenderID == "") {
                defenderID = [
                    $("<h3>").text($(this).attr("data_name")),
                    $("<img>").addClass("img-fluid").attr("src", $(this).attr("data_defendimg")),
                    $("<h5>").text("HP:\xa0" + $(this).attr("data_hp"))
                ];
                $("#vsDefender").append(defenderID);//Character becomes defender
                $(this).remove(); //Remove defender old profile
            }
        }
    });

});
