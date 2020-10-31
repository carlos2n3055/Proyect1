const game = {
    name: 'Arkanoid Game',
    description: "Arkanoid game",
    version: '1.0.0',
    license: undefined,
    author: 'Gonzalo Arguelles Navarro y Carlos Martin-Salas',
    //Canvas
    ctx: undefined,
    canvasTag: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    background: undefined,
    //juego
    fps: 60,
    frames: 0,
    bar: undefined,
     keys: {
        left: 37,
        right: 39
    },
    //balls
    balls: [],
    
    //power-ups
    doubleSize: [],
    extraBalls:[],


    init(id) {
        this.canvasTag = document.getElementById(id)
        this.ctx = this.canvasTag.getContext('2d')
        this.setDimensions()
        this.reset()
        this.drawBar()
        this.drawBall()
        this.drawBackground()
        this.drawAll()
        this.setEventListeners()
        
         
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    reset() {
        

    },

    drawAll() {
        setInterval(() => {
            this.frames++
            this.clearScreen() 
            this.background.draw()
            this.bar.draw()
            this.balls.forEach(elm => elm.draw())
            this.createDoubleSize()
            this.clearOutOfScreen()
            this.moveDoubleSize()
            this.doubleSize.forEach(e => e.draw())
            this.createExtraBalls()
            this.moveExtraBalls()
            this.extraBalls.forEach(e => e.draw())
            
            this.barColision()
            this.DSColision()
            this.EBColision()
            
        },(1000 / this.fps))
    },

    drawBar() {
        //this.bar = new PlayerBar(this.ctx, this.canvasSize.w - 290, this.canvasSize.h - 200, 100, 200, '../images/background1.png')
        this.bar = new PlayerBar(this.ctx, this.canvasSize.w/2 - 100, this.canvasSize.h - 50, 200, 25, '../images/player-bar.png')
        
    },

    drawBall() {
        //(ctx, ballPosX, ballPosY, ballRadius, ballDiameter, ballVelX, ballVely,canvasSize)
        this.balls.push(new Ball (this.ctx, this.canvasSize.w/2, this.canvasSize.h - 60, 10, 20, 4, 4, this.canvasSize))
    },
    
    createExtraBalls() {
        if (this.frames % 200 === 0) {
          // constructor (ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage)
          let y = 0
          let minGap = 0
          let maxGap = this.canvasSize.w - 30
          let Gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
          this.extraBalls.push(new ExtraBalls (this.ctx, Gap, y, 30, 30, '../images/moreballs.jpg'))
        }
    },

    moveExtraBalls() {
        this.extraBalls.forEach(e => {
            e.EBPos.y += 4
        })
    },

    EBColision() {
        this.extraBalls.forEach(e => {
            if (e.EBPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                e.EBPos.x + e.EBSize.w > this.bar.barPos.x &&
                e.EBPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                e.EBSize.h + e.EBPos.y > this.bar.barPos.y)
            {
            // se añaden dos bolas mas al juego
                console.log("nuevas bolas")
                this.balls.push(new Ball (this.ctx, this.bar.barPos.x + this.bar.barSize.w / 2, this.canvasSize.h - 60, 10, 20, 2, 4, this.canvasSize))
                this.balls.push(new Ball (this.ctx, this.bar.barPos.x + this.bar.barSize.w / 2, this.canvasSize.h - 60, 10, 20, -2, 4, this.canvasSize))
            // Desparace el powerup al tocar la barra
            this.extraBalls = this.extraBalls.filter(e => e.EBPos.y >= this.bar.barPos.y)
            console.log(this.extraBalls)    
            }
        })
    },

    createDoubleSize() {
        if (this.frames % 500 === 0) {
          // constructor (ctx, DSPosX, DSPosY, DSWidth, DSHeight, DSImage)
          let y = 0
          let minGap = 0
          let maxGap = this.canvasSize.w - 30
          let Gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
          this.doubleSize.push(new DoubleSize (this.ctx, Gap, y, 30, 30, '../images/x2.png'))
        }
    },

    moveDoubleSize() {
        this.doubleSize.forEach(e => {
            e.DSPos.y += 4
        })
    },
    
    DSColision() {
        this.doubleSize.forEach(e => {
            if (e.DSPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                e.DSPos.x + e.DSSize.w > this.bar.barPos.x &&
                e.DSPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                e.DSSize.h + e.DSPos.y > this.bar.barPos.y)
            {
            // aumenta el tamaño de la barra
            this.growSize()
            // Desparace el powerup al tocar la barra
            this.doubleSize = this.doubleSize.filter(e => e.DSPos.y >= this.bar.barPos.y)
            }
        })
    },

    growSize() {
        this.bar.barSize.w = 400
    },

    drawBackground(){
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, 'images/background1.png');
        
    },

    clearScreen() {
        
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    barColision() {
        this.balls.forEach(elm => {
            if (elm.ballPos.ballx >= this.bar.barPos.x &&
                elm.ballPos.ballx <= this.bar.barPos.x + this.bar.barSize.w &&
                elm.ballPos.bally + 10 >= this.bar.barPos.y) {
                elm.ballVel.y *= -1
            }
        })
    },

    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === this.keys.left ? this.bar.move('left') : null
            e.keyCode === this.keys.right ? this.bar.move('right') : null
        }
    },
    
    clearOutOfScreen() {
        this.doubleSize = this.doubleSize.filter(e => e.DSPos.y <= this.canvasSize.h)
        //console.log(this.doubleSize)
        this.extraBalls = this.extraBalls.filter(e => e.EBPos.y <= this.canvasSize.h)
        //console.log(this.extraBalls)
        this.balls = this.balls.filter(e => e.ballPos.bally <= this.canvasSize.h)
        //console.log(this.balls)
    }
}