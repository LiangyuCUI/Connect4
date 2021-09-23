$(document).ready(function () { //prevent any jQuery code from running before the document is finished loading (is ready)
    var player = 1;
    var colors = {};
    var winner = 0;
    colors[-1] = "yellow";     //second player
    colors[1] = "red";         //first player
    var count = 0;


    $(".cell").each(function () {      //The each() method specifies a function to run for each matched element
        $(this).attr("id", count);     //jquery attr method,$(selector).attr(attribute,value)
        $(this).attr("data-player", 0);
        count++;              //set the id of each cell from 0 to 41
        $(this).click(function () {
            if (isValid($(this).attr("id"))) {
                $(this).css("background-color", colors[player]);
                $(this).attr("data-player", player);
                if (checkWin(player)) {
                    alert(colors[player] + " has won!");
                    winner = player;
                }
                if (player > 0) { document.getElementById("player").innerHTML = "<h3>The current player is yellow</h3>" }
                else {
                    document.getElementById("player").innerHTML = "<h3>The current player is red</h3>"
                }
                player = player * -1;   //switch to the next player
            }
        });
    });
    function isValid(n) {
        var id = parseInt(n); //change the string to integer
        if (winner !== 0) {
            return false;
        }//none of the cell is vaild after one of the player is win

        if ($("#" + id).attr("data-player") === "0") {
            if (id >= 35) {
                return true;            //start to play at the bottom line
            }
            if ($("#" + (id + 7)).attr("data-player") !== "0") {
                return true;           //can only play when the cell below is not empty(data-player is not 0)
            }
        }

        return false;
    }
    function checkWin(p) {
        //check rows
        var chain = 0;
        for (var i = 0; i < 42; i = i + 7) {     // iterate through each row 
            for (var j = 0; j < 7; j++) {
                var cell = $("#" + (i + j));     //set my current cell
                if (cell.attr("data-player") == p) {  //to check my current color is the same or not
                    chain++;                        //if it's same color ,++
                } else {
                    chain = 0;                        
                }

                if (chain >= 4) {
                    return true;
                }
            }
            chain = 0;                             //reset after each row
        }
        //check columns
        chain = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 42; j = j + 7) {
                var cell = $("#" + (i + j));
                if (cell.attr("data-player") == p) {
                    chain++;
                } else {
                    chain = 0;
                }

                if (chain >= 4) {
                    return true;
                }
            }
            chain = 0;
        }
    }
    // function restart(){
    //     window.location.reload();


    // }
});
