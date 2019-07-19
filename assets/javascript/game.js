$(function () {
    var charactersArray = [
        {
            nickName: "luke",
            name: "Luke Skywalker",
            firstImg: "assets/images/first Luke.jpg",
            secondImg: '<img src="assets/images/second Luke.jpg">',
            healthPoints: 150,
            attackPower: 18,
            counterPower: 15
        },
        {
            nickName: "rey",
            name: "Rey",
            firstImg: "assets/images/first Rey.jpg",
            secondImg: '<img src="assets/images/second Rey.jpg">',
            healthPoints: 200,
            attackPower: 14,
            counterPower: 20
        },
        {
            nickName: "ren",
            name: "Kylo Ren",
            firstImg: "assets/images/first Kylo Ren.jpg",
            secondImg: '<img src="assets/images/second Kylo Ren.jpg">',
            healthPoints: 250,
            attackPower: 12,
            counterPower: 10
        },
        {
            nickName: "snoke",
            name: "Snoke",
            firstImg: "assets/images/first Snoke.jpeg",
            secondImg: '<img src="assets/images/second Snoke.jpg">',
            healthPoints: 300,
            attackPower: 10,
            counterPower: 5
        }
    ];
    
    var characterNo = charactersArray.length;

    console.log(characterNo);

    newGame();

    function newGame() {
        $("#characters").before($("<h2>").text("Please select your character"));
            $.each(charactersArray, function (){
                var divTest = $("<div>").addClass("col-3").attr("data_name",this.nickName);
                $("#characters").append(divTest);

                divTest.append($("<h3>").text(this.name));
                divTest.append($("<img>").addClass("img-fluid").attr("src",this.firstImg).attr("data_name",this.name).attr("data_hp",this.healthPoints));
                divTest.append($("<p>").text("HP:\xa0"+this.healthPoints)); //\xa0 is whitespace
            })
    }

    $("img").on("click", function () {
        if (characterNo === 4) {
            var pickCharacter = 
                [
                    $("<h3>").text($(this).attr("data_name")),
                    $("<img>").addClass("img-fluid").attr("src", $(this).attr("src")),
                    $("<h5>").text("HP:\xa0" + $(this).attr("data_hp"))
                ];
            //$(this).attr("src");
            $("#vsFighter").append(pickCharacter);
            $

        }

    })

    
});
