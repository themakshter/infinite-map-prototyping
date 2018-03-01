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
    background: 'water-background.jpg',
    overlay: 'island.png',
    activities:[
        {
            name: 'Freaky Forest',
            image: 'forest.png',
            x: 10,
            y: 10
        },
        {
            name: 'Mourny Mountain',
            image: 'mountain.jpg',
            x: 50,
            y: 50
        },
        {
            name: 'Raging River',
            image: 'river.png',
            x: 250,
            y: 25
        },
        {
            name: 'Creepy Castle',
            image: 'castle.svg',
            x: 500,
            y: 700
        },
        {
            name: 'X Marks the Spot',
            image: 'x-mark.png',
            x: 350,
            y: 350
        }
    ]
}

class ActivityComponent{
    constructor(name, imageSource, x, y){
        this.name = name;
        this.imageSource = imageSource;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    drawComponent(){
        var componentImage = s.image(this.imageSource, this.x, this.y, this.width, this.height);
        var componentText = s.text(this.x - this.width/2, this.y + this.height + 15, this.name);
        var combined = s.group(componentImage, componentText);
        combined.hover(function hoverIn(){
            this.transform("s 1.25");
        },
        function hoverOut(){
            this.transform("s 1");
        })
        .click(function clickFunction(){
            this.animate({ transform: "r 90"}, 1000);
        });
        
    }
}

function doSomePrototyping(){
    var forest = createForest(50,30);

    var user = createUser(userX, userY);
    
    var streamLine = createStream(200, 200);
    
    var pathToForest = createPath(userX, userY, 80, 75);
    
    var castle =  new ActivityComponent("Dream Castle", 'castle.svg', 400, 150);
    castle.drawComponent();
    
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
}

