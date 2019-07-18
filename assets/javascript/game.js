$(function () {

    var charactersArray = [{
            name: "Luke Skywalker",
            secondImg: '<img src="assets/images/second Luke.jpg">',
            healthPoints: 150,
            attackPower: 18,
            counterPower: 15
        },

        {
            name: "Rey",
            secondImg: '<img src="assets/images/second Rey.jpg">',
            healthPoints: 200,
            attackPower: 14,
            counterPower: 20
        },

        {
            name: "Kylo Ren",
            secondImg: '<img src="assets/images/second Kylo Ren.jpg">',
            healthPoints: 250,
            attackPower: 12,
            counterPower: 10
        },

        {
            name: "Snoke",
            secondImg: '<img src="assets/images/second Snoke.jpg">',
            healthPoints: 300,
            attackPower: 10,
            counterPower: 5
        }
    ];

    newGame();

    function newGame() {
        createCharacters();
    }

    function createCharacters() {
        for (var i = 0; i < charactersArray.length; i++) {
            var character = $("img").attr("datatesting");
            character.attr("data",charactersArray.secondImg)
        }
    }





    });
