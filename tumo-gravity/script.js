document.addEventListener('DOMContentLoaded', () => {
    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, World } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
        element: document.querySelector('.login-container'),
        canvas: document.getElementById('matterCanvas'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent',
        }
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const wallOptions = { 
        isStatic: true,
        render: {
            fillStyle: 'white'
        }
    };
engine.gravity.y = 0
    const walls = [
        Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 5, wallOptions),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 5, wallOptions),
        Bodies.rectangle(0, window.innerHeight / 2, 5, window.innerHeight, wallOptions),
        Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 5, window.innerHeight, wallOptions)
    ];

    World.add(world, walls);

    const createFormElement = (x, y, width, height, label, texture) => {
        const element = Bodies.rectangle(x, y, width, height, {
            render: {
                sprite: {
                    texture: texture,
                    xScale: width / 300,
                    yScale: height / 50
                }
            }
        });
        element.label = label;
        return element;
    };

    const formElements = [
        createFormElement(window.innerWidth - 120, 20, 150, 30, 'en/hy', 'img/changeLanguage.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2 - 240, 210, 30, 'tumo', 'img/tumo.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2 - 150, 210, 30, 'login', 'img/login.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2 - 100, 210, 30, 'username', 'img/username.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2, 210, 30, 'password', 'img/password.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2 + 100, 210, 30, 'submit', 'img/submit.png'),
        createFormElement(window.innerWidth / 2, window.innerHeight / 2 + 160, 210, 30, 'changePass', 'img/changePass.png')
    ];

    World.add(world, formElements);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (event) => {
        console.log("AAAAAAA")
        const { clientX, clientY } = event;
        const withinBounds = clientX >= 200 && clientX <= window.innerWidth-300 && clientY >= 0 && clientY <= window.innerHeight;

        if (withinBounds) {
            engine.world.gravity.y = 1;
            formElements.forEach(element => {
                Matter.Body.setStatic(element, false); 
            });
        } else {
            engine.world.gravity.y = 0;
            formElements.forEach(element => {
                Matter.Body.setStatic(element, true); 
            });
        }
    });
});
