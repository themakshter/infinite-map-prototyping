var s = Snap('#map-svg');

var panelWidth = 750;
var panelHeight = 600;

userX = panelWidth/2 - 10;
userY = panelHeight - 30;

var mapToLoadSchema = {
    name: 'string',
    background: 'svg',
    overlay: 'svg',
    activities: [
        {
            name: 'string',
            image: 'svg',
            x: 'int',
            y: 'int'
        }
    ]
};

var exampleMapToLoad = {
    name: 'Fun Island',
    background: 'water.jpg',
    overlay: 'island.png',
    activities:[
        {
            name: 'Freaky Forest',
            image: 'forest.png',
            x: 175,
            y: 200
        },
        {
            name: 'Mourny Mountain',
            image: 'mountain.png',
            x: 500,
            y: 450
        },
        {
            name: 'Raging River',
            image: 'river.png',
            x: 300,
            y: 100
        },
        {
            name: 'Creepy Castle',
            image: 'castle.svg',
            x: 500,
            y: 250
        },
        {
            name: 'X Marks the Spot',
            image: 'x-mark.png',
            x: 350,
            y: 300
        }
    ]
}

function addCallbackFuntionToComponents(map){
    for (var activity of map.activities){
        activity.onClickFunction = function(svgItem){
            svgItem.animate({ transform: "r 90"}, 1000);
        }
    }
}

class ActivityComponent{
    constructor(name, imageSource, x, y, size, onClickFunction){
        this.name = name;
        this.imageSource = imageSource;
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
        this.onClickFunction = onClickFunction;
    }

    draw(){
        var self = this;
        var componentImage = s.image(this.imageSource, this.x, this.y, this.width, this.height);
        var componentText = s.text(this.x - this.width/2, this.y + this.height + 15, this.name);
        var combined = s.group(componentImage, componentText);
        combined.hover(function hoverIn(){
            this.transform("s 1.25");
        },
        function hoverOut(){
            this.transform("s 1");
        })
        .click(function onClickFunction(){
            self.onClickFunction(this);
        });
        
    }
}

class Map{
    constructor(map, width, height, x, y){
        this.name = map.name;
        this.background = map.background;
        this.overlay = map.overlay;
        this.activities = map.activities;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    draw(){
        this.drawBackground();
        this.drawTitle();
        this.drawOverlay();
        this.drawComponents();
    }

    drawBackground(){
        var pattern = s.image(this.background, 0,0, 250,250).pattern(0,0,50,50);
        var background = s.rect(this.x, this.y, this.width, this.height).attr("fill", pattern);
    }

    drawTitle(){
        var titleX = this.x + (this.width * 0.40);
        var titleY = this.y + (this.height * 0.075);
        var titleSize = this.height * 0.075;
        var mapTitle = s.text(titleX, titleY, this.name).attr("font-size", titleSize );
    }

    drawOverlay(){
        var overlayX = this.x + (this.width * 0.05);
        var overlayY = this.y + (this.height * 0.075);
        var overlay = s.image(this.overlay, overlayX ,overlayY , this.width * 0.9, this.height * 0.9);
    }

    drawComponents(){
        var activitySize = this.width * 0.075;
        for (var activity of this.activities){
            var activityComponent = new ActivityComponent(activity.name, activity.image, activity.x, activity.y, activitySize , activity.onClickFunction);
            activityComponent.draw();
        }
    }


}

addCallbackFuntionToComponents(exampleMapToLoad);
var createdMap = new Map(exampleMapToLoad, panelWidth ,panelHeight, 0 , 0);
createdMap.draw();






function doSomePrototyping(){
    var forest = createForest(50,30);

    var user = createUser(userX, userY);
    
    var streamLine = createStream(200, 200);
    
    var pathToForest = createPath(userX, userY, 80, 75);
    
    var castle =  new ActivityComponent("Dream Castle", 'castle.svg', 400, 150);
    castle.drawComponent();
}

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
