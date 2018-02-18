var s = Snap('#map-svg');

var forest = createForest(20,20);

var xMark = s.image('x-mark.png', 20, 100, 25, 25);

var streamLine = createStream(20, 150);

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
    return s.path(pathString).attr({ stroke: "blue", fill: "transparent"});;
}

function createStreamCurve(x, y, length){
    var height = 20;
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