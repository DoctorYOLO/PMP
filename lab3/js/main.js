window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
 
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var maxParticles = 25;
    var particles = [];

    for (var i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 4 + 1,
            density: Math.random() * maxParticles
        })
    }

    function draw() {

        var img = new Image();
        img.onload = function () {
            drawGradientRect();
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 7;
            ctx.shadowOffsetY = 7;
            ctx.drawImage(img, width - 300, height - 400, 200, 400);
        };
        img.src = "img/logo.png";
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < maxParticles; i++) {
            var drawParticles = particles[i];
            ctx.moveTo(drawParticles.x, drawParticles.y);
            ctx.arc(drawParticles.x, drawParticles.y, drawParticles.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    var angle = 0;

    function update() {
        angle += 0.01;
        for (var i = 0; i < maxParticles; i++) {
            var drawParticles = particles[i];
            drawParticles.y += Math.cos(angle + drawParticles.density) + 1 + drawParticles.radius / 2;
            drawParticles.x += Math.sin(angle) * 2;

            if (drawParticles.x > width + 5 || drawParticles.x < -5 || drawParticles.y > height) {
                if (i % 3 > 0) {
                    particles[i] = {
                        x: Math.random() * width,
                        y: -10,
                        radius: drawParticles.radius,
                        density: drawParticles.density
                    };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = {
                            x: -5,
                            y: Math.random() * height,
                            radius: drawParticles.radius,
                            density: drawParticles.density
                        };
                    } else {
                        particles[i] = {
                            x: width + 5,
                            y: Math.random() * height,
                            radius: drawParticles.radius,
                            density: drawParticles.density
                        };
                    }
                }
            }
        }
    }
    
    function drawGradientRect() {
        ctx.rect(0, 0, 0, 0);
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(1/4, '#FF0000');
        gradient.addColorStop(2/4, '#FFFF00');
        gradient.addColorStop(3/4, '#0000FF');
        gradient.addColorStop(4/4, '#8F00FF');
        ctx.fillStyle = gradient;
        ctx.fill();
    }
       
    setInterval(draw, 33);
}