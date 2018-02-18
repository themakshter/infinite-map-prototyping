var s = Snap('#map-svg');

//var circle = s.circle(15,15,5);

var forest = createForest(20,20);

function createForest(startingX, startingY){
    for(var i = 0; i < 3; i++){
        createForestLine(startingX, startingY, 5)
        startingY += 15;
    }
}

function createForestLine(startingX, startingY, numberOfTrees){
    for(var i = 0; i < numberOfTrees; i++){
        createTriangleTree(startingX, startingY)
        startingX += 15;
    }
}

function createTriangleTree(startingX, startingY){
    var points = [
        startingX,      startingY, 
        startingX + 5,  startingY - 10,
        startingX + 10, startingY]
    return s.polygon(points).attr({fill: "green"});
}