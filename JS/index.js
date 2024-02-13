
window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    // canvas.style.display = "block";
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let diamonds = [];
    let score = 0;
    gameOver = false;
    faster = 1;
    let collectAudio = new Audio("../IMG/diamonds/collected.wav");
    collectAudio.playbackRate = 3;
    let collision = new Audio("../IMG/enemies/collapse.mp4");
    let step = new Audio("../IMG/players/step.mp3");
    step.playbackRate = 2;


    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter')
                    && this.keys.indexOf(e.key) === -1) {
                    // if(this.keys.length>3) this.keys.splice(0, this.keys.length)
                    this.keys.push(e.key);
                }
            });

            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);

                }
            });
        }

    }



    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight - 350;
            this.height = 128;
            this.width = 128;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("playerImage");
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 7;
            this.fps = 7;//frames per second
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 1;
            this.weight = 1;
            this.vy = 0;
        }
        backgroundUpdate(background) {
            if ((background.x - this.speed) <= 0) background.x -= this.speed;
            if (background.x < 0 - background.width) background.x = 0;
        }
        sprite() {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
        }
        draw(context) {
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, background, enemies, diamonds) {
            //collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (enemy.width / 4 + this.width / 4)) {
                    collision.play();
                    gameOver = true;
                }
            });
            //diamonds collecting
            diamonds.forEach(diamond => {
                const dx = (diamond.x + diamond.width / 2) - (this.x + this.width / 2);
                const dy = (diamond.y + diamond.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (diamond.width / 4 + this.width / 4)) {
                    collectAudio.play();
                    diamond.markedForDeletion = true;
                    score++;
                }
            });
            //endless sprite
            if (this.frameTimer > this.frameInterval) {
                this.sprite();
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            //controls
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
                step.play();
                this.sprite();
                this.backgroundUpdate(background);
            }
            else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
                this.backgroundUpdate(background);

            }
            else if (input.keys.indexOf('ArrowDown') > -1) {
                this.y = this.gameHeight - 35;

            }
            else if (input.keys.indexOf('ArrowUp') > -1) {
                this.y = this.gameHeight - 130;
            }
            else {
                this.speed = 0;
            }
            //frame update
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
            //horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        }



    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById("backgroundImage");
            this.x = 0;
            this.y = 0;
            this.width = 1000;
            this.height = 720;
            this.speed = 2;


        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
        update() {
            this.x -= this.speed * faster;
            if (this.x < 0 - this.width) this.x = 0;
        }


    }
    class fire {

    }

    class Enemy {
        constructor(gameWidth, gameHeight, path) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight - path;
            this.width = 130;
            this.height = 90;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 3;
            this.fps = 20;//frames per second
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 5;
            this.markedForDeletion = false;
        }
        draw(context) {
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
                this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed * faster;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
            }

        }

    }
    class Diamond {
        constructor(gameWidth, gameHeight, path, placement) {
            this.gameWidth = gameWidth + placement;
            this.gameHeight = gameHeight - path - 20;
            this.width = 32;
            this.height = 32;
            this.image = document.getElementById('diamondsImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 3;
            this.fps = 20;//frames per second
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 5;
            this.markedForDeletion = false;
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
                this.x, this.y, this.width, this.height);
        }
        update() {
            this.x -= this.speed * faster;
        }

    }
    function handleEnemiesAndDiamonds(deltaTime, randPath) {
        let randPath1 = randPath * (350) || 250;
        let randPath2 = randPath * (250) || 350;
   
        if (Timer > (Interval + randomInterval)) {
            enemies.push(new Enemy(canvas.width, canvas.height, randPath1));
            let placement = 70;
            for (let i = 0; i < 3; i++) {
                diamonds.push(new Diamond(canvas.width, canvas.height, randPath2, i * placement));
            }
            randomInterval = Math.random() * 1000 + 500;
            Timer = 0;
        }
        else {
            Timer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
        diamonds.forEach(diamond => {
            diamond.draw(ctx);
            diamond.update();
        });
        diamonds = diamonds.filter(diamond => !diamond.markedForDeletion);

    }

    function displayStatusText(context) {
        context.fiilStyle = 'black';
        context.font = '60px Honk, system-ui';
        context.fillText('Score ' + score, 20, 50);
        if (gameOver) {
            context.textAlign = 'center';
            context.fiilStyle = 'black';
            context.font = '100px Honk, system-ui';
            context.fillText('Game OVER ', canvas.width / 2, 400);
        }

    }
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let Timer = 0;
    let Interval = 20;
    let randomInterval = Math.random() * 1000 + 500;

    function animate(timeStamp) {
        if (Interval > 3) {
            Interval -= 0.2;
        }

        faster += 0.0001;
        let randPath = Math.round(Math.random());
        //time stamp is a feature of animate, it automatically generates a timestamp
        const deltaTime = timeStamp - lastTime;//how many ms the computer need to serve one animation stamp
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, background, enemies, diamonds);
        handleEnemiesAndDiamonds(deltaTime, randPath);
        displayStatusText(ctx);
        if (!gameOver){requestAnimationFrame(animate);} 
        else{
            let record=Cookies.get('Dragons&Diamonds')
            if(record>score)
            {
                Cookies.set("Dragons&Diamonds",record,{expires: 7});
            }
            else{
                Cookies.set("Dragons&Diamonds",score,{expires: 7});
                var users = JSON.parse(localStorage.getItem('users'))
                //set in local sorage
            }
            
           
        };

    }
    let start = this.document.getElementById("playBtn");
    start.addEventListener("click", function run() {
        const openPage = document.getElementById("openPage");
        openPage.style.display = "none";
        const canvas = document.getElementById("canvas1");
        canvas.style.display = "block";
        animate(0);
    });


});