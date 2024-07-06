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
    Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, wallOptions),
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, wallOptions),
    Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, wallOptions),
    Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 10, window.innerHeight, wallOptions)
];

Composite.add(world, walls);

var rec = Bodies.rectangle(800, 400, 100, 100);
Composite.add(world, rec)


var r = 15;
var row = 10;
var col = 15;
var arr = [];

for (var i = 0; i < row; i++) {
    arr.push([]);
    for (var j = 0; j < col; j++) {
        let c = Bodies.circle(j * 30 + 50, i * 30 + 50, r);
        Composite.add(world, [c]);
        arr[i].push(c);
    }
}

for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
        if (j + 1 < col) {
            var AtoB = Constraint.create({
                bodyA: arr[i][j],
                bodyB: arr[i][j + 1],
                stiffness: 0.01,
                damping: 0.1
            });
            Composite.add(world, AtoB);
        }

        if (i + 1 < row) {
            var AtoB = Constraint.create({
                bodyA: arr[i][j],
                bodyB: arr[i + 1][j],
                stiffness: 0.01,
                damping: 0.1
            });
            Composite.add(world, AtoB);
        }
    }
}

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

Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);