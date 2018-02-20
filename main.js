var s = Snap('#map-svg');

var width = 750;
var height = 600;

userX = width/2 - 10;
userY = height - 30;

var forest = createForest(50,30);

var user = createUser(userX, userY);

var streamLine = createStream(200, 200);

var pathToForest = createPath(userX, userY, 80, 75);

function createPath(startX, startY, finishX, finishY){
    var pathBetween = "M " + startX + "," + startY + " " + finishX + "," + finishY;
    return s.path(pathBetween)
            .attr({stroke:"orange", fill:"transparent", strokeDasharray:10, strokeWidth:5});
}

function createUser(x, y){
    return s.image('x-mark.png', x, y, 25, 25);
}

function createStream(x, y){
    for(var i = 0; i < 3; i++){
        var streamLine = createStreamWave(x, y);
        y += 10;
    }
}

function createStreamWave(x, y){
    var pathString = "M " + x + " " + y;
    var length = 20;
    for(var i = 0; i < 3; i++){
        pathString += createStreamCurve(x, y, length);
        x += length;
    }
    return s.path(pathString).attr({ stroke: "blue", fill: "transparent", strokeWidth:5});;
}

function createStreamCurve(x, y, length){
    var height = 10;
    return " Q " + (x + length/2) + " " + (y - height) + " " + (x + length) + " " + y;
}


function createForest(x, y){
    for(var i = 0; i < 3; i++){
        createForestLine(x, y, 5)
        y += 15;
    }
}

function createForestLine(x, y, numberOfTrees){
    for(var i = 0; i < numberOfTrees; i++){
        createTriangleTree(x, y)
        x += 15;
    }
}

function createTriangleTree(x, y){
    var points = [
        x,      y, 
        x + 5,  y - 10,
        x + 10, y]
    return s.polygon(points).attr({fill: "green"});
}