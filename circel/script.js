var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Composite = Matter.Composite;
var Bodies = Matter.Bodies;
var Events = Matter.Events;
var World = Matter.World;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#1a1a1a'
    }
});

const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: "#1a1a1a"
    }
};

const walls = [
    Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 20, wallOptions),
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 20, wallOptions),
    Bodies.rectangle(0, window.innerHeight / 2, 20, window.innerHeight, wallOptions),
    Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 20, window.innerHeight, wallOptions)
];

Composite.add(world, walls);


var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

render.mouse = mouse;



function GetRandInt(min, max) {
    let res = Math.floor(Math.random() * max - min + min);
    return res;
}

var r = 15;
var row = 10;
var col = 8;

for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
        let x = GetRandInt(0, window.innerWidth);
        let y = GetRandInt(0, innerHeight)
        let c = Bodies.circle(x, y, r, { friction: 0, restitution: 0.8, isStatic: true,  render: { fillStyle: 'blue' }});
        var AtoB = Constraint.create({
            bodyA: c,
            pointB : mouse.position,
            stiffness: 0.01,
        });
        Composite.add(world, [c, AtoB]);
    }
}


Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);