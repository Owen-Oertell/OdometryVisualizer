let height = 800;
let width = 1000;
var innitPosition = { x: width / 2 - 25, y: height - 50, theta: 90, leftDistTraveled: 0, rightDistTravleled: 0 };
var position = innitPosition;
var velocity = { leftMotor: 0, rightMotor: 0 };
var downKeys = [];
var OldVals;

function drive(arg) {
    var r = 6;
    var dirChange = 30;
    var posChange=0;
    var afterTurnChange = 1.5;
    const pi = 3.14159
    OldVals = position;
    if (arg == 'right') {
        // move right
        position.theta-=dirChange;
        position.x += Math.round(Math.cos((position.theta*pi)/180)*r*afterTurnChange);
        position.y -= Math.round(Math.sin((position.theta*pi)/180)*r*afterTurnChange);
        position.rightDistTravleled+=r*afterTurnChange;

    } else if (arg == 'forward') {
        // move forward
        position.x += Math.round(Math.cos((position.theta*pi)/180)*r);
        position.y -= Math.round(Math.sin((position.theta*pi)/180)*r);
        position.leftDistTraveled+=r;
        position.rightDistTravleled+=r;

    } else if (arg == 'left') {
        // move left
        position.theta+=dirChange;
        position.x += Math.round(Math.cos((position.theta*pi)/180)*r*afterTurnChange);
        position.y -= Math.round(Math.sin((position.theta*pi)/180)*r*afterTurnChange);
        position.leftDistTraveled+=r*afterTurnChange;
    }
    posChange = 90-position.theta;
    var move = "translate(" + position.x + "px, " + position.y + "px) " + "rotate(" + posChange +"deg)";
    $("#robot").css("transform", move);    
};

function displayOdom() {
    // Show Equations:
    let px = (OldVals.x - (Math.sqrt(OldVals.x * OldVals.x + OldVals.y * OldVals.y)*Math.sin((OldVals.theta*3.14159)/180)));
    let py = (OldVals.y + (Math.sqrt(OldVals.y * OldVals.x + OldVals.y * OldVals.y)*Math.cos((OldVals.theta*3.14159)/180)));
    let rCenter = (position.leftDistTraveled + position.rightDistTravleled)/2;
    let phi = ((position.rightDistTravleled - position.leftDistTraveled)/45);

    let returnString = "Left Encoder Travel Distance: " + position.leftDistTraveled;
    returnString+= " | Right Encoder Travel Distance: " + position.rightDistTravleled;
    returnString+= " | Center of Robot Travel Distance: " + rCenter;

    returnString+= "<br>Phi: " + phi;
    returnString+= " | P X: " + px;
    returnString+= " | P Y: " + py;
    
    returnString+= "<br>x': " + Math.round(OldVals.x + rCenter*(-Math.sin((OldVals.theta*3.14159)/180) + Math.sin((phi*3.14159)/180) * Math.cos((OldVals.theta*3.14159)/180) + Math.sin((OldVals.theta*3.14159)/180)*Math.cos((phi*3.14159)/180)));
    returnString+= " | y': " + Math.round(OldVals.y + rCenter*(Math.cos((OldVals.theta*3.14159)/180) - Math.cos((phi*3.14159)/180) * Math.cos((OldVals.theta*3.14159)/180) + Math.sin((OldVals.theta*3.14159)/180)*Math.sin((phi*3.14159)/180)));
    returnString+= "<br> Actual x: " + position.x;
    returnString+= " | Actual y: " + position.y;

    $("#information").html(returnString);
    //MathJax.Hub.Queue(["Typeset",MathJax.Hub,'information']);
    // Show Graph:
    
    // Reset Values:
    //position.leftDistTraveled = position.rightDistTravleled = 0;
}

$(document).ready(function () {
    var move = "translate(" + position.x + "px, " + position.y + "px)"
    $("#robot").css("transform", move);
    $("#robot").css("display", 'inline');
    console.log("Robot Starting At Position: (" + position.x + "," + position.y + ")");
    $(window).keydown(function (evt) {

        if (evt.which == 65) { // 'a' was pressed
            // Turn Left
            if (!downKeys.includes('a')) {
                downKeys.push('a');
            }
        }
        if (evt.which == 87) { // 'w' was pressed
            // Go Straight
            if (!downKeys.includes('w')) {
                downKeys.push('w');
            }
        }
        if (evt.which == 68) { // 'd' was pressed
            // Turn Right
            if (!downKeys.includes('d')) {
                downKeys.push('d');
            }
        }

        if (downKeys.length >= 1 && downKeys[0] == 'a') {
            // turn left
            drive('left')

        } else if (downKeys.length >= 1 && downKeys[0] == 'w') {
            drive('forward')
            // turn forward
        } else if (downKeys.length >= 1 && downKeys[0] == 'd') {
            drive('right')
            // turn right
        }

    })
    $(window).keyup(function (evt) {
        let kp=0;
        if (evt.which == 65) { // 'a' was pressed
            // Turn Left
            kp++;
            if (downKeys.includes('a')) {
                downKeys = downKeys.filter(item => item !== 'a')
            }
        }
        if (evt.which == 87) { // 'w' was pressed
            // Go Straight
            kp++;
            if (downKeys.includes('w')) {
                downKeys = downKeys.filter(item => item !== 'w')
            }
        }
        else if (evt.which == 68) { // 'd' was pressed
            // Turn Right
            kp++
            if (downKeys.includes('d')) {
                downKeys = downKeys.filter(item => item !== 'd')
            }
        }


        if(downKeys.length == 0 && kp!=0) {
            // no keys being pressed, compute and odometry
            displayOdom();
        }
    })

    
});

