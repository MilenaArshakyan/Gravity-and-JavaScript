var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Composite = Matter.Composite;
var Bodies = Matter.Bodies;
var Events = Matter.Events;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    
    options: {
        wireframes: false,
        background: '#000'
    }
});

engine.gravity.y = 0

render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);

var rectangles = [];
var collisionCount = new Map();

function createGrid(columns, rows) {
    var canvasWidth = render.canvas.width;
    var canvasHeight = render.canvas.height;
    var rectWidth = canvasWidth / columns;
    var rectHeight = canvasHeight / rows;

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            var x = rectWidth * i + rectWidth / 2;
            var y = rectHeight * j + rectHeight / 2;
            var rectangle = Bodies.rectangle(x, y, rectWidth, rectHeight, { 
                isStatic: true,
                render: { fillStyle: 'black' }  
            });
           // console.log(rectangle)
            rectangles.push(rectangle);
            collisionCount.set(rectangle.id, 0);
            Composite.add(engine.world, rectangle);
        }
    }
    console.log("Grid created with", rectangles.length, "rectangles");
}

createGrid(10, 5);

window.addEventListener('resize', () => {
    Composite.clear(engine.world, false);
    rectangles = [];
    // createGrid(10, 5);
    Composite.add(engine.world, circle);
});

var circle;

window.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e) {
    var canvasRect = render.canvas.getBoundingClientRect();
    // console.log(canvasRect)
    var mouseX = e.clientX //- canvasRect.left;
    var mouseY = e.clientY// - canvasRect.top;
     if (!circle) {
        circle = Bodies.circle(mouseX, mouseY, 120, {
            isStatic: false,
            render: { fillStyle: '#FF0000' }
        });
        Composite.add(engine.world, circle);
    } 
    // else {
        
    //      Matter.World.remove(engine.world, circle);
    //      circle = Bodies.circle(mouseX, mouseY, 20, {
    //         isStatic: false,
    //         render: { fillStyle: '#FF0000' }
    //     });
    //     Composite.add(engine.world, circle);
    //  }
    // var canvasRect = render.canvas.getBoundingClientRect();
    // var mouseX = e.clientX;
    // var mouseY = e.clientY;
   // console.log(mouseX, mouseY)
   Matter.Body.setPosition(circle, { x: mouseX, y: mouseY });
}

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    //console.log("Collision detected", pairs);
console.log("aaaaaaaa")
    pairs.forEach(function(pair) {
        console.log(pair)
        if ((pair.bodyA === circle && rectangles.includes(pair.bodyB)) || (pair.bodyB === circle && rectangles.includes(pair.bodyA))  
            // && 
        ) {
            var rectangle = pair.bodyA === circle ? pair.bodyB : pair.bodyA;
            var count = collisionCount.get(rectangle.id);
            count++;
            collisionCount.set(rectangle.id, count);
            if (count % 2 === 0) {
                rectangle.render.fillStyle = 'black';
            } else {
                rectangle.render.fillStyle = 'yellow';
            }
          //  console.log("Collision with rectangle detected");
        }
    });
});