let height = 800;
let width = 1000;
var innitPosition = { x: width / 2 - 25, y: height - 50, theta: 0 };
var position = innitPosition;
var velocity = { leftMotor: 0, rightMotor: 0 };
var downKeys = [];

$(document).ready(function () {
    var move = "translate(" + position.x + "px, " + position.y + "px)"
    $("#robot").css("transform", move);
    $("#robot").css("display", 'inline');
    console.log("Robot Starting At Position: (" + position.x + "," + position.y + ")");
    $(window).keydown(function (evt) {
        
        if (evt.which == 65) { // 'a' was pressed
            // Turn Left
            if(!downKeys.includes('a')) {
                downKeys.push('a');
            }
        }
        if (evt.which == 87) { // 'w' was pressed
            // Go Straight
            if(!downKeys.includes('w')) {
                downKeys.push('w');
            }
        }
        if(evt.which == 68) { // 'd' was pressed
            // Turn Right
            if(!downKeys.includes('d')) {
                downKeys.push('d');
            }
        }

        if(downKeys.length>=1 && downKeys[0]=='a') {
            // turn left
            move('left')

        } else if(downKeys.length>=1 && downKeys[0]=='w') {
            move('forward')
            // turn forward
        } else if(downKeys.length>=1 && downKeys[0]=='d') {
            move('right')
            // turn right
        }

    })
    $(window).keyup(function(evt) {
        if (evt.which == 65) { // 'a' was pressed
            // Turn Left
            if(downKeys.includes('a')) {
                downKeys = downKeys.filter(item => item !== 'a')
            }
        }
        if (evt.which == 87) { // 'w' was pressed
            // Go Straight
            if(downKeys.includes('w')) {
                downKeys = downKeys.filter(item => item !== 'w')
            }
        }
        else if(evt.which == 68) { // 'd' was pressed
            // Turn Right
            if(downKeys.includes('d')) {
                downKeys = downKeys.filter(item => item !== 'd')
            }
        }
    })
});